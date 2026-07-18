import { create } from 'zustand';
import { saveTokensToKeychain, clearTokensFromKeychain } from '@/utils/keychain';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setTokens: (token: string | null, refreshToken: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true, // Start as true to handle startup Keychain hydration
  setTokens: (token, refreshToken) => {
    if (token && refreshToken) {
      saveTokensToKeychain(token, refreshToken);
    } else {
      clearTokensFromKeychain();
    }
    set({ token, refreshToken, isAuthenticated: !!token });
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    clearTokensFromKeychain();
    set({ token: null, refreshToken: null, isAuthenticated: false });
  },
}));

