import React, { ReactNode } from 'react';

const StyledSpan: React.FC<{
  children: ReactNode;
  classes: string;
}> = ({ children, classes }) => {
  return <span className={classes}>{children}</span>;
};

/**
 * Given a string of classes, creates a reusable span that has the given class names. This is useful if you want to use many spans, all with the same style applied to them.
 * @param classNames The class names used on the produced span.
 * @returns A span element pre-styled with the given class names.
 */
function styledSpanFactory(classes: string): React.FC<{ children: ReactNode }> {
  const PreStyledSpan: React.FC<{
    classNames?: string;
    children: ReactNode;
  }> = ({ children, classNames }) => {
    return (
      <StyledSpan classes={`${classes} ${classNames}`}>{children}</StyledSpan>
    );
  };

  return PreStyledSpan;
}

export default styledSpanFactory;
