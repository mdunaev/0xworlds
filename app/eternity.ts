// The returned value should be in the range from 0 to 255.
// Where 0 is black and 255 is white and intermediate values are shades of gray color.
export function eternityFunction(x: number, y: number, time: number) {
  return (
    (Math.sin((x + Math.sin(time / 100) * 100) / 10) +
      Math.cos((y + Math.cos(time / 100) * 100) / 10)) *
    255 /
    2
  );
}
