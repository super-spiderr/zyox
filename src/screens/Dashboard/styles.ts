import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { heightScale, widthScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    screen: {
      backgroundColor: theme.colors.surface,
    },
    container: {
      paddingTop: 0,
      // Extra clearance so scroll content never sits behind the floating
      // tab-bar "+" FAB, which renders ~64px above the tab bar itself.
      paddingBottom: heightScale(170),
      gap: widthScale(12),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    skeletonHeader: {
      paddingHorizontal: widthScale(16),
      paddingTop: heightScale(20),
    },
    skeletonButtonRow: {
      flexDirection: 'row',
      gap: widthScale(12),
      marginTop: heightScale(16),
    },
    skeletonSection: {
      paddingHorizontal: widthScale(16),
      marginTop: heightScale(20),
    },
    skeletonRow2: {
      flexDirection: 'row',
      gap: widthScale(12),
      marginTop: heightScale(12),
    },
    skeletonListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthScale(12),
      paddingVertical: heightScale(10),
    },
    skeletonListInfo: {
      flex: 1,
      gap: heightScale(6),
    },
  });
};

export default getStyles;
