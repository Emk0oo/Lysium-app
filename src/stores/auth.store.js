import { reactive, computed } from 'vue';
import { authService } from '@/services/auth.service';

const state = reactive({
  user: null,
  isLoading: false,
  error: null,
});

export const useAuthStore = () => {
  const isAuthenticated = computed(() => !!state.user);
  const isProfileComplete = computed(() => state.user?.profile_complete ?? false);

  const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const login = async (email, password) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await authService.login(email, password);
      const { user, accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      state.user = user;
      return { success: true };
    } catch (error) {
      state.error = error.response?.data?.error?.message || 'Erreur de connexion';
      return { success: false, error: state.error };
    } finally {
      state.isLoading = false;
    }
  };

  const register = async (data) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await authService.register(data);
      const { user, accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      state.user = user;
      return { success: true };
    } catch (error) {
      state.error = error.response?.data?.error?.message || "Erreur lors de l'inscription";
      return { success: false, error: state.error };
    } finally {
      state.isLoading = false;
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    state.isLoading = true;
    try {
      const response = await authService.getMe();
      state.user = response.data;
    } catch {
      clearTokens();
      state.user = null;
    } finally {
      state.isLoading = false;
    }
  };

  const logout = () => {
    clearTokens();
    state.user = null;
  };

  const updateProfile = async (profileData) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await authService.updateProfile(profileData);
      // Met à jour le profil dans l'état
      if (state.user) {
        state.user.profile = response.data.profile;
        state.user.profile_complete = response.data.profile_complete;
      }
      return { success: true, data: response.data };
    } catch (error) {
      state.error = error.response?.data?.error?.message || 'Erreur lors de la mise à jour';
      return { success: false, error: state.error };
    } finally {
      state.isLoading = false;
    }
  };

  return {
    // State
    user: computed(() => state.user),
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),
    isAuthenticated,
    isProfileComplete,
    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
  };
};
