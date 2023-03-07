import React from 'react';
// import Percentages from '../Percentages/Percentages';
// import InversePercentages from '../Percentages/InversePercentages';
import LongDivisionPractice from 'pages/LongDivisionPractice';

const Home: React.FC<{}> = () => {
  return (
    <section
      className=" 
      flex justify-center
      px-10 py-10
      h-screen w-screen
      bg-cyan-100 overflow-y-auto"
    >
      <div className="h-full w-full max-w-[600px]">
        <LongDivisionPractice />
      </div>
    </section>
  );
};

export default Home;
