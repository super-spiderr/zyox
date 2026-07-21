import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/theme';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import AppNavigator from '@/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import '@/utils/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
if (__DEV__) {
  require('../ReactotronConfig');
}
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <AppNavigator />
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
};

export default App;
