/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_ENDPOINT?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_GA_ID?: string;
}
