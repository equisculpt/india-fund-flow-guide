
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BackupInfo {
  backup_id: string;
  backup_type: 'full' | 'incremental';
  status: string;
  created_at: string;
  file_path: string;
  tables_count?: number;
  total_records?: number;
}

interface BackupStatus {
  isLoading: boolean;
  lastBackup?: BackupInfo;
  backups: BackupInfo[];
}

export const useBackupSystem = () => {
  const [status, setStatus] = useState<BackupStatus>({
    isLoading: false,
    backups: []
  });
  const { toast } = useToast();

  const createFullBackup = useCallback(async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { data, error } = await supabase.functions.invoke('backup-system', {
        body: { action: 'create_full_backup' }
      });

      if (error) throw error;

      toast({
        title: "Backup Created",
        description: `Full backup completed successfully. Backup ID: ${data.backupId}`,
      });

      await fetchBackupLogs();
      return data;

    } catch (error: any) {
      console.error('Backup creation failed:', error);
      toast({
        title: "Backup Failed",
        description: error.message || "Failed to create backup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  }, [toast]);

  const createIncrementalBackup = useCallback(async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { data, error } = await supabase.functions.invoke('backup-system', {
        body: { action: 'create_incremental_backup' }
      });

      if (error) throw error;

      toast({
        title: "Incremental Backup Created",
        description: `Backup completed for recent changes. Backup ID: ${data.backupId}`,
      });

      await fetchBackupLogs();
      return data;

    } catch (error: any) {
      console.error('Incremental backup failed:', error);
      toast({
        title: "Backup Failed",
        description: error.message || "Failed to create incremental backup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  }, [toast]);

  const restoreBackup = useCallback(async (backupId: string, tablesToRestore?: string[]) => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { data, error } = await supabase.functions.invoke('backup-system', {
        body: { 
          action: 'restore_backup',
          backupId,
          tables: tablesToRestore
        }
      });

      if (error) throw error;

      toast({
        title: "Restore Completed",
        description: `Successfully restored ${data.tablesRestored.length} tables from backup`,
      });

      return data;

    } catch (error: any) {
      console.error('Backup restore failed:', error);
      toast({
        title: "Restore Failed",
        description: error.message || "Failed to restore backup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  }, [toast]);

  const verifyBackup = useCallback(async (backupPath: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('backup-system', {
        body: { 
          action: 'verify_backup',
          backupPath
        }
      });

      if (error) throw error;

      toast({
        title: data.isValid ? "Backup Valid" : "Backup Invalid",
        description: data.isValid 
          ? `Backup contains ${data.totalRecords} records across ${data.tablesCount} tables`
          : data.error,
        variant: data.isValid ? "default" : "destructive",
      });

      return data;

    } catch (error: any) {
      console.error('Backup verification failed:', error);
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify backup",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const fetchBackupLogs = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('backup-system', {
        body: { action: 'list_backups' }
      });

      if (error) throw error;

      setStatus(prev => ({
        ...prev,
        backups: data.backups,
        lastBackup: data.backups[0]
      }));

      return data.backups;

    } catch (error: any) {
      console.error('Failed to fetch backup logs:', error);
      return [];
    }
  }, []);

  const scheduleAutomaticBackups = useCallback(async () => {
    // This would typically be set up as a cron job in production
    try {
      // Create a full backup weekly and incremental daily
      const now = new Date();
      const dayOfWeek = now.getDay();
      
      if (dayOfWeek === 0) { // Sunday - full backup
        await createFullBackup();
      } else { // Other days - incremental backup
        await createIncrementalBackup();
      }
    } catch (error) {
      console.error('Scheduled backup failed:', error);
    }
  }, [createFullBackup, createIncrementalBackup]);

  return {
    status,
    createFullBackup,
    createIncrementalBackup,
    restoreBackup,
    verifyBackup,
    fetchBackupLogs,
    scheduleAutomaticBackups
  };
};
