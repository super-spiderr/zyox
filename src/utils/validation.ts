const INDIAN_MOBILE_NUMBER_PATTERN = /^[6-9]\d{9}$/;

export const isValidIndianMobileNumber = (phone: string): boolean =>
  INDIAN_MOBILE_NUMBER_PATTERN.test(phone);
