import { StateStorage } from 'zustand/middleware';
import { createMMKV, MMKV } from 'react-native-mmkv';

export const storage: MMKV = createMMKV({
  id: 'zyox-storage',
});

export const mmkvStorage: StateStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
  },
  getItem: key => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: key => {
    storage.remove(key);
  },
};
