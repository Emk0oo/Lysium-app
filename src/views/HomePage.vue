<template>
  <div class="home-page">
    <div class="welcome-container">
      <h1 class="title">BetaLysium</h1>
      <p class="subtitle">Un assistant qui change la vie.</p>

      <!-- Boutons Connexion et Inscription -->
      <div class="button-container">
        <button class="action-button login-button" @click="redirectToLogin">Connexion</button>
        <button class="action-button signup-button" @click="redirectToSignup">S'inscrire</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    redirectToLogin() {
      // Redirection vers la page de connexion
      this.$router.push("/login");
    },
    redirectToSignup() {
      // Redirection vers la page d'inscription
      this.$router.push("/signup");
    },
  },
};
</script>

<style>
/* Conteneur principal */
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #c4622d, #16120e);
  color: #fff;
}

.welcome-container {
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  margin-bottom: 1.5rem;
}

/* Style des boutons */
.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.action-button {
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  width: 200px; /* Largeur fixe pour aligner les deux boutons */
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.login-button {
  background: #fff;
  color: #c4622d;
}

.login-button:hover {
  background: #c4622d;
  color: #fff;
}

.signup-button {
  background: transparent;
  color: #fff;
}

.signup-button:hover {
  background: #fff;
  color: #c4622d;
}
</style>
