export const touchControl = matchMedia('(pointer: coarse)');
export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

export class Quality {
  private samples = 0;
  private slow = 0;
  private adjusted = false;
  private scale = 1;
  readonly light = touchControl.matches || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4);

  pixels(width: number, height: number) {
    const budget = this.light ? 1_350_000 : 2_550_000;
    return Math.min(window.devicePixelRatio || 1, this.light ? 1.35 : 1.75,
      Math.sqrt(budget / Math.max(1, width * height))) * this.scale;
  }

  measure(seconds: number) {
    if (this.adjusted || seconds <= 0) return false;
    this.samples++;
    if (seconds > .031) this.slow++;
    if (this.samples < 100) return false;
    const shouldReduce = this.slow / this.samples > .48;
    this.samples = 0;
    this.slow = 0;
    if (shouldReduce) {
      this.scale = .79;
      this.adjusted = true;
    }
    return shouldReduce;
  }
}
