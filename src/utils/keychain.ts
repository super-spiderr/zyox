import * as Keychain from 'react-native-keychain';

const KEYCHAIN_SERVICE = 'zyox-auth-tokens';

export interface KeychainTokens {
  token: string;
  refreshToken: string;
}

export const saveTokensToKeychain = async (token: string, refreshToken: string): Promise<boolean> => {
  try {
    const credentials = JSON.stringify({ token, refreshToken });
    await Keychain.setGenericPassword('auth_tokens', credentials, {
      service: KEYCHAIN_SERVICE,
    });
    return true;
  } catch (error) {
    console.error('Failed to save tokens to Keychain:', error);
    return false;
  }
};

export const getTokensFromKeychain = async (): Promise<KeychainTokens | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: KEYCHAIN_SERVICE,
    });
    if (credentials) {
      return JSON.parse(credentials.password) as KeychainTokens;
    }
  } catch (error) {
    console.error('Failed to retrieve tokens from Keychain:', error);
  }
  return null;
};

export const clearTokensFromKeychain = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword({
      service: KEYCHAIN_SERVICE,
    });
    return true;
  } catch (error) {
    console.error('Failed to clear tokens from Keychain:', error);
    return false;
  }
};
