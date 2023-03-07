import React, { ReactNode } from 'react';
import HighlighedIndices from './HighlightedIndices';
import HighlightedNumber from './HighlightedNumber';
const gridGap = '5px';

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

const DividendBlock: React.FC<{
  dividend: HighlightedNumber;
  row: number;
  startingColumn: number;
}> = ({ dividend, row, startingColumn }) => {
  const dividendDigits = dividend.digits;
  const endingColumn = startingColumn + dividendDigits.length;
  const numberOfColumns = dividendDigits.length;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
        gridRowStart: row,
        gridColumnStart: startingColumn,
        gridColumnEnd: endingColumn,
        boxShadow: '-1.5px -1.5px 0px 1.5px black', // Use box-shadow instead of border because borders take up space and disrupt the alignment of the dividend's digits
      }}
    >
      {wrapDigitsInComponents(dividend, row, numberOfColumns + 1)}
    </div>
  );
};

const LDSubtractionBlock: React.FC<{
  subtrahend: HighlightedNumber;
  difference: HighlightedNumber;
  endingRow: number;
  endingColumn: number;
}> = ({ subtrahend, difference, endingRow, endingColumn }) => {
  const subtrahendDigits = subtrahend.digits;
  const differenceDigits = difference.digits;
  const maxNumberOfDigits = Math.max(
    subtrahendDigits.length,
    differenceDigits.length
  );
  const columnSpan = maxNumberOfDigits + 1; // +1 for the minus sign
  const rowSpan = 2;

  return (
    <div
      className=" flex flex-col"
      style={{
        gridRowStart: endingRow - rowSpan,
        gridRowEnd: endingRow,
        gridColumnStart: endingColumn - columnSpan,
        gridColumnEnd: endingColumn,
      }}
    >
      <div
        style={{
          display: 'grid',

          gridTemplateColumns: `repeat(${columnSpan}, minmax(0, 1fr))`,
          gap: gridGap,
        }}
      >
        {wrapDigitsInComponents(subtrahend, 1, columnSpan + 1)}
        <p className="row-start-1 col-start-1 text-center">-</p>
      </div>
      <hr className="border-[1.5px] border-black" />
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${columnSpan}, minmax(0, 1fr))`,
        }}
      >
        {wrapDigitsInComponents(difference, 1, columnSpan + 1)}
      </div>
    </div>
  );
};

const LongDivision: React.FC<{
  divisor: HighlightedNumber;
  dividend: HighlightedNumber;
  quotient?: { value: HighlightedNumber; endingColumn: number };
  subtractionBlocks?: {
    subtrahend: HighlightedNumber;
    difference: HighlightedNumber;
    endingColumn: number;
  }[];
}> = ({ divisor, dividend, quotient, subtractionBlocks }) => {
  const divisorDigits = divisor.digits;
  const dividendDigits = dividend.digits;

  const numberOfColumns = divisorDigits.length + dividendDigits.length;

  const frameHeight = quotient ? 3 : 2;
  const rowsFilledBySubtractionBlocks = subtractionBlocks
    ? subtractionBlocks.length * 2
    : 0;
  const divisorDividendColumnBoundary = divisorDigits.length + 1;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${
          frameHeight + rowsFilledBySubtractionBlocks
        }, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
        gap: gridGap,
        maxWidth: 'max-content',
      }}
    >
      {/* Quotient */}
      {quotient &&
        wrapDigitsInComponents(quotient.value, 1, quotient.endingColumn)}

      {/* Divisor */}
      {wrapDigitsInComponents(divisor, 2, divisorDividendColumnBoundary)}

      {/* Dividend */}
      <DividendBlock
        dividend={dividend}
        row={2}
        startingColumn={divisorDividendColumnBoundary}
      />

      {/* Subtraction blocks */}
      {subtractionBlocks?.map((block, index) => (
        <LDSubtractionBlock
          subtrahend={block.subtrahend}
          difference={block.difference}
          endingRow={frameHeight + (index + 1) * 2}
          endingColumn={block.endingColumn}
        />
      ))}
    </div>
  );
};

export default LongDivision;
