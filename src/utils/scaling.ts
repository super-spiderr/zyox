import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const GUIDELINE_BASE_WIDTH = 375;
const GUIDELINE_BASE_HEIGHT = 812;

export const widthScale = (size: number): number => {
  return (width / GUIDELINE_BASE_WIDTH) * size;
};

export const heightScale = (size: number): number => {
  return (height / GUIDELINE_BASE_HEIGHT) * size;
};

export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (widthScale(size) - size) * factor;
};
