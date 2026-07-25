import React from 'react';
import { View, Image, ImageSourcePropType, ViewStyle } from 'react-native';
import { Text, Button } from '@/components';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';

interface EmptyStateProps {
  image?: ImageSourcePropType;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  image,
  icon,
  title,
  description,
  actionLabel,
  onActionPress,
  style,
}) => {
  const styles = useStyles(getStyles);

  return (
    <View style={[styles.container, style]}>
      {image ? <Image source={image} style={styles.illustration} /> : icon}
      {title ? (
        <Text style={styles.title} variant="bold" fontSize={16}>
          {title}
        </Text>
      ) : null}
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && onActionPress ? (
        <Button title={actionLabel} onPress={onActionPress} style={styles.actionButton} />
      ) : null}
    </View>
  );
};

export default EmptyState;
