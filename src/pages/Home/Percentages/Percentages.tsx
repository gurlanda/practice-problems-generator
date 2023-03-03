import React, { useState } from 'react';
import SolutionStep from '../../../components/SolutionStep';

type AnswerState = 'Hidden' | 'LastChance' | 'Revealed';

function formatPercentage(percentage: number): string {
  return `${percentage}%`;
}

function rounded(numberToRound: number, numberOfDecimalPlaces: number): number {
  const powerOfTen = Math.pow(10, numberOfDecimalPlaces);
  const rounded = Math.floor(numberToRound * powerOfTen) / powerOfTen;
  return rounded;
}

/**
 * Generates a random number from a lower bound to an upper bound.
 * @param startingNumber The lower bound
 * @param upperBound The upper bound, not included in the range of possible values
 * @returns A random number within the given range
 */
function randomNumber(startingNumber: number, upperBound: number): number {
  const range = upperBound - startingNumber;
  return Math.random() * range + startingNumber;
}

function randomWholeQuantity(): number {
  const startingNumber = 1;
  const upperBound = 201;
  return Math.floor(randomNumber(startingNumber, upperBound));
}

function randomPercentage(): number {
  const startingNumber = 1;
  const upperBound = 201;
  return Math.floor(randomNumber(startingNumber, upperBound));
}

const Percentages: React.FC<{}> = () => {
  const [answerState, setAnswerState] = useState<AnswerState>('Hidden');
  const [wholeQuantity, setWholeQuantity] = useState<number>(
    randomWholeQuantity()
  );
  const [percentage, setPercentage] = useState<number>(randomPercentage());
  const [numberOfStepsShown, setNumberOfStepsShown] = useState<number>(0);

  const percentageColor = 'text-red-500';
  const wholeQuantityColor = 'text-green-500';
  const answerColor = 'text-cyan-600';

  const answer = rounded(wholeQuantity * (percentage / 100), 2);
  function answerButtonText(): string {
    switch (answerState) {
      case 'Hidden':
        return 'Show Answer';
      case 'LastChance':
        return 'Click again to reveal answer';
      default:
        return `Answer: ${answer}`;
    }
  }

  function helpButtonText(): string {
    if (numberOfStepsShown === 0) {
      return 'Help';
    } else if (numberOfStepsShown === steps.length) {
      return 'Hide Steps';
    } else {
      return 'Next Step';
    }
  }

  function answerButtonStyle(): string {
    switch (answerState) {
      case 'Hidden':
        return 'text-cyan-50 bg-cyan-600 hover:text-cyan-100 hover:bg-cyan-700 active:text-cyan-200 active:bg-cyan-800';
      case 'LastChance':
        return 'text-yellow-50 bg-yellow-700 hover:text-yellow-100 hover:bg-yellow-800 active:text-yellow-200 active:bg-yellow-900';
      default:
        return 'text-teal-50 bg-teal-600 hover:text-teal-100 hover:bg-teal-700 active:text-teal-200 active:bg-teal-800';
    }
  }

  function transitionAnswerState() {
    switch (answerState) {
      case 'Hidden':
        setAnswerState('LastChance');
        return;
      case 'LastChance':
        setAnswerState('Revealed');
        return;
      default:
        setAnswerState('Hidden');
        return;
    }
  }

  function generateNewQuestion() {
    setWholeQuantity(randomWholeQuantity());
    setPercentage(randomPercentage());
    setAnswerState('Hidden');
    setNumberOfStepsShown(0);
  }

  function showNextStep() {
    const nextNumStepsShown = (numberOfStepsShown + 1) % (steps.length + 1);
    console.dir({
      nextNumStepsShown,
    });
    setNumberOfStepsShown(nextNumStepsShown);
  }

  const stepOne = (
    <SolutionStep
      stepNumber={1}
      instructions={
        <p>
          Convert the <span className={percentageColor}>percentage</span> to a
          decimal by dividing it by 100.
        </p>
      }
      calculation={
        <p className=" text-center pt-2">
          <span className={percentageColor}>
            {formatPercentage(percentage)}
          </span>{' '}
          <i className="fa-solid fa-arrow-right-long"></i>{' '}
          <span className={percentageColor}>{percentage / 100}</span>
        </p>
      }
    />
  );

  const stepTwo = (
    <SolutionStep
      stepNumber={2}
      instructions={
        <p>
          Multiply this <span className={percentageColor}>new decimal</span> by
          the <span className={wholeQuantityColor}>other number</span> to get
          the <span className={answerColor}>answer</span>.
        </p>
      }
      calculation={
        <p className=" text-center pt-2">
          <span className={percentageColor}>{percentage / 100}</span>{' '}
          <i className="fa-solid fa-xmark"></i>{' '}
          <span className={wholeQuantityColor}>{wholeQuantity}</span>{' '}
          <i className="fa-solid fa-equals"></i>{' '}
          <span className={answerColor}>{answer}</span>
        </p>
      }
    />
  );

  const steps = [stepOne, stepTwo];

  return (
    <section className="flex flex-col items-center w-full h-screen max-w-[500px] gap-8 text-3xl">
      <h2 className=" text-4xl font-bold">Percentages Practice</h2>

      {/* Question statement */}
      <p>
        What is{' '}
        <span className={percentageColor}>{formatPercentage(percentage)}</span>{' '}
        of <span className={wholeQuantityColor}>{wholeQuantity}</span>?
      </p>

      {/* Steps to solve */}
      <section
        className={` flex flex-col gap-5 transition-all ${
          numberOfStepsShown === 0 ? 'hidden' : ''
        }`}
      >
        {steps.filter((value, index) => index < numberOfStepsShown)}
      </section>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-center w-full">
          <button
            className={`
            px-5 py-5 w-full rounded-xl transition-all ease-in-out 
            text-blue-50 bg-blue-600 
            hover:text-blue-100 hover:bg-blue-700 
            active:text-blue-200 active:bg-blue-800`}
            onClick={showNextStep}
          >
            {helpButtonText()}
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            className={`
            px-5 py-5 w-full rounded-xl transition-all ease-in-out ${answerButtonStyle()}`}
            onClick={transitionAnswerState}
          >
            {answerButtonText()}
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            className={`
            px-5 py-5 w-full rounded-xl transition-all ease-in-out 
            text-emerald-50 bg-emerald-600 
            hover:text-emerald-100 hover:bg-emerald-700 
            active:text-emerald-200 active:bg-emerald-800`}
            onClick={generateNewQuestion}
          >
            New Question
          </button>
        </div>
      </div>
    </section>
  );
};

export default Percentages;
