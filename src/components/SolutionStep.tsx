import React, { ReactNode, useState } from 'react';

/*
  This component is used to render a solution step. 
  The calculation is initially hidden until shown by the user.
*/
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
      <div className="min-h-[75px] pt-4">
        {calculationIsShown ? (
          calculation
        ) : (
          <div className={`flex justify-center w-full`}>
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
    </div>
  );
};

export default SolutionStep;
