import { createClient } from '@supabase/supabase-js';

// Support both Supabase dashboard key names and custom names
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL!;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY!;

// Server-side client — uses service/secret key for full read/write access
export const supabase = createClient(supabaseUrl, supabaseKey);
