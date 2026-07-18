import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import Svg, {
  Rect,
  Line,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
  G,
  Path,
} from 'react-native-svg';
import getStyles from './styles';
import { RevenueTrendPoint } from '@/api/dashboard';

interface RevenueTrendChartProps {
  data: RevenueTrendPoint[];
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data = [] }) => {
  const { t, language } = useLanguage();
  const { theme } = useAppTheme();
  const styles = useStyles(getStyles);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 72; // Padding to match dashboard
  const chartHeight = 135; // Increased to fit tooltip
  const paddingBottom = 20;
  const paddingTop = 25; // Increased to fit tooltip
  const paddingRight = 24;
  const paddingLeft = 40; // Space for Y axis labels

  // Fallback if there is no data
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="bold" fontSize={16} style={styles.chartTitle}>
          {t('revenueTrend') || 'Revenue Trend'}
        </Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText} variant="medium">
            No data available
          </Text>
        </View>
      </View>
    );
  }

  const revenues = data.map(d => d.revenue);
  const maxRevenue = Math.max(...revenues, 100);
  const minRevenue = 0;
  const revenueRange = maxRevenue - minRevenue;

  // X Coordinate calculation (center of each bar slot)
  const getX = (index: number) => {
    const availableWidth = chartWidth - paddingLeft - paddingRight;
    if (data.length <= 1) return paddingLeft + availableWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * availableWidth;
  };

  // Y Coordinate calculation
  const getY = (value: number) => {
    const availableHeight = chartHeight - paddingTop - paddingBottom;
    const ratio = (value - minRevenue) / revenueRange;
    return chartHeight - paddingBottom - ratio * availableHeight;
  };

  // Determine bar width dynamically
  const availableWidth = chartWidth - paddingLeft - paddingRight;
  const barWidth = Math.min(22, availableWidth / (data.length * 1.6));

  // Formatting date to clean display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return dateString.substring(8, 10);
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const day = String(date.getDate()).padStart(2, '0');
      const month = months[date.getMonth()];
      return language === 'ta'
        ? `${day}/${String(date.getMonth() + 1).padStart(2, '0')}`
        : `${day} ${month}`;
    } catch {
      return dateString;
    }
  };

  const gridLines = [0, 0.5, 1];

  return (
    <View style={styles.container}>
      <Text variant="bold" fontSize={16} style={styles.chartTitle}>
        {t('revenueTrend') || 'Revenue Trend'}
      </Text>

      <View style={styles.chartCard}>
        {/* Y Axis Labels (Native) */}
        {gridLines.map(percent => {
          const value = minRevenue + percent * revenueRange;
          const y = getY(value);
          return (
            <Text
              key={`y-label-${percent}`}
              style={[styles.yAxisLabel, { top: y + 16 - 7 }]} // 16px is container padding, -7px is half of standard lineHeight to center text
              variant="semiBold"
              fontSize={10}
            >
              ₹{Math.round(value)}
            </Text>
          );
        })}

        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <LinearGradient
              id="barGradient"
              x1="0"
              x2="0"
              gradientUnits="userSpaceOnUse"
              y1={paddingTop}
              y2={chartHeight - paddingBottom}
            >
              <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity={1} />
              <Stop offset="100%" stopColor={theme.colors.primary} stopOpacity={0.3} />
            </LinearGradient>
          </Defs>

          {/* Grid lines */}
          {gridLines.map(percent => {
            const y = getY(minRevenue + percent * revenueRange);
            return (
              <Line
                key={`grid-line-${percent}`}
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke={theme.colors.border}
                strokeWidth="1"
                strokeDasharray="4, 4"
              />
            );
          })}

          {/* Render Bars */}
          {data.map((d, i) => {
            const x = getX(i) - barWidth / 2;
            const y = getY(d.revenue);
            const height = chartHeight - paddingBottom - y;
            const barHeight = Math.max(4, height);

            // Round corners at top only using overlap hack
            const cornerRadius = Math.min(barWidth / 2, 6);

            return (
              <G key={`bar-group-${d.date}`}>
                {/* Main rounded bar */}
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={cornerRadius}
                  ry={cornerRadius}
                  fill="url(#barGradient)"
                  opacity={activeIndex === null || activeIndex === i ? 1 : 0.6}
                />
                {/* Bottom flat bar overlap (only draw if height is sufficient) */}
                {barHeight > cornerRadius * 2 && (
                  <Rect
                    x={x}
                    y={y + cornerRadius}
                    width={barWidth}
                    height={barHeight - cornerRadius}
                    fill="url(#barGradient)"
                    opacity={activeIndex === null || activeIndex === i ? 1 : 0.6}
                  />
                )}
              </G>
            );
          })}

          {/* Transparent hitboxes for touch area overlay */}
          {data.map((d, i) => {
            const x = getX(i) - availableWidth / (data.length * 2);
            const width = availableWidth / data.length;
            return (
              <Rect
                key={`hitbox-${d.date}`}
                x={x}
                y={0}
                width={width}
                height={chartHeight}
                fill="black"
                opacity={0}
                onPress={() => {
                  setActiveIndex(activeIndex === i ? null : i);
                }}
              />
            );
          })}

          {/* Tooltip Overlay */}
          {activeIndex !== null &&
            (() => {
              const activePoint = data[activeIndex];
              const pt = { x: getX(activeIndex), y: getY(activePoint.revenue) };
              const tooltipWidth = 64;
              const tooltipHeight = 20;

              return (
                <G>
                  {/* Downward triangle/caret pointing to the top of the bar */}
                  <Path
                    d={`M ${pt.x - 5} ${pt.y - 6} L ${pt.x} ${pt.y - 1} L ${pt.x + 5} ${
                      pt.y - 6
                    } Z`}
                    fill={theme.colors.text}
                  />
                  {/* Tooltip body rectangle */}
                  <Rect
                    x={pt.x - tooltipWidth / 2}
                    y={pt.y - tooltipHeight - 6}
                    width={tooltipWidth}
                    height={tooltipHeight}
                    rx={5}
                    ry={5}
                    fill={theme.colors.text}
                  />
                  {/* Tooltip text */}
                  <SvgText
                    x={pt.x - 12}
                    y={pt.y - 12}
                    fill={theme.colors.card}
                    fontSize="10"
                    fontWeight="bold"
                  >
                    ₹{activePoint.revenue}
                  </SvgText>
                </G>
              );
            })()}

          {/* X Axis Labels */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = chartHeight - 4;
            const shouldShowLabel =
              data.length <= 5 || i % Math.ceil(data.length / 4) === 0 || i === data.length - 1;

            if (!shouldShowLabel) return null;

            return (
              <SvgText
                key={`x-label-${d.date}`}
                x={x}
                y={y}
                fill={theme.colors.textMuted}
                fontSize="9"
                textAnchor="middle"
                fontWeight="600"
              >
                {formatDate(d.date)}
              </SvgText>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

export default RevenueTrendChart;
