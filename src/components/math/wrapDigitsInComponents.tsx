import React, { ReactNode } from 'react';
import HighlightedNumber from './HighlightedNumber';

function wrapDigitsInComponents(
  number: HighlightedNumber,
  row: number,
  endingColumn: number
): ReactNode[] {
  const digits = number.digits;
  const highlightColor = 'rgb(254 230 138)';
  const gridColumnStart = endingColumn - digits.length;

  function wrapDigit(digit: number, row: number, column: number): ReactNode {
    return (
      <p
        style={{
          gridRowStart: row,
          gridColumnStart: column,
          textAlign: 'center',
        }}
      >
        {digit}
      </p>
    );
  }

  const wrappedDigits = digits.map((digit, index) => {
    const gridColumn = gridColumnStart + index;
    return wrapDigit(digit, row, gridColumn);
  });

  if (!number.highlightedIndices) {
    return wrappedDigits;
  }

  const { start, end } = number.highlightedIndices;
  const digitsHead = wrappedDigits.filter((digit, index) => index < start);
  const digitsTail = wrappedDigits.filter((digit, index) => index > end);

  // We use digits instead of wrappedDigits because we're going to wrap these digits ourselves later
  const highlighedDigits = digits.filter(
    (digit, index) => start <= index && index <= end
  );

  // console.dir({
  //   digitsHead,
  //   highlighedDigits,
  //   digitsTail,
  // });

  const highlighedDigitsWrapper = (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${highlighedDigits.length}, minmax(0, 1fr))`,
        gridRowStart: row,
        gridColumnStart: start + gridColumnStart,
        gridColumnEnd: end + gridColumnStart + 1,
        borderRadius: '8px',
        backgroundColor: highlightColor,
      }}
    >
      {highlighedDigits.map((digit, index) => wrapDigit(digit, row, index + 1))}
    </div>
  );

  return [...digitsHead, highlighedDigitsWrapper, ...digitsTail];
}

export default wrapDigitsInComponents;
