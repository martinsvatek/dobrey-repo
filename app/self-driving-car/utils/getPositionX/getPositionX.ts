import { getLinearInterpolation } from '../getLinearInterpolation';

/**
 * INFO: vypocet rovnomerneho rozlozeni s ohlidanim toho, ze by byla pouze jedna pozice (napr. kvuli jednomu senzoru)
 */
export const getPositionX = (
  leftPosition: number,
  rightPosition: number,
  positionsCount: number,
  index: number
): number =>
  getLinearInterpolation(
    leftPosition,
    rightPosition,
    positionsCount > 1 ? index / (positionsCount - 1) : 0.5
  );
