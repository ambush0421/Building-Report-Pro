// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseEnv = !!(supabaseUrl && supabaseAnonKey);

export const getSupabaseConfigError = () => {
    if (!supabaseUrl) return 'NEXT_PUBLIC_SUPABASE_URL 환경 변수가 누락되었습니다.';
    if (!supabaseAnonKey) return 'NEXT_PUBLIC_SUPABASE_ANON_KEY 환경 변수가 누락되었습니다.';
    return null;
};

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);
