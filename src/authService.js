import { supabase } from "../lib/supabaseClient";

export async function login(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function register(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } =
    await supabase.auth.signUp({
      email: cleanEmail,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );
}
