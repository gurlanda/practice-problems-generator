import HighlighedIndices from './HighlightedIndices';

class HighlightedNumber {
  value: number;
  start?: number;
  end?: number;

  constructor(value: number, highlightedIndices?: HighlighedIndices) {
    this.value = value;

    if (!highlightedIndices) {
      return;
    }

    const { end, start } = highlightedIndices;

    const digitsNumber = this.digits.length;
    const indicesAreWithinArrayBounds = end < digitsNumber; // We only need to check that the end is within array bounds because the HighlightedIndices constructor checks that the starting index is within bounds
    if (!indicesAreWithinArrayBounds) {
      throw new Error(
        'In constructor HighlightedNumber: Given highlightedIndices are outside of array bounds'
      );
    }

    this.start = start;
    this.end = end;
  }

  get highlightedIndices(): HighlighedIndices | undefined {
    if (this.start === undefined || this.end === undefined) {
      return undefined;
    }

    return new HighlighedIndices(this.start, this.end);
  }

  set highlightedIndices(highlightedIndices: HighlighedIndices | undefined) {
    this.start = highlightedIndices?.start ?? undefined;
    this.end = highlightedIndices?.end ?? undefined;
  }

  get digits(): number[] {
    const digits: number[] = [];
    let currentValue = this.value;
    do {
      digits.push(currentValue % 10);
      currentValue = Math.floor(currentValue / 10);
    } while (currentValue !== 0);

    return digits.reverse(); // Because digits were added from least significant digit to most
  }
}

export default HighlightedNumber;
