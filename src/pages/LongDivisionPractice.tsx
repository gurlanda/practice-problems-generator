import React, { useEffect, useState } from 'react';
import styledSpanFactory from 'components/styledSpanFactory';
import SolutionStep from 'components/SolutionStep';
import LongDivision from 'components/math/LongDivision/LongDivision';
import HighlightedNumber from 'components/math/HighlightedNumber';
import IndexRange from 'components/math/IndexRange';

/**
 * Rounds a number to a given number of decimal places.
 * @param numberToRound The number to round.
 * @param numberOfDecimalPlaces The number of decimal places to round to.
 * @returns The rounded number.
 */
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

/**
 * Generates a random integer from a lower bound to an upper bound.
 * @param startingInteger The lower bound
 * @param upperBound The upper bound, not included in the range of possible values
 * @returns A random integer within the given range
 */
function randomInteger(startingInteger: number, upperBound: number): number {
  return Math.floor(randomNumber(startingInteger, upperBound));
}

const InversePercentages: React.FC<{}> = () => {
  // Determines whether or not the answer is shown.
  type AnswerVisibilityState = 'Hidden' | 'LastChance' | 'Revealed';
  const [answerVisibilityState, setAnswerVisibilityState] =
    useState<AnswerVisibilityState>('Hidden');

  const largestPossibleDivisor = 12;
  const smallestPossibleDivisor = 2;
  const largestPossibleDividend = 300;
  const [divisor, setDivisor] = useState<number>(12);
  const [dividend, setDividend] = useState<number>(168);
  let answer = dividend / divisor;

  function generateNewDivisorAndDividend() {
    const newDivisor = randomInteger(
      smallestPossibleDivisor,
      largestPossibleDivisor + 1 // The second argument isn't included in the output
    );

    // Generate the dividend so that it's always divisible by the chosen divisor
    function isDivisibleBy(
      possibleDivisor: number,
      possibleDividend: number
    ): boolean {
      return possibleDividend % possibleDivisor === 0;
    }

    let newDividend: number;
    do {
      newDividend = randomInteger(newDivisor + 1, largestPossibleDividend + 1);
    } while (!isDivisibleBy(newDivisor, newDividend));

    setDivisor(newDivisor);
    setDividend(newDividend);
  }

  useEffect(() => {
    // generateNewDivisorAndDividend();
  }, []);

  const [numberOfStepsShown, setNumberOfStepsShown] = useState<number>(0);

  /**
   * Generates the text used in the answer button.
   * @returns The text used in the answer button.
   */
  function answerButtonText(): string {
    switch (answerVisibilityState) {
      case 'Hidden':
        return 'Show Answer';
      case 'LastChance':
        return 'Click again to reveal answer';
      default:
        return `Answer: ${'answer'}`;
    }
  }

  /**
   * Generates the text used in the help button.
   * @returns The text used in the help button.
   */
  function helpButtonText(): string {
    if (numberOfStepsShown === 0) {
      return 'Help';
    } else if (numberOfStepsShown === steps.length) {
      return 'Hide Steps';
    } else {
      return 'Next Step';
    }
  }

  /**
   * Generates the background color and text color of the answer button. The color depends on how many times the user has clicked the button.
   * @returns The background color and text color used for the answer button.
   */
  function answerButtonStyle(): string {
    switch (answerVisibilityState) {
      case 'Hidden':
        return 'text-cyan-50 bg-cyan-600 hover:text-cyan-100 hover:bg-cyan-700 active:text-cyan-200 active:bg-cyan-800';
      case 'LastChance':
        return 'text-yellow-50 bg-yellow-700 hover:text-yellow-100 hover:bg-yellow-800 active:text-yellow-200 active:bg-yellow-900';
      default:
        return 'text-teal-50 bg-teal-600 hover:text-teal-100 hover:bg-teal-700 active:text-teal-200 active:bg-teal-800';
    }
  }

  /**
   * Transition the answerState to the next state.
   */
  function transitionAnswerState() {
    switch (answerVisibilityState) {
      case 'Hidden':
        setAnswerVisibilityState('LastChance');
        return;
      case 'LastChance':
        setAnswerVisibilityState('Revealed');
        return;
      default:
        setAnswerVisibilityState('Hidden');
        return;
    }
  }

  /**
   * Randomly generate a new question and reset the state of this component.
   */
  function generateNewQuestion() {
    generateNewDivisorAndDividend();
    setAnswerVisibilityState('Hidden');
    setNumberOfStepsShown(0);
  }

  /**
   * Show the next hint. If all the hints are shown, then hide all the hints.
   */
  function showNextStep() {
    const nextNumStepsShown = (numberOfStepsShown + 1) % (steps.length + 1);
    console.dir({
      nextNumStepsShown,
    });
    setNumberOfStepsShown(nextNumStepsShown);
  }

  const divisorColor = 'text-red-500';
  const DivisorColor = styledSpanFactory(divisorColor);

  const dividendColor = 'text-green-500';
  const DividendColor = styledSpanFactory(dividendColor);

  const answerColor = 'text-cyan-600';
  const AnswerColor = styledSpanFactory(answerColor);

  const multiplicationColor = 'text-purple-500';
  const multiplicationColor_decoration = 'decoration-purple-500';
  const MultiplicationColor = styledSpanFactory(multiplicationColor);

  const stepOne = (
    <SolutionStep
      stepNumber={1}
      instructions={
        <p>
          Set up the long division frame. The{' '}
          <DivisorColor>divisor</DivisorColor> should be outside while the{' '}
          <DividendColor>dividend</DividendColor> should be placed inside.
        </p>
      }
      calculation={
        <p className=" flex justify-center pt-2">
          <LongDivision
            dividend={new HighlightedNumber(168, new IndexRange(2))}
            divisor={new HighlightedNumber(12)}
            quotient={{
              value: new HighlightedNumber(14, new IndexRange(0)),
              endingColumn: 6,
            }}
            subtractionBlocks={[
              {
                subtrahend: new HighlightedNumber(12),
                difference: new HighlightedNumber(4),
                endingColumn: 5,
              },
              {
                subtrahend: new HighlightedNumber(48),
                difference: new HighlightedNumber(0),
                endingColumn: 6,
              },
            ]}
          />
        </p>
      }
    />
  );

  const stepTwo = (
    <SolutionStep
      stepNumber={1}
      instructions={
        <p>
          Look at the first digit. Is this number less than the{' '}
          <DividendColor>divisor</DividendColor>?
        </p>
      }
      calculation={
        <p className=" flex justify-center pt-2">
          <LongDivision
            dividend={new HighlightedNumber(168)}
            divisor={new HighlightedNumber(12)}
          />
        </p>
      }
    />
  );

  const steps = [stepOne, stepTwo];

  return (
    <section className="flex flex-col items-center w-full h-fit gap-8 text-3xl pb-10">
      <h2 className=" text-4xl font-bold">Long Division Practice</h2>

      {/* Question statement */}
      <p>
        What is <DividendColor>{dividend}</DividendColor> divided by{' '}
        <DivisorColor>{divisor}</DivisorColor>?
      </p>

      {/* <div className=" ">
        <LongDivision
          divisor={12}
          dividend={168}
          quotient={{ value: 2, endingColumn: 5 }}
        />
      </div> */}

      {/* Steps to solve */}
      <section
        className={` flex flex-col gap-16 pb-16 transition-all ${
          numberOfStepsShown === 0 ? 'hidden' : ''
        }`}
      >
        {steps.filter((value, index) => index < numberOfStepsShown)}
      </section>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-[500px]">
        {/* Help button */}
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

        {/* Answer button */}
        <div className="flex items-center justify-center w-full">
          <button
            className={`
            px-5 py-5 w-full rounded-xl transition-all ease-in-out ${answerButtonStyle()}`}
            onClick={transitionAnswerState}
          >
            {answerButtonText()}
          </button>
        </div>

        {/* New question button */}
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

export default InversePercentages;
