import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import Text from './Text';
import { useAppTheme, palette, Theme } from '@/theme';
import { widthScale, heightScale } from '@/utils/scaling';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  value?: string;
  onChange: (dateStr: string) => void;
  title?: string;
  minimumDate?: Date;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const pad2 = (n: number) => String(n).padStart(2, '0');
const toDateStr = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const parseDateStr = (value?: string): Date | null => {
  if (!value) return null;
  const parts = value.split('-').map(Number);
  if (parts.length !== 3 || parts.some(n => Number.isNaN(n))) return null;
  const [y, m, d] = parts;
  const parsed = new Date(y, m - 1, d);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  value,
  onChange,
  title = 'Select Date',
  minimumDate,
}) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const today = new Date();
  const selectedDate = parseDateStr(value);

  const [viewDate, setViewDate] = useState(selectedDate || today);

  useEffect(() => {
    if (visible) {
      setViewDate(selectedDate || today);
    }
    // Re-sync the visible month whenever the sheet is (re)opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const days = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingBlanks = firstOfMonth.getDay();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < leadingBlanks; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewDate]);

  const goPrevMonth = () => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const goNextMonth = () => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  const goToday = () => setViewDate(today);

  const isDisabled = (d: Date) => {
    if (!minimumDate) return false;
    const min = new Date(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate());
    return d < min;
  };

  const handleSelectDay = (d: Date) => {
    if (isDisabled(d)) return;
    onChange(toDateStr(d));
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.container} activeOpacity={1}>
          <View style={styles.grabber} />
          <View style={styles.header}>
            <Text variant="bold" fontSize={16} color={theme.colors.text}>
              {title}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.monthNav}>
            <TouchableOpacity style={styles.navButton} onPress={goPrevMonth} activeOpacity={0.7}>
              <ChevronLeft size={20} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity onPress={goToday} activeOpacity={0.7}>
              <Text variant="bold" fontSize={14} color={theme.colors.text}>
                {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={goNextMonth} activeOpacity={0.7}>
              <ChevronRight size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekdayRow}>
            {WEEKDAYS.map((w, i) => (
              <View key={i} style={styles.weekdayCell}>
                <Text fontSize={11} color={theme.colors.textMuted} variant="semibold">
                  {w}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.grid}>
            {days.map((d, i) => {
              if (!d) return <View key={i} style={styles.dayCell} />;
              const selected = selectedDate ? isSameDay(d, selectedDate) : false;
              const isToday = isSameDay(d, today);
              const disabled = isDisabled(d);
              return (
                <View key={i} style={styles.dayCell}>
                  <TouchableOpacity
                    style={[
                      styles.dayButton,
                      selected && { backgroundColor: theme.colors.primary },
                      !selected && isToday && styles.todayRing,
                    ]}
                    disabled={disabled}
                    onPress={() => handleSelectDay(d)}
                    activeOpacity={0.7}
                  >
                    <Text
                      fontSize={13}
                      variant={selected || isToday ? 'bold' : 'medium'}
                      color={
                        selected
                          ? palette.white
                          : disabled
                          ? theme.colors.textMuted
                          : isToday
                          ? theme.colors.primary
                          : theme.colors.text
                      }
                    >
                      {d.getDate()}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: widthScale(24),
      borderTopRightRadius: widthScale(24),
      padding: widthScale(20),
      paddingBottom: heightScale(30),
    },
    grabber: {
      alignSelf: 'center',
      width: widthScale(40),
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      marginBottom: heightScale(14),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: heightScale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: heightScale(12),
    },
    closeButton: {
      width: widthScale(28),
      height: widthScale(28),
      borderRadius: widthScale(14),
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    monthNav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: heightScale(14),
    },
    navButton: {
      width: widthScale(32),
      height: widthScale(32),
      borderRadius: widthScale(16),
      backgroundColor: theme.colors.inputBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    weekdayRow: {
      flexDirection: 'row',
      marginBottom: heightScale(4),
    },
    weekdayCell: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: heightScale(6),
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: heightScale(2),
    },
    dayButton: {
      width: widthScale(34),
      height: widthScale(34),
      borderRadius: widthScale(17),
      justifyContent: 'center',
      alignItems: 'center',
    },
    todayRing: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
    },
  });

export default DatePickerModal;
