import React, { ReactNode } from 'react';

function splitDigits(integer: number): number[] {
  const digits: number[] = [];
  do {
    digits.push(integer % 10);
    integer = Math.floor(integer / 10);
  } while (integer !== 0);

  return digits.reverse();
}

function wrapDigitsInComponents(params: {
  digits: number[];
  row: number;
  endingColumn: number;
  highlightedIndices?: {
    highlightStart: number;
    highlightEnd: number;
  };
}): ReactNode[] {
  const { digits, endingColumn, row, highlightedIndices } = params;
  const highlightColor = 'rgb(254 230 138)';
  const gridColumnStart = endingColumn - digits.length + 1;

  const wrappedDigits = digits.map((digit, index) => {
    const gridColumn = gridColumnStart + index;
    return (
      <p
        style={{
          gridRowStart: row,
          gridColumnStart: gridColumn,
          textAlign: 'center',
        }}
        key={index}
      >
        {digit}
      </p>
    );
  });

  if (!highlightedIndices) {
    return wrappedDigits;
  }
  const { highlightStart, highlightEnd } = highlightedIndices;

  const digitsHead = wrappedDigits.filter(
    (digit, index) => index < highlightStart
  );
  const digitsTail = wrappedDigits.filter(
    (digit, index) => index > highlightEnd
  );

  // We use digits instead of wrappedDigits because we're going to wrap these digits ourselves later
  const highlighedDigits = digits.filter(
    (digit, index) => highlightStart <= index && index <= highlightEnd
  );

  const highlighedDigitsWrapper = (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${highlighedDigits.length}, minmax(0, 1fr))`,
        gridRowStart: row,
        gridColumnStart: highlightStart + gridColumnStart,
        gridColumnEnd: highlightEnd + gridColumnStart + 1,
        borderRadius: '8px',
        backgroundColor: highlightColor,
      }}
    >
      {highlighedDigits.map((digit, index) => {
        return (
          <p
            style={{
              gridRowStart: row,
              gridColumnStart: index + 1, // Because grid columns are 1-indexed
              textAlign: 'center',
            }}
          >
            {digit}
          </p>
        );
      })}
    </div>
  );

  return [...digitsHead, highlighedDigitsWrapper, ...digitsTail];
}

const LongSubtraction: React.FC<{
  firstRow: number;
  secondRow: number;
  thirdRow: number;
}> = ({ firstRow, secondRow, thirdRow }) => {
  const firstRowDigits = splitDigits(firstRow);
  const secondRowDigits = splitDigits(secondRow);
  const thirdRowDigits = splitDigits(thirdRow);

  const largestNumOfDigits = Math.max(
    firstRowDigits.length,
    secondRowDigits.length,
    thirdRowDigits.length
  );
  const numOfContentCols = largestNumOfDigits + 1;
  const endingColumn = numOfContentCols;

  return (
    <div className=" flex flex-col">
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(2, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${numOfContentCols}, minmax(0, 1fr))`,
        }}
      >
        {wrapDigitsInComponents({
          digits: firstRowDigits,
          endingColumn,
          row: 1,
          highlightedIndices: { highlightStart: 1, highlightEnd: 1 },
        })}
        {wrapDigitsInComponents({
          digits: secondRowDigits,
          endingColumn,
          row: 2,
          highlightedIndices: { highlightStart: 0, highlightEnd: 2 },
        })}
        <p className="row-start-2 col-start-1">-</p>
      </div>
      <hr className="border border-black" />
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${numOfContentCols}, minmax(0, 1fr))`,
        }}
      >
        {wrapDigitsInComponents({
          digits: thirdRowDigits,
          endingColumn,
          row: 1,
        })}
      </div>
    </div>
  );
};

export default LongSubtraction;
