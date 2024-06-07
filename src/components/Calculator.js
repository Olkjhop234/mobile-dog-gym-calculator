import React, { useState } from 'react';
import InputForm from './InputForm';
import Results from './Results';

const Calculator = () => {
  const [inputValues, setInputValues] = useState({
    initialInvestment: {},
    operationalCosts: {},
    revenueStreams: {},
    pricing: {},
  });

  const handleInputChange = (section, values) => {
    setInputValues({ ...inputValues, [section]: values });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Mobile Dog Gym Calculator</h1>
      <InputForm onChange={handleInputChange} />
      <Results inputValues={inputValues} />
    </div>
  );
};

export default Calculator;

