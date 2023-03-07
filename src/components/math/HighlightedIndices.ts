class HighlighedIndices {
  start: number;
  end: number;

  /**
   * Construct a new HighlightedIndices instance. If start < 0 or start > end, then an error will be thrown
   * @param start The starting index to highlight.
   * @param end The ending index to highlight. If omitted, then end = start.
   * @throws Errors if start < 0 or start > end
   */
  constructor(start: number, end?: number) {
    const startIsNonnegative = start >= 0;
    if (!startIsNonnegative) {
      throw new Error(
        'In constructor HighlighedIndices: Start index is negative'
      );
    }

    if (end === undefined) {
      this.start = start;
      this.end = start;
      return;
    }

    const startIsLessThanEnd = start <= end;
    if (!startIsLessThanEnd) {
      throw new Error(
        'In constructor HighlighedIndices: End index is less than starting index'
      );
    }

    this.end = end;
    this.start = start;
  }
}

export default HighlighedIndices;
