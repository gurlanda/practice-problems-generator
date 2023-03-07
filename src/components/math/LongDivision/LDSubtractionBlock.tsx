import React from 'react';
import HighlightedNumber from '../HighlightedNumber';
import wrapDigitsInComponents from '../wrapDigitsInComponents';
import gridGap from './gridGap';

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

export default LDSubtractionBlock;
