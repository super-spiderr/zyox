import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import { CustomerTypeCardProps } from '../../types';
import getStyles from './styles';

export const CustomerTypeCard: React.FC<CustomerTypeCardProps> = ({
  icon,
  label,
  active,
  onPress,
}) => {
  const { theme } = useAppTheme();
  const styles = useStyles(getStyles);

  return (
    <TouchableOpacity
      style={[styles.typeCard, active && styles.typeCardActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.typeCardIconWrap}>{icon}</View>
      <Text
        variant={active ? 'bold' : 'medium'}
        fontSize={13}
        color={active ? theme.colors.primary : theme.colors.textSecondary}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomerTypeCard;
