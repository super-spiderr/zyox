import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

export const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: widthScale(20),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightScale(16),
      marginTop: heightScale(10),
    },
    backButton: {
      width: widthScale(34),
      height: widthScale(34),
      borderRadius: widthScale(10),
      backgroundColor: theme.colors.infoSurfaceBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerRightPlaceholder: {
      width: widthScale(34),
    },
    searchBar: {
      marginHorizontal: 0,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contactList: {
      flex: 1,
    },
    contactListContent: {
      paddingBottom: heightScale(30),
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightScale(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    contactAvatar: {
      width: widthScale(40),
      height: widthScale(40),
      borderRadius: widthScale(20),
      backgroundColor: theme.colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthScale(12),
    },
    contactDetails: {
      flex: 1,
    },
    contactPhone: {
      marginTop: heightScale(2),
    },
    emptyContainer: {
      paddingVertical: heightScale(60),
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      textAlign: 'center',
    },
  });
};

export default getStyles;
