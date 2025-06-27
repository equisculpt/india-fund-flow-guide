
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = "https://pvtrwvvcgkppjlbyvflv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dHJ3dnZjZ2twcGpsYnl2Zmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDE0NTYsImV4cCI6MjA2NTQ3NzQ1Nn0.PW1tXy6_aKnbBj5vXEvtYYoClLJClLYbuVJiw9paEco"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
