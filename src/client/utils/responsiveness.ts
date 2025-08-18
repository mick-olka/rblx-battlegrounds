import { Workspace } from '@rbxts/services';

const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 1080;

export function getResponsiveValue(
  valueToScale: number,
  minValue?: number,
  maxValue?: number,
): number {
  const camera = Workspace.CurrentCamera;
  let scaledValue = valueToScale;

  if (camera) {
    const viewport = camera.ViewportSize;
    const aspectRatio = viewport.X / viewport.Y;
    const defaultAspectRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;

    let scaleFactor: number;

    // eslint-disable-next-line unicorn/prefer-ternary
    if (aspectRatio > defaultAspectRatio) {
      scaleFactor = viewport.Y / DEFAULT_HEIGHT;
    } else {
      scaleFactor = viewport.X / DEFAULT_WIDTH;
    }

    scaleFactor = math.min(scaleFactor, 2);

    scaledValue = valueToScale * scaleFactor;
  }

  if (minValue && scaledValue < minValue) {
    return minValue;
  }
  if (maxValue && scaledValue > maxValue) {
    return maxValue;
  }

  return scaledValue;
}
