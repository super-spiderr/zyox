import React, { useEffect, useState } from 'react';
import Text from './Text';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  variant?: any;
  fontSize?: number;
  style?: any;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 800,
  variant = 'bold',
  fontSize,
  style,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out curve for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  const format = (val: number) => {
    if (prefix === '₹') {
      return `₹${val.toLocaleString('en-IN')}`;
    }
    return `${prefix}${val.toLocaleString('en-IN')}${suffix}`;
  };

  return (
    <Text variant={variant} fontSize={fontSize} style={style}>
      {format(displayValue)}
    </Text>
  );
};

export default AnimatedNumber;
