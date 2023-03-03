import React, { ReactNode, useState } from 'react';

const SolutionStep: React.FC<{
  stepNumber: number;
  instructions: ReactNode;
  calculation: ReactNode;
}> = ({ stepNumber, instructions, calculation }) => {
  const [calculationIsShown, setCalculationIsShown] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold">Step {stepNumber}</h3>
      {instructions}
      {calculationIsShown ? (
        <div className=" min-h-[75px]">{calculation}</div>
      ) : (
        <div
          className={`flex justify-center w-full  min-h-[75px] cursor-pointer`}
        >
          <button
            className=" px-6 py-4 rounded-xl text-white text-center
        bg-slate-400 bg-opacity-50
        hover:bg-slate-500 hover:bg-opacity-50
        active:bg-slate-600 active:bg-opacity-50
        "
            onClick={() => setCalculationIsShown(true)}
          >
            Show calculation
          </button>
        </div>
      )}
    </div>
  );
};

export default SolutionStep;
