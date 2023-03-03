import React, { ReactNode } from 'react';

const Fraction: React.FC<{ numerator: ReactNode; denominator: ReactNode }> = ({
  numerator,
  denominator,
}) => {
  return (
    <div className="flex flex-col max-w-fit">
      <div className="">{numerator}</div>
      <hr className=" border border-black" />
      <div>{denominator}</div>
    </div>
  );
};

export default Fraction;
