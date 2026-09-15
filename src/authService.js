import { supabase } from './supabaseClient.js'
export const signUp = (e,p) => supabase.auth.signUp({email:e,password:p})
export const signIn = (e,p) => supabase.auth.signInWithPassword({email:e,password:p})
export const signOut = () => supabase.auth.signOut()
export const getUser = () => supabase.auth.getUser()
