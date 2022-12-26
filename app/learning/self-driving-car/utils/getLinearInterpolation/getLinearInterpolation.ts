/**
 * @NOTE: vypocet rovnomerneho rozlozeni
 * levy krajni pozice + vzdalenost mezi krajnimi pozicemi * procentualni cast teto vzdalenost (napr. u road - 0, 1/3, 2/3, 1)
 */
export const getLinearInterpolation = (left: number, right: number, percentage: number): number =>
  left + (right - left) * percentage;
