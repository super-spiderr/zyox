import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';

export const DashboardFooter: React.FC = () => {
  const styles = useStyles(getStyles);

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        <Text style={styles.footerPoweredText} variant="medium">
          Powered by Zyox
        </Text>
      </View>
    </View>
  );
};

export default DashboardFooter;
