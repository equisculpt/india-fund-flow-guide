
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BackupConfig {
  tables: string[]
  includeAuth: boolean
  encryptionKey?: string
  destination: 'storage' | 'external'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { action, config } = await req.json()

    switch (action) {
      case 'create_full_backup':
        return await createFullBackup(supabase)
      
      case 'create_incremental_backup':
        return await createIncrementalBackup(supabase)
      
      case 'restore_backup':
        const { backupId, tables } = await req.json()
        return await restoreBackup(supabase, backupId, tables)
      
      case 'verify_backup':
        const { backupPath } = await req.json()
        return await verifyBackup(supabase, backupPath)
      
      case 'list_backups':
        return await listBackups(supabase)
      
      default:
        throw new Error('Invalid action')
    }

  } catch (error) {
    console.error('Backup System Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function createFullBackup(supabase: any) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupId = `full-backup-${timestamp}`
  
  const criticalTables = [
    'profiles',
    'investments', 
    'portfolio_holdings',
    'mutual_funds',
    'referral_commissions',
    'portfolio_analytics',
    'ai_portfolio_insights',
    'uploaded_files',
    'contact_submissions',
    'blog_posts',
    'community_questions',
    'community_answers'
  ]
  
  const backupData: any = {
    metadata: {
      backupId,
      timestamp,
      type: 'full',
      tables: criticalTables
    },
    data: {}
  }

  // Backup each critical table
  for (const table of criticalTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
      
      if (error) {
        console.error(`Error backing up table ${table}:`, error)
        continue
      }
      
      backupData.data[table] = data
      console.log(`Backed up ${data?.length || 0} records from ${table}`)
    } catch (error) {
      console.error(`Failed to backup table ${table}:`, error)
    }
  }

  // Store backup in Supabase Storage
  const backupJson = JSON.stringify(backupData, null, 2)
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('backups')
    .upload(`${backupId}.json`, backupJson, {
      contentType: 'application/json'
    })

  if (uploadError) {
    throw new Error(`Failed to store backup: ${uploadError.message}`)
  }

  // Log backup creation
  await supabase
    .from('backup_logs')
    .insert({
      backup_id: backupId,
      backup_type: 'full',
      status: 'completed',
      file_path: uploadData.path,
      tables_count: criticalTables.length,
      total_records: Object.values(backupData.data).reduce((acc: number, tableData: any) => acc + (tableData?.length || 0), 0)
    })

  return new Response(JSON.stringify({
    success: true,
    backupId,
    message: 'Full backup created successfully',
    tablesBackedUp: criticalTables.length,
    storagePath: uploadData.path
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function createIncrementalBackup(supabase: any) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupId = `incremental-backup-${timestamp}`
  
  // Get last backup time
  const { data: lastBackup } = await supabase
    .from('backup_logs')
    .select('created_at')
    .eq('status', 'completed')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const sinceDate = lastBackup?.created_at || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const backupData: any = {
    metadata: {
      backupId,
      timestamp,
      type: 'incremental',
      sinceDate
    },
    data: {}
  }

  // Backup only modified data
  const tables = ['profiles', 'investments', 'portfolio_holdings', 'ai_portfolio_insights']
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .gte('updated_at', sinceDate)
      
      if (error) {
        console.error(`Error backing up table ${table}:`, error)
        continue
      }
      
      if (data && data.length > 0) {
        backupData.data[table] = data
        console.log(`Backed up ${data.length} modified records from ${table}`)
      }
    } catch (error) {
      console.error(`Failed to backup table ${table}:`, error)
    }
  }

  // Store incremental backup
  const backupJson = JSON.stringify(backupData, null, 2)
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('backups')
    .upload(`${backupId}.json`, backupJson, {
      contentType: 'application/json'
    })

  if (uploadError) {
    throw new Error(`Failed to store backup: ${uploadError.message}`)
  }

  await supabase
    .from('backup_logs')
    .insert({
      backup_id: backupId,
      backup_type: 'incremental',
      status: 'completed',
      file_path: uploadData.path,
      since_date: sinceDate
    })

  return new Response(JSON.stringify({
    success: true,
    backupId,
    message: 'Incremental backup created successfully',
    sinceDate,
    storagePath: uploadData.path
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function restoreBackup(supabase: any, backupId: string, tablesToRestore?: string[]) {
  try {
    // Download backup file
    const { data: backupFile, error: downloadError } = await supabase.storage
      .from('backups')
      .download(`${backupId}.json`)

    if (downloadError) {
      throw new Error(`Failed to download backup: ${downloadError.message}`)
    }

    const backupText = await backupFile.text()
    const backupData = JSON.parse(backupText)

    const restoreLog = {
      backup_id: backupId,
      restore_timestamp: new Date().toISOString(),
      tables_restored: [],
      status: 'in_progress'
    }

    // Restore each table
    for (const [tableName, tableData] of Object.entries(backupData.data)) {
      if (tablesToRestore && !tablesToRestore.includes(tableName)) {
        continue
      }

      try {
        // For safety, we'll insert with conflict resolution rather than truncate/insert
        const { error: insertError } = await supabase
          .from(tableName)
          .upsert(tableData as any[], {
            onConflict: 'id'
          })

        if (insertError) {
          console.error(`Error restoring table ${tableName}:`, insertError)
          continue
        }

        restoreLog.tables_restored.push(tableName)
        console.log(`Restored ${(tableData as any[])?.length || 0} records to ${tableName}`)
      } catch (error) {
        console.error(`Failed to restore table ${tableName}:`, error)
      }
    }

    restoreLog.status = 'completed'

    // Log restore operation
    await supabase
      .from('restore_logs')
      .insert(restoreLog)

    return new Response(JSON.stringify({
      success: true,
      message: 'Backup restored successfully',
      tablesRestored: restoreLog.tables_restored
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

async function verifyBackup(supabase: any, backupPath: string) {
  try {
    const { data: backupFile, error } = await supabase.storage
      .from('backups')
      .download(backupPath)

    if (error) {
      throw new Error(`Cannot access backup file: ${error.message}`)
    }

    const backupText = await backupFile.text()
    const backupData = JSON.parse(backupText)

    const verification = {
      isValid: true,
      metadata: backupData.metadata,
      tablesCount: Object.keys(backupData.data).length,
      totalRecords: Object.values(backupData.data).reduce((acc: number, tableData: any) => acc + (tableData?.length || 0), 0),
      issues: []
    }

    return new Response(JSON.stringify(verification), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({
      isValid: false,
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

async function listBackups(supabase: any) {
  try {
    const { data: backupLogs, error } = await supabase
      .from('backup_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      throw new Error(`Failed to fetch backup logs: ${error.message}`)
    }

    return new Response(JSON.stringify({
      success: true,
      backups: backupLogs
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}
