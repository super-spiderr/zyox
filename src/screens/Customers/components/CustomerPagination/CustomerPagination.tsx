import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text } from '@/components';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import { useAppTheme } from '@/theme';

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const CustomerPagination: React.FC<CustomerPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const styles = useStyles(getStyles);
  const { theme } = useAppTheme();

  if (totalItems <= 0 || totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <View style={styles.container}>
      <Text style={styles.summaryText}>
        Showing {startItem}–{endItem} of {totalItems} customers
      </Text>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[styles.navButton, !canGoPrevious && styles.disabledNavButton]}
          onPress={() => canGoPrevious && onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          activeOpacity={0.7}
        >
          <ChevronLeft
            size={20}
            color={canGoPrevious ? theme.colors.text : theme.colors.textSecondary}
          />
        </TouchableOpacity>

        <View style={styles.pageBadge}>
          <Text variant="semibold" style={styles.pageBadgeText}>
            Page {currentPage} of {totalPages}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.navButton, !canGoNext && styles.disabledNavButton]}
          onPress={() => canGoNext && onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          activeOpacity={0.7}
        >
          <ChevronRight
            size={20}
            color={canGoNext ? theme.colors.text : theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerPagination;
