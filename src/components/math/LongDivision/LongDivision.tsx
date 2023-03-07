import React from 'react';
import DividendBlock from './DividendBlock';
import LDSubtractionBlock from './LDSubtractionBlock';
import HighlightedNumber from '../HighlightedNumber';
import wrapDigitsInComponents from '../wrapDigitsInComponents';
import gridGap from './gridGap';

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
