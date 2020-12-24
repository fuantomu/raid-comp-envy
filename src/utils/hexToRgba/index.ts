const hex3Char = /\w/g;
const hex6Char = /\w\w/g;

/**
 * Converts a hex colour value to rgba colour value.
 *
 * @param hex hex colour value
 * @param alpha decimal value between 0 and 1
 * @returns rgba colour value
 */
export default (hex: string, alpha: number): string => {
  const matches = hex.match(hex.length < 6 ? hex3Char : hex6Char);

  if (!matches) {
    throw new Error("Invalid hex provided");
  }

  const [r, g, b] = matches.map((seg) => parseInt(seg.repeat(2 / seg.length), 16));

  return `rgba(${r},${g},${b},${alpha})`;
};
