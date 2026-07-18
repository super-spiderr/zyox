import { useAppTheme, Theme } from '@/theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  stylesCreator: (theme: Theme) => T
): T => {
  const { theme } = useAppTheme();
  return useMemo(() => stylesCreator(theme), [theme, stylesCreator]);
};

export default useStyles;
