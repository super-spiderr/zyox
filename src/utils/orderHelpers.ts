import { Order } from '@/api/order';

export type DeliverySlot = 'Morning' | 'Afternoon' | 'Evening';

const DELIVERY_SLOTS: DeliverySlot[] = ['Morning', 'Afternoon', 'Evening'];

const slotFromHour = (hour: number): DeliverySlot => {
  if (hour >= 4 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  return 'Evening';
};

const slotFromKeywords = (order: Order): DeliverySlot | null => {
  const notes = (order.notes || '').toLowerCase();
  const eventName = (order.attributes?.eventName || '').toLowerCase();

  if (notes.includes('morning') || eventName.includes('morning')) return 'Morning';
  if (notes.includes('afternoon') || eventName.includes('afternoon')) return 'Afternoon';
  if (notes.includes('evening') || eventName.includes('evening')) return 'Evening';
  return null;
};

const slotFromEventDate = (order: Order): DeliverySlot | null => {
  const timePart = order.deliveryDate?.includes('T') ? order.deliveryDate.split('T')[1] : undefined;
  if (!timePart) return null;
  return slotFromHour(Number.parseInt(timePart.split(':')[0], 10));
};

const slotFromIdHash = (order: Order): DeliverySlot => {
  const hash = order._id
    ? order._id.split('').reduce((acc, char) => acc + (char.codePointAt(0) ?? 0), 0)
    : 0;
  return DELIVERY_SLOTS[hash % DELIVERY_SLOTS.length];
};

/**
 * Classifies an order into Morning, Afternoon, or Evening slot based on
 * explicitly listed text in notes or eventName, parsing the eventDate hour if present,
 * or fallback deterministic mapping.
 */
export const getOrderSlot = (order: Order): DeliverySlot =>
  slotFromKeywords(order) ?? slotFromEventDate(order) ?? slotFromIdHash(order);

/**
 * Gets the current active delivery slot based on current local hour.
 */
export const getCurrentSlot = (): DeliverySlot => slotFromHour(new Date().getHours());

export const getOrderTotal = (order: Order): number => {
  const itemsTotal =
    order.orderItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;
  return Math.max(0, itemsTotal - (order.discountAmount || 0));
};

export const isOrderForCustomer = (order: Order, customerId: string): boolean => {
  if (!order || !customerId) return false;
  if (typeof order.customerId === 'string') {
    return order.customerId === customerId;
  }
  if (order.customerId && typeof order.customerId === 'object') {
    return order.customerId._id === customerId;
  }
  return false;
};

const ORDER_DATE_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const formatOrderDate = (dateString: string, noDateLabel: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return noDateLabel;
  return `${String(date.getDate()).padStart(2, '0')} ${
    ORDER_DATE_MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
};
