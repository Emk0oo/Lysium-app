<template>
  <div class="min-h-screen bg-gradient-golden text-white">
    <header class="header flex justify-between items-center px-6 py-4">
      <h1 class="titre-4">BetaLysium</h1>
      <button class="btn btn-ghost btn-sm" @click="handleLogout">
        Déconnexion
      </button>
    </header>

    <main class="container-sm p-6">
      <div class="text-center mb-10">
        <h2 class="titre-3 mb-2">Bonjour{{ userName ? `, ${userName}` : '' }} !</h2>
        <p class="sous-titre" style="opacity: 0.8">Ton assistant de vie est prêt.</p>
      </div>

      <div class="flex flex-col gap-4">
        <div class="card flex items-center gap-4 cursor-pointer" @click="startNewChat">
          <div class="card-icon">💬</div>
          <div>
            <h3 class="texte-lg" style="font-weight: 600">Nouvelle conversation</h3>
            <p class="texte-sm" style="opacity: 0.7">Discute avec ton assistant IA</p>
          </div>
        </div>

        <div class="card flex items-center gap-4 cursor-pointer">
          <div class="card-icon">📊</div>
          <div>
            <h3 class="texte-lg" style="font-weight: 600">Historique</h3>
            <p class="texte-sm" style="opacity: 0.7">Voir tes conversations</p>
          </div>
        </div>

        <div class="card flex items-center gap-4 cursor-pointer">
          <div class="card-icon">👤</div>
          <div>
            <h3 class="texte-lg" style="font-weight: 600">Mon profil</h3>
            <p class="texte-sm" style="opacity: 0.7">Gérer mes informations</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const auth = useAuthStore();

const userName = computed(() => {
  const user = auth.user.value;
  return user?.first_name || '';
});

onMounted(() => {
  auth.fetchUser();
});

const handleLogout = () => {
  auth.logout();
  router.push('/');
};

const startNewChat = () => {
  // TODO: Navigation vers le chat
  console.log('Start new chat');
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
