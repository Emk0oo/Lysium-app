<template>
  <div class="auth-page">
    <div class="bg-image"></div>

    <!-- Header avec image -->
    <div class="auth-header">
      <router-link to="/" class="back-btn">
        <span class="back-icon">‹</span>
        Retour
      </router-link>

      <div class="header-content">
        <img
          src="@/assets/images/logos_grands/NSLysium_Logotype_Grand_blanc.png"
          alt="NSLysium"
          class="header-logo"
        />
      </div>
    </div>

    <!-- Formulaire -->
    <div class="auth-form-container">
      <div class="auth-form-inner">
        <h2 class="form-title">Créer un compte</h2>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="first_name">Prénom</label>
              <input
                id="first_name"
                v-model="form.first_name"
                type="text"
                class="form-input"
                placeholder="Prénom"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="last_name">Nom</label>
              <input
                id="last_name"
                v-model="form.last_name"
                type="text"
                class="form-input"
                placeholder="Nom"
                required
                :disabled="isLoading"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="votre@email.com"
              required
              :disabled="isLoading"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Mot de passe</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-input"
              placeholder="Minimum 8 caractères"
              minlength="8"
              required
              :disabled="isLoading"
            />
          </div>

          <label class="checkbox-label">
            <input type="checkbox" v-model="acceptTerms" required />
            <span>J'accepte les <a href="#" class="terms-link">conditions d'utilisation</a></span>
          </label>

          <div v-if="error" class="error-box">
            {{ error }}
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading || !acceptTerms">
            {{ isLoading ? 'Création...' : "S'inscrire" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
});

const isLoading = ref(false);
const error = ref(null);
const acceptTerms = ref(false);

const handleSubmit = async () => {
  error.value = null;

  if (form.password.length < 8) {
    error.value = 'Le mot de passe doit contenir au moins 8 caractères';
    return;
  }

  isLoading.value = true;

  const result = await auth.register({
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    password: form.password,
  });

  isLoading.value = false;

  if (result.success) {
    router.push('/dashboard');
  } else {
    error.value = result.error;
  }
};
</script>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.bg-image {
  position: fixed;
  inset: 0;
  background-image: url('@/assets/images/background/background_home.avif');
  background-size: cover;
  background-position: center center;
}

.auth-header {
  position: relative;
  flex: 1;
  padding: 2rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
}


.back-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: var(--text-sm);
  margin-bottom: 2rem;
}

.back-btn:hover { color: #fff; }

.back-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.header-logo {
  width: 340px;
  height: auto;
}

.header-title {
  font-family: var(--font-titre);
  font-weight: var(--font-bold);
  font-size: var(--text-3xl);
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.header-subtitle {
  font-family: var(--font-accent);
  font-style: italic;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.auth-form-container {
  position: relative;
  z-index: 2;
  background: var(--color-principal);
  margin-top: -2rem;
  border-radius: 2.5rem 2.5rem 0 0;
  padding: 2rem 1.5rem 3rem;
}

.auth-form-inner {
  max-width: 400px;
  margin: 0 auto;
}

.form-title {
  font-family: var(--font-titre);
  font-weight: var(--font-bold);
  font-size: var(--text-2xl);
  color: var(--color-sombre);
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  color: var(--color-sombre);
}

.form-input {
  padding: 1rem;
  background: var(--color-white);
  border: 1px solid var(--color-secondaire);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  color: var(--color-sombre);
  transition: all var(--transition-base);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-cta-1);
  box-shadow: 0 0 0 3px rgba(190, 75, 27, 0.1);
}

.form-input::placeholder { color: var(--color-secondaire); }
.form-input:disabled { opacity: 0.6; cursor: not-allowed; }

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: var(--color-sombre);
  font-size: var(--text-sm);
}

.checkbox-label input {
  accent-color: var(--color-cta-1);
  margin-top: 2px;
}

.terms-link {
  color: var(--color-cta-1);
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.error-box {
  color: var(--color-error);
  background: rgba(229, 57, 53, 0.1);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
}

.submit-btn {
  padding: 1rem;
  background: var(--color-cta-1);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-base);
}

.submit-btn:hover:not(:disabled) {
  background: var(--color-cta-2);
  transform: translateY(-1px);
}

.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.social-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  color: var(--color-secondaire);
  font-size: var(--text-sm);
}

.social-divider::before,
.social-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-secondaire);
  opacity: 0.4;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-btn {
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-secondaire);
  border-radius: var(--radius-lg);
  background: var(--color-white);
  color: var(--color-sombre);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  cursor: not-allowed;
}

/* Desktop */
@media (min-width: 768px) {
  .auth-page { flex-direction: row; }

  .auth-header {
    width: 45%;
    min-height: 100vh;
    padding: 3rem;
    display: flex;
    flex-direction: column;
  }

  .back-btn { margin-bottom: auto; }
  .header-content { margin-bottom: 3rem; }
  .header-logo { width: 120px; }
  .header-title { font-size: var(--text-4xl); }

  .auth-form-container {
    width: 55%;
    margin-top: 0;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
  }

  .auth-form-inner { max-width: 420px; }
  .form-title { font-size: var(--text-3xl); margin-bottom: 2rem; }
}

@media (max-width: 480px) {
  .form-row { grid-template-columns: 1fr; }
}
</style>
