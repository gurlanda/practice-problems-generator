import React, { useState } from 'react';

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

  function answerButtonStyle(): string {
    switch (answerState) {
      case 'Hidden':
        return 'text-cyan-100 bg-cyan-600 hover:text-cyan-200 hover:bg-cyan-700 active:text-cyan-300 active:bg-cyan-800';
      case 'LastChance':
        return 'text-yellow-100 bg-yellow-700 hover:text-yellow-200 hover:bg-yellow-800 active:text-yellow-300 active:bg-yellow-900';
      default:
        return 'text-teal-100 bg-teal-600 hover:text-teal-200 hover:bg-teal-700 active:text-teal-300 active:bg-teal-800';
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
  }

  return (
    <section className="flex flex-col items-center gap-10">
      <h2 className=" text-4xl font-bold">Percentages Practice</h2>
      <p className="text-3xl">
        What is <span>{formatPercentage(percentage)}</span> of{' '}
        <span>{wholeQuantity}</span>?
      </p>
      <div className="flex items-center justify-center">
        <button
          className={`
            px-5 py-4 rounded-xl text-3xl transition-all ease-in-out ${answerButtonStyle()}`}
          onClick={transitionAnswerState}
        >
          {answerButtonText()}
        </button>
      </div>
      <div className="flex items-center justify-center">
        <button
          className={`
            px-5 py-4 rounded-xl text-3xl transition-all ease-in-out 
            text-emerald-50 bg-emerald-600 
            hover:text-emerald-100 hover:bg-emerald-700 
            active:text-emerald-200 active:bg-emerald-800`}
          onClick={generateNewQuestion}
        >
          Generate New Question
        </button>
      </div>
    </section>
  );
};

export default Percentages;
