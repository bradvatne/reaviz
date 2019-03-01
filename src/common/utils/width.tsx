const canvas = document.createElement('canvas');

/**
 * Measures the width of text.
 * Credit: https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
 */
export function getTextWidth(text: string, font: string): number {
  const context = canvas.getContext('2d');
  // XXX assumed: getting null canvas is catastrophic
  context!.font = font;
  const metrics = context!.measureText(text);
  return metrics.width;
}
