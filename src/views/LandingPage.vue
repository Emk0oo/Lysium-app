<template>
  <div class="landing-page min-h-screen flex items-center justify-center bg-gradient-golden">
    <div class="container-sm flex flex-col items-center p-6">
      <!-- Logo -->
      <img
        src="@/assets/images/logos_grands/NSLysium_Logotype_Grand_blanc.png"
        alt="NSLysium"
        class="logo mb-6"
      />

      <!-- Titre -->
      <h1 class="titre-1 text-white text-center">BetaLysium</h1>
      <p class="texte-accent-lg text-white text-center mb-8" style="opacity: 0.9">
        Ton assistant de vie, chaque jour.
      </p>

      <!-- Boutons -->
      <div class="w-full flex flex-col gap-4">
        <button class="btn btn-secondary btn-full btn-lg" disabled>
          <span>🍎</span>
          Continuer avec Apple
        </button>

        <button class="btn btn-primary btn-full btn-lg" disabled>
          <span class="google-icon">G</span>
          Continuer avec Google
        </button>

        <div class="divider my-2">
          <span>ou</span>
        </div>

        <router-link to="/signup" class="btn btn-outline btn-full btn-lg">
          S'inscrire par e-mail
        </router-link>
      </div>

      <!-- Lien connexion -->
      <router-link to="/login" class="link mt-8 texte">
        J'ai déjà un compte →
      </router-link>
    </div>
  </div>
</template>

<script setup>
// OAuth sera implémenté plus tard
</script>

<style scoped>
.logo {
  width: 120px;
  height: auto;
}

.google-icon {
  font-weight: 700;
  font-family: Arial, sans-serif;
  font-size: 1.2rem;
}

.my-2 {
  margin-top: var(--space-2);
  margin-bottom: var(--space-2);
}
</style>
