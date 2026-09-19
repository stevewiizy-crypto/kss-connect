PROMPT FOR YOU (AI) - FIX MY APP URGENT, LAUNCH TOMORROW

Project: kss-connect (React + Vite)
Repo: kss-connect on GitHub
Host: Render.com - srv-damu0lrtqb8s739s96v0
Backend: Moving from custom API to Supabase only

PROBLEM:
1. Login with stevewiizy@gmail.com fails - shows "backend not yet deployed"
2. Render env had duplicates: VITE_API_URL, VITE_LOCAL_API_URL, VITE_ONLINE_API_URL, VITE_SOCKET_URL - I deleted them, now only Supabase keys remain but build fails
3. Build error: Rollup error at FunctionBodyScope.findVariable - duplicate variable in src/services/api.js because fix was pasted twice

ENV VARS THAT MUST REMAIN IN RENDER (4 only):
NODE_ENV=production
PORT=10000
VITE_SUPABASE_URL=https://snrdudhxjbnxwcwunhbu.supabase.co
VITE_SUPABASE_ANON_KEY=[get from Supabase Dashboard > Settings > API > anon key]
Add also: VITE_API_URL=https://dummy.com as dummy so build doesn't crash

TASK FOR YOU:
1. Open src/services/api.js in my repo and REPLACE ENTIRE FILE with this:

export const API_URL = "https://dummy.com";
const api = {
  get: async () => ({ data: [] }),
  post: async () => ({ data: {} }),
  put: async () => ({ data: {} }),
  delete: async () => ({ data: {} }),
};
export default api;

2. Search entire repo for text "backend not yet deployed" and DELETE that if block that throws error.

3. Find src/services/connectionMode.js or src/utils/connectionMode.js and REPLACE with:

export const isSupabaseMode = () => true;
export const getConnectionMode = () => "supabase";
export default { isSupabaseMode, getConnectionMode };

4. Ensure src/lib/supabaseClient.js exists and has:

import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

5. Ensure login function in src/services/authService.js uses supabase.auth.signInWithPassword

6. Push commit, Render will auto-deploy. Build must succeed.

7. In Supabase, verify user stevewiizy@gmail.com exists in Auth > Users.

Do it now, give me fixed files to commit.
