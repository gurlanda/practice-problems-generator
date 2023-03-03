import React from 'react';
import Percentages from './Percentages/Percentages';

const Home: React.FC<{}> = () => {
  return (
    <section
      className=" 
      flex justify-center
      px-10 py-10
      h-screen w-screen
      bg-cyan-100 overflow-y-auto"
    >
      <Percentages />
    </section>
  );
};

export default Home;
