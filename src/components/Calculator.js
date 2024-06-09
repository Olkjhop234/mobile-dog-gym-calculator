import React, { useState } from 'react';
import InputForm from './InputForm';
import Results from './Results';

const Calculator = () => {
  const [inputValues, setInputValues] = useState({
    initialInvestment: {
      vehicle: 0,
      treadmills: 0,
      branding: 0,
      website: 0,
      bookingSoftware: 0,
      other: 0
    },
    operationalCosts: {
      fuel: 0,
      labor: 0,
      insurance: 0,
      maintenance: 0,
      software: 0,
      vehicleLoan: 0,
      otherLoans: 0
    },
    revenueStreams: {
      individualSessionPrice: 0,
      individualSessionCustomers: 0,
      subscriptionsEnabled: false,
      subscriptionPrice: 0,
      subscriptionSessions: 0,
      subscriptionSessionCost: 0,
      subscriptionCustomers: 0,
      contractsEnabled: false,
      contractPrice: 0,
      contractCustomers: 0
    }
  });

  const handleInputChange = (section, values) => {
    setInputValues({ ...inputValues, [section]: values });
  };

  const formatCurrency = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const calculateBreakEven = () => {
    const totalInitialInvestment = Object.values(inputValues.initialInvestment).reduce((acc, val) => acc + parseFloat(val || 0), 0);
    const totalMonthlyOperationalCost = Object.values(inputValues.operationalCosts).reduce((acc, val) => acc + parseFloat(val || 0), 0);
    const totalMonthlyRevenue = (
      (parseFloat(inputValues.revenueStreams.individualSessionPrice || 0) * parseFloat(inputValues.revenueStreams.individualSessionCustomers || 0)) +
      (inputValues.revenueStreams.subscriptionsEnabled
        ? (parseFloat(inputValues.revenueStreams.subscriptionPrice || 0) * parseFloat(inputValues.revenueStreams.subscriptionCustomers || 0)) +
          (parseFloat(inputValues.revenueStreams.subscriptionSessionCost || 0) * parseFloat(inputValues.revenueStreams.subscriptionSessions || 0) * parseFloat(inputValues.revenueStreams.subscriptionCustomers || 0))
        : 0) +
      (inputValues.revenueStreams.contractsEnabled
        ? parseFloat(inputValues.revenueStreams.contractPrice || 0) * parseFloat(inputValues.revenueStreams.contractCustomers || 0)
        : 0)
    ).toFixed(2);

    const breakEvenMonths = (totalInitialInvestment / totalMonthlyRevenue).toFixed(2);
    const breakEvenWeeks = (breakEvenMonths * 4.33).toFixed(2);

    const individualSessionCustomersNeeded = (totalMonthlyOperationalCost / parseFloat(inputValues.revenueStreams.individualSessionPrice || 1)).toFixed(2);
    const subscriptionCustomersNeeded = inputValues.revenueStreams.subscriptionsEnabled
      ? (totalMonthlyOperationalCost / (parseFloat(inputValues.revenueStreams.subscriptionPrice || 1) + (parseFloat(inputValues.revenueStreams.subscriptionSessionCost || 0) * parseFloat(inputValues.revenueStreams.subscriptionSessions || 0)))).toFixed(2)
      : 0;
    const contractCustomersNeeded = inputValues.revenueStreams.contractsEnabled
      ? (totalMonthlyOperationalCost / parseFloat(inputValues.revenueStreams.contractPrice || 1)).toFixed(2)
      : 0;

    return {
      breakEvenMonths,
      breakEvenWeeks,
      individualSessionCustomersNeeded,
      subscriptionCustomersNeeded,
      contractCustomersNeeded,
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Mobile Dog Gym Calculator</h1>
      <p className="text-center mb-4">Use this calculator to estimate the financials of your mobile dog gym business. Enter your initial investment, monthly operational costs, and expected revenue streams to see when you'll break even.</p>
      <InputForm onChange={handleInputChange} inputValues={inputValues} />
      <Results inputValues={inputValues} breakEvenData={calculateBreakEven()} />
    </div>
  );
};

export default Calculator;
