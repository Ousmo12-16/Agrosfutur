// ====================================================================
// CONFIGURATION SUPABASE — à remplir avec TES propres clés
// Tu les trouves dans : Supabase Dashboard > Project Settings > API
// ====================================================================

const SUPABASE_URL = "https://idpgniffybedukgbczjc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcGduaWZmeWJlZHVrZ2JjempjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzA3MTMsImV4cCI6MjA5NjkwNjcxM30.UU07RdoWUWdzuDA3UY2KM91hsWRP5jaZFRgx6c0Ta0A";

// Crée le client Supabase (utilisé par auth.js, login.html, signup.html...)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);