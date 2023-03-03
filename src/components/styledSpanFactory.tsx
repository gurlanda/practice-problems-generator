import React, { ReactNode } from 'react';

const StyledSpan: React.FC<{
  children: ReactNode;
  classNames: string;
}> = ({ children, classNames }) => {
  return <span className={classNames}>{children}</span>;
};

function styledSpanFactory(
  classNames: string
): React.FC<{ children: ReactNode }> {
  const PreColoredSpan: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <StyledSpan classNames={classNames}>{children}</StyledSpan>;
  };

  return PreColoredSpan;
}

export default styledSpanFactory;
