import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './NotificationsScreen.styles';
import { palette } from '@/theme';
import { useOrders } from '@/hooks/queries';
import { useNavigation } from '@react-navigation/native';
import { Bell, AlertTriangle, Clock, Calendar } from 'lucide-react-native';

export const NotificationsScreen: React.FC = () => {
  const { t } = useLanguage();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<any>();

  const { data: orders = [], isLoading, refetch, isFetching } = useOrders();

  // Helper to format date in local timezone
  const getLocalDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getLocalDateString();

  // Filter today's active orders
  const todayOrders = orders.filter(order => {
    if (!order.eventDate) return false;
    return order.eventDate.split('T')[0] === todayStr && order.orderStatus !== 'CANCELLED';
  });

  // System-wide drafts count
  const draftCount = orders.filter(order => order.orderStatus === 'PENDING').length;

  // Drafts aging 30+ minutes (anywhere in the system)
  const now = new Date().getTime();
  const agingDrafts = orders.filter(order => {
    if (order.orderStatus !== 'PENDING') return false;
    const dateToUse = order.createdAt || order.updatedAt;
    if (!dateToUse) return false;
    const createdTime = new Date(dateToUse).getTime();
    return (now - createdTime) / (1000 * 60) >= 30;
  });
  const draftsAgingCount = agingDrafts.length;

  const notifications = [];

  // 1. Aging Drafts (Urgent Alert)
  if (draftsAgingCount > 0) {
    notifications.push({
      id: 'aging_drafts',
      title: t('agingDrafts') || 'Urgent: Aging Drafts',
      description:
        t('notificationsAgingWarning', { count: draftsAgingCount }) ||
        `You have ${draftsAgingCount} drafts pending for more than 30 minutes!`,
      icon: <AlertTriangle size={20} color={palette.error500} />,
      iconBg: `${palette.error500}15`,
      action: () => navigation.navigate('Orders'),
      actionLabel: t('viewOrders') || 'View Orders',
    });
  }

  // 2. Pending Drafts (Warning Alert)
  if (draftCount > 0) {
    notifications.push({
      id: 'pending_drafts',
      title: t('pendingDrafts') || 'Pending Drafts',
      description:
        t('notificationsDraftWarning', { count: draftCount }) ||
        `You have ${draftCount} pending drafts that require action.`,
      icon: <Clock size={20} color={palette.warning500} />,
      iconBg: `${palette.warning500}15`,
      action: () => navigation.navigate('Orders'),
      actionLabel: t('viewOrders') || 'View Orders',
    });
  }

  // 3. Today's Scheduled Orders (Info Alert)
  if (todayOrders.length > 0) {
    notifications.push({
      id: 'today_orders',
      title: t('todayOrders') || "Today's Orders",
      description:
        t('notificationsTodayOrders', { count: todayOrders.length }) ||
        `You have ${todayOrders.length} active orders scheduled for today.`,
      icon: <Calendar size={20} color={palette.emerald500} />,
      iconBg: `${palette.emerald500}15`,
      action: () => navigation.navigate('Home'),
      actionLabel: t('goToDashboard') || 'Go to Dashboard',
    });
  }

  return (
    <ScreenContainer scrollable={true} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} variant="h1">
          {t('notificationsTitle') || 'Notifications'}
        </Text>
        <Text style={styles.subtitle}>
          {notifications.length > 0
            ? t('notificationsAlerts', { count: notifications.length }) ||
              `You have ${notifications.length} alerts that require attention`
            : t('notificationsEmptySub') || 'All caught up!'}
        </Text>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Bell size={48} color={palette.gray400} />
          <Text style={styles.emptyText}>
            {t('notificationsEmpty') || "No new notifications. You're all caught up!"}
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {notifications.map(item => (
            <View key={item.id} style={styles.notificationCard}>
              <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                {item.icon}
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <View style={styles.cardFooter}>
                  <TouchableOpacity onPress={item.action} activeOpacity={0.7}>
                    <Text style={styles.actionText}>{item.actionLabel}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScreenContainer>
  );
};

export default NotificationsScreen;
