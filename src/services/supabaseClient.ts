import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: async (input, init) => {
      try {
        return await fetch(input as RequestInfo, init as RequestInit);
      } catch (err) {
        console.error('Supabase network request failed', err);
        throw err as any;
      }
    }
  }
}) : null;
