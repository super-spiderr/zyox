import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/components';
import { useStyles } from '@/hooks/useStyles';
import { useAppTheme } from '@/theme';
import getStyles from './styles';

const zyoxLogo = require('@/assets/images/zyox logo.png');

export const DashboardFooter: React.FC = () => {
  const styles = useStyles(getStyles);
  const { theme } = useAppTheme();

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        <Image
          source={zyoxLogo}
          style={[styles.footerLogo, { tintColor: theme.colors.primary }]}
          resizeMode="contain"
        />
        <Text style={styles.footerPoweredText} variant="medium">
          Powered by Zyox
        </Text>
      </View>
    </View>
  );
};

export default DashboardFooter;
