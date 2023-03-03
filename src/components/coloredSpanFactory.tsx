import React, { ReactNode } from 'react';

const ColoredSpan: React.FC<{
  children: ReactNode;
  colorClassName: string;
}> = ({ children, colorClassName }) => {
  return <span className={colorClassName}>{children}</span>;
};

function coloredSpanFactory(
  colorClassName: string
): React.FC<{ children: ReactNode }> {
  const PreColoredSpan: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <ColoredSpan colorClassName={colorClassName}>{children}</ColoredSpan>
    );
  };

  return PreColoredSpan;
}

export default coloredSpanFactory;
