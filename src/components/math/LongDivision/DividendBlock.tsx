import React from 'react';
import HighlightedNumber from '../HighlightedNumber';
import wrapDigitsInComponents from '../wrapDigitsInComponents';

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

export default DividendBlock;
