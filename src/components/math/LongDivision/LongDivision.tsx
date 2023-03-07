import React from 'react';
import DividendBlock from './DividendBlock';
import LDSubtractionBlock, {
  LDSubtractionBlockData,
} from './LDSubtractionBlock';
import HighlightedNumber from '../HighlightedNumber';
import wrapDigitsInComponents from '../wrapDigitsInComponents';

const LongDivision: React.FC<{
  divisor: HighlightedNumber;
  dividend: HighlightedNumber;
  quotient?: { value: HighlightedNumber; endingColumn: number };
  subtractionBlocks?: LDSubtractionBlockData[];
}> = ({ divisor, dividend, quotient, subtractionBlocks }) => {
  const columnGap = '5px';

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
        columnGap: columnGap,
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
          differenceOverflow={block.differenceOverflow}
          endingRow={frameHeight + (index + 1) * 2}
          endingColumn={block.endingColumn}
        />
      ))}
    </div>
  );
};

export default LongDivision;
