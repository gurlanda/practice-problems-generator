import React, { useState } from 'react';
import Equation from '../../../components/math/Equation';
import SolutionStep from '../../../components/SolutionStep';
import styledSpanFactory from '../../../components/styledSpanFactory';

/**
 * Return a formatted percentage string.
 * @param percentage The percentage to format, as an integer.
 * @returns The formatted percentage string.
 */
function formatPercentage(percentage: number): string {
  return `${percentage}%`;
}

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
 * Used to randomly initialize wholeQuantity as an integer within the range [1, 200].
 * @returns A random number within the range [1, 200].
 */
function randomWholeQuantity(): number {
  const startingNumber = 1;
  const upperBound = 201;
  return Math.floor(randomNumber(startingNumber, upperBound));
}

/**
 * Used to randomly initialize the percentage as an integer within the range [1, 200].
 * @returns A random number within the range [1, 200].
 */
function randomPercentage(): number {
  const startingNumber = 1;
  const upperBound = 201;
  return Math.floor(randomNumber(startingNumber, upperBound));
}

const Percentages: React.FC<{}> = () => {
  // Determines whether or not the answer is shown.
  type AnswerState = 'Hidden' | 'LastChance' | 'Revealed';
  const [answerState, setAnswerState] = useState<AnswerState>('Hidden');

  // The quantity to take a percentage of.
  const [wholeQuantity, setWholeQuantity] = useState<number>(
    randomWholeQuantity()
  );

  // The percentage used in the problem.
  const [percentage, setPercentage] = useState<number>(randomPercentage());
  const [numberOfStepsShown, setNumberOfStepsShown] = useState<number>(0);

  const answer = rounded(wholeQuantity * (percentage / 100), 2);

  const percentageColor = 'text-red-500';
  const PercentageColor = styledSpanFactory(percentageColor);

  const wholeQuantityColor = 'text-green-500';
  const WholeQuantityColor = styledSpanFactory(wholeQuantityColor);

  const answerColor = 'text-cyan-600';
  const AnswerColor = styledSpanFactory(answerColor);

  /**
   * Generates the text used in the answer button.
   * @returns The text used in the answer button.
   */
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
    switch (answerState) {
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

  /**
   * Randomly generate a new question and reset the state of this component.
   */
  function generateNewQuestion() {
    setWholeQuantity(randomWholeQuantity());
    setPercentage(randomPercentage());
    setAnswerState('Hidden');
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

  const stepOne = (
    <SolutionStep
      stepNumber={1}
      instructions={
        <p>
          Convert the <PercentageColor>percentage</PercentageColor> to a decimal
          by dividing it by 100.
        </p>
      }
      calculation={
        <p className=" text-center pt-2">
          <PercentageColor>{formatPercentage(percentage)}</PercentageColor>{' '}
          <i className="fa-solid fa-arrow-right-long"></i>{' '}
          <PercentageColor>{percentage / 100}</PercentageColor>
        </p>
      }
    />
  );

  const stepTwo = (
    <SolutionStep
      stepNumber={2}
      instructions={
        <p>
          Multiply this <PercentageColor>new decimal</PercentageColor> by the{' '}
          <WholeQuantityColor>other number</WholeQuantityColor> to get the{' '}
          <AnswerColor>answer</AnswerColor>.
        </p>
      }
      calculation={
        <Equation
          leftSide={
            <span>
              <PercentageColor>{percentage / 100}</PercentageColor>{' '}
              <i className="fa-solid fa-xmark"></i>{' '}
              <WholeQuantityColor>{wholeQuantity}</WholeQuantityColor>
            </span>
          }
          rightSide={<AnswerColor>{answer}</AnswerColor>}
        />
      }
    />
  );

  const steps = [stepOne, stepTwo];

  return (
    <section className="flex flex-col items-center w-full h-fit gap-8 text-3xl pb-10">
      <h2 className=" text-4xl font-bold">Percentages Practice</h2>

      {/* Question statement */}
      <p>
        What is{' '}
        <PercentageColor>{formatPercentage(percentage)}</PercentageColor> of{' '}
        <WholeQuantityColor>{wholeQuantity}</WholeQuantityColor>?
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

export default Percentages;
