import React from 'react';

const Percentages: React.FC<{}> = () => {
  function formatPercentage(percentage: number): string {
    const percentageAsInteger = percentage * 100;
    return `${percentageAsInteger}%`;
  }

  function rounded(
    numberToRound: number,
    numberOfDecimalPlaces: number
  ): number {
    const powerOfTen = Math.pow(10, numberOfDecimalPlaces);
    const rounded = Math.round(numberToRound * powerOfTen) / powerOfTen;
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
    const startingNumber = 0;
    const upperBound = 201;
    return Math.floor(randomNumber(startingNumber, upperBound));
  }

  function randomPercentage(): number {
    const startingNumber = 0.01;
    const upperBound = 2;
    const rawPercentage = randomNumber(startingNumber, upperBound);
    return rounded(rawPercentage, 2);
  }

  const wholeQuantity = randomWholeQuantity();
  const percentage = randomPercentage();
  const answer = rounded(wholeQuantity * percentage, 2);

  return (
    <section className="flex flex-col gap-10">
      <h2 className=" text-4xl font-bold">Percentages Practice</h2>
      <p className="text-xl">
        What is <span>{formatPercentage(percentage)}</span> of{' '}
        <span>{wholeQuantity}</span>?
      </p>
      <p className="text-xl">
        Answer: <span>{answer}</span>
      </p>
    </section>
  );
};

export default Percentages;
