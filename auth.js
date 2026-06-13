// ====================================================================
// AUTH.JS — gère inscription, connexion, OAuth (Google/Apple)
// et vérification par code (OTP)
// ====================================================================

// ---------- UTIL ----------
function showMessage(el, text, isError = false) {
  el.textContent = text;
  el.style.display = "block";
  el.style.color = isError ? "#C0392B" : "#0F4D2E";
}

// ====================================================================
// 1. INSCRIPTION (email + mot de passe) -> envoie un code par email
// ====================================================================
async function handleSignup(event) {
  event.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const msg = document.getElementById("signup-message");

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name } // infos supplémentaires stockées sur le profil
    }
  });

  if (error) {
    showMessage(msg, "Erreur : " + error.message, true);
    return;
  }

  // On stocke l'email temporairement pour l'étape de vérification
  sessionStorage.setItem("pending_email", email);

  showMessage(msg, "Compte créé ! Un code de vérification a été envoyé à " + email);

  // Affiche le formulaire de saisie du code
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("verify-form").style.display = "block";
}

// ====================================================================
// 2. VÉRIFICATION DU CODE (OTP) reçu par email
// ====================================================================
async function handleVerifyCode(event) {
  event.preventDefault();

  const email = sessionStorage.getItem("pending_email");
  const code = document.getElementById("verify-code").value;
  const msg = document.getElementById("verify-message");

  const { data, error } = await supabaseClient.auth.verifyOtp({
    email,
    token: code,
    type: "signup"
  });

  if (error) {
    showMessage(msg, "Code invalide : " + error.message, true);
    return;
  }

  showMessage(msg, "Compte vérifié ! Redirection...");
  sessionStorage.removeItem("pending_email");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
}

// ====================================================================
// 3. CONNEXION (email + mot de passe)
// ====================================================================
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const msg = document.getElementById("login-message");

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showMessage(msg, "Erreur : " + error.message, true);
    return;
  }

  showMessage(msg, "Connexion réussie !");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

// ====================================================================
// 4. CONNEXION AVEC GOOGLE / APPLE (OAuth)
// ====================================================================
async function loginWithProvider(provider) {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider, // "google" ou "apple"
    options: {
      redirectTo: window.location.origin + "/index.html"
    }
  });

  if (error) {
    alert("Erreur de connexion " + provider + " : " + error.message);
  }
}

// ====================================================================
// 5. DÉCONNEXION
// ====================================================================
async function handleLogout() {
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

// ====================================================================
// 6. VÉRIFIER SI L'UTILISATEUR EST CONNECTÉ (à utiliser sur index.html)
// ====================================================================
async function getCurrentUser() {
  const { data } = await supabaseClient.auth.getUser();
  return data.user;
}