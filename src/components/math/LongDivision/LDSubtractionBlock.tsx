import React from 'react';
import HighlightedNumber from '../HighlightedNumber';
import wrapDigitsInComponents from '../wrapDigitsInComponents';

export type LDSubtractionBlockData = {
  subtrahend: HighlightedNumber;
  difference: HighlightedNumber;
  differenceOverflow?: HighlightedNumber;
  endingColumn: number;
};

const LDSubtractionBlock: React.FC<{
  subtrahend: HighlightedNumber;
  difference: HighlightedNumber;
  differenceOverflow?: HighlightedNumber;
  endingRow: number;
  endingColumn: number;
}> = ({
  subtrahend,
  difference,
  differenceOverflow,
  endingRow,
  endingColumn,
}) => {
  const subtrahendDigits = subtrahend.digits;
  const differenceDigits = difference.digits;
  const differenceOverflowLength =
    differenceOverflow === undefined ? 0 : differenceOverflow.digits.length;

  const rowSpan = 2;
  const widthOfMainGrid =
    Math.max(subtrahendDigits.length, differenceDigits.length) + 1; // +1 for the minus sign
  const totalGridColumnSpan = widthOfMainGrid + differenceOverflowLength;

  return (
    <div
      style={{
        gridRowStart: endingRow - rowSpan,
        gridRowEnd: endingRow,
        gridColumnStart: endingColumn - totalGridColumnSpan,
        gridColumnEnd: endingColumn,

        display: 'grid',
        gridTemplateRows: `repeat(${rowSpan}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${totalGridColumnSpan}, minmax(0,1fr))`,
      }}
    >
      {/* Main grid */}
      <div
        className=" flex flex-col"
        style={{
          gridRowStart: 1,
          gridRowEnd: 3,
          gridColumnStart: 1,
          gridColumnEnd: widthOfMainGrid + 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${widthOfMainGrid}, minmax(0, 1fr))`,
          }}
        >
          {wrapDigitsInComponents(subtrahend, 1, widthOfMainGrid + 1)}
          <p className="row-start-1 col-start-1 text-center">-</p>
        </div>
        <hr className="border-[1.5px] border-black" />
        <div
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${widthOfMainGrid}, minmax(0, 1fr))`,
          }}
        >
          {wrapDigitsInComponents(difference, 1, widthOfMainGrid + 1)}
        </div>
      </div>

      {/* Difference overflow */}
      {differenceOverflow !== undefined &&
        wrapDigitsInComponents(differenceOverflow, 2, totalGridColumnSpan + 1)}
    </div>
  );
};

export default LDSubtractionBlock;
