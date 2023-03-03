import React, { ReactNode } from 'react';

const Equation: React.FC<{
  leftSide: ReactNode;
  rightSide: ReactNode;
  implies?: boolean;
}> = ({ leftSide, rightSide, implies }) => {
  return (
    <div className=" flex items-center justify-center gap-4">
      {implies && <i className="fa-solid fa-right-long" />}
      {leftSide}
      <p>
        <i className="fa-solid fa-equals" />
      </p>
      {rightSide}
    </div>
  );
};

export default Equation;
