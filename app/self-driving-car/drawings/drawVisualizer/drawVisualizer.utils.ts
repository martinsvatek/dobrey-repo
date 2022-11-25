/**
 * INFO: zaporne hodnoty jsou cervene, kladne hodnoty jsou bile
 */
export const getRGBA = (weight: number): string => {
  const R = weight > 0 ? 51 : 220;
  const G = weight > 0 ? 51 : 48;
  const B = weight > 0 ? 51 : 60;
  const alpha = Math.abs(weight);

  return `rgba(${R},${G},${B},${alpha})`;
};
