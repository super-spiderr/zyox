import { Order } from '@/api/order';

/**
 * Classifies an order into Morning, Afternoon, or Evening slot based on
 * explicitly listed text in notes or eventName, parsing the eventDate hour if present,
 * or fallback deterministic mapping.
 */
export const getOrderSlot = (order: Order): 'Morning' | 'Afternoon' | 'Evening' => {
  const notes = (order.notes || '').toLowerCase();
  const eventName = (order.eventName || '').toLowerCase();

  if (notes.includes('morning') || eventName.includes('morning')) return 'Morning';
  if (notes.includes('afternoon') || eventName.includes('afternoon')) return 'Afternoon';
  if (notes.includes('evening') || eventName.includes('evening')) return 'Evening';

  // If eventDate has a time component
  if (order.eventDate && order.eventDate.includes('T')) {
    const timePart = order.eventDate.split('T')[1];
    if (timePart) {
      const hour = parseInt(timePart.split(':')[0], 10);
      if (hour >= 4 && hour < 12) return 'Morning';
      if (hour >= 12 && hour < 17) return 'Afternoon';
      return 'Evening';
    }
  }

  // Fallback hash based on id to distribute them deterministically
  const hash = order._id ? order._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const slots: ('Morning' | 'Afternoon' | 'Evening')[] = ['Morning', 'Afternoon', 'Evening'];
  return slots[hash % 3];
};

/**
 * Gets the current active delivery slot based on current local hour.
 */
export const getCurrentSlot = (): 'Morning' | 'Afternoon' | 'Evening' => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  return 'Evening';
};
