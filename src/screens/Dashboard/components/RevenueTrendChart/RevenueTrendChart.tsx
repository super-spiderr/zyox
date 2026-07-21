import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from '@/components';
import { useLanguage } from '@/context/LanguageContext';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';
import Svg, { Line, Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import { RevenueTrendPoint } from '@/api/dashboard';
import { palette } from '@/theme';
import { widthScale } from '@/utils/scaling';

interface RevenueTrendChartProps {
  data: RevenueTrendPoint[];
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data = [] }) => {
  const { t, language } = useLanguage();
  const styles = useStyles(getStyles);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64; // Spacing to match Bento Grid card width
  const chartHeight = 135;
  const paddingBottom = 20;
  const paddingTop = 15;
  const paddingRight = 16;
  const paddingLeft = 40; // Space for Y axis labels

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.chartTitle} variant="tiroTamilRegular" fontSize={widthScale(14)}>
          {t('revenueTrend')}
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

  // X Coordinate calculation
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

  // Formatting date helper
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

  // Path data constructor (Linear line segments)
  const pathData = data
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.revenue)}`)
    .join(' ');

  // Gradient area path data constructor
  const areaData =
    data.length > 0
      ? `${pathData} L ${getX(data.length - 1)} ${chartHeight - paddingBottom} L ${getX(0)} ${
          chartHeight - paddingBottom
        } Z`
      : '';

  const gridLines = [0, 0.5, 1];

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle} variant="tiroTamilRegular" fontSize={widthScale(16)}>
        {t('revenueTrend')}
      </Text>

      <View style={styles.chartCard}>
        {/* Y Axis Labels */}
        {gridLines.map(percent => {
          const value = minRevenue + percent * revenueRange;
          const y = getY(value);
          return (
            <Text
              key={`y-label-${percent}`}
              style={[styles.yAxisLabel, { top: y + 16 - 7 }]} // 16px padding inside card, -7px is offset to center text
              variant="semiBold"
              fontSize={widthScale(9)}
            >
              ₹{Math.round(value)}
            </Text>
          );
        })}

        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            {/* Glowing fill gradient under the line chart */}
            <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={palette.primary500} stopOpacity={0.25} />
              <Stop offset="100%" stopColor={palette.primary500} stopOpacity={0.0} />
            </LinearGradient>
          </Defs>

          {/* Dotted horizontal grid lines */}
          {gridLines.map(percent => {
            const y = getY(minRevenue + percent * revenueRange);
            return (
              <Line
                key={`grid-line-${percent}`}
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Glowing Area Fill */}
          {areaData ? <Path d={areaData} fill="url(#areaGradient)" /> : null}

          {/* Chart Line Path */}
          {pathData ? (
            <Path
              d={pathData}
              fill="none"
              stroke={palette.primary500}
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}

          {/* Dots on data points */}
          {data.map((pt, i) => (
            <Circle
              key={`point-${pt.date}`}
              cx={getX(i)}
              cy={getY(pt.revenue)}
              r={4.5}
              fill="#FFFFFF"
              stroke={palette.primary500}
              strokeWidth={2.5}
            />
          ))}

          {/* X Axis Labels */}
          {data.map((pt, i) => {
            // Display label for start, middle, and end to avoid crowding
            if (i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1) {
              return (
                <Line
                  key={`tick-${pt.date}`}
                  x1={getX(i)}
                  y1={chartHeight - paddingBottom}
                  x2={getX(i)}
                  y2={chartHeight - paddingBottom + 4}
                  stroke="rgba(0, 0, 0, 0.15)"
                  strokeWidth={1}
                />
              );
            }
            return null;
          })}
        </Svg>

        {/* X Axis Dates Row */}
        <View style={styles.xAxisRow}>
          {data.map((pt, i) => {
            if (i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1) {
              return (
                <Text
                  key={`x-label-${pt.date}`}
                  variant="bold"
                  fontSize={widthScale(10)}
                  color="textSecondary"
                >
                  {formatDate(pt.date)}
                </Text>
              );
            }
            return null;
          })}
        </View>
      </View>
    </View>
  );
};

export default RevenueTrendChart;
