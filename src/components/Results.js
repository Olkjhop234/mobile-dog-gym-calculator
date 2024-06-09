import React from 'react';
import { Line } from 'react-chartjs-2';

const Results = ({ inputValues }) => {
  const calculateResults = () => {
    const {
      initialInvestment,
      operationalCosts,
      revenueStreams
    } = inputValues;

    // Total Initial Investment
    const totalInitialInvestment = Object.values(initialInvestment).reduce((acc, val) => acc + parseFloat(val || 0), 0);

    // Total Monthly Operational Costs
    const totalOperationalCosts = Object.values(operationalCosts).reduce((acc, val) => acc + parseFloat(val || 0), 0);
    const weeklyOperationalCosts = totalOperationalCosts / 4.33;

    // Revenue Streams Calculations
    const individualSessionRevenue = parseFloat(revenueStreams.individualSessionPrice || 0) * parseFloat(revenueStreams.individualSessionCustomers || 0);
    const subscriptionRevenue = revenueStreams.subscriptionsEnabled
      ? (parseFloat(revenueStreams.subscriptionPrice || 0) * parseFloat(revenueStreams.subscriptionCustomers || 0)) +
        (parseFloat(revenueStreams.subscriptionSessionCost || 0) * parseFloat(revenueStreams.subscriptionSessions || 0) * parseFloat(revenueStreams.subscriptionCustomers || 0))
      : 0;
    const contractRevenue = revenueStreams.contractsEnabled
      ? parseFloat(revenueStreams.contractPrice || 0) * parseFloat(revenueStreams.contractCustomers || 0)
      : 0;
    
    // Total Monthly Revenue
    const totalRevenue = individualSessionRevenue + subscriptionRevenue + contractRevenue;
    const weeklyRevenue = totalRevenue / 4.33;

    // Profit and Profit Margin Calculations
    const totalMonthlyCost = totalOperationalCosts;
    const monthlyProfit = totalRevenue - totalMonthlyCost;
    const profitMargin = totalRevenue > 0 ? (monthlyProfit / totalRevenue) * 100 : 0;

    // Break-Even Analysis
    const breakEvenTimeMonths = totalRevenue > totalMonthlyCost ? totalInitialInvestment / (totalRevenue - totalMonthlyCost) : NaN;
    const breakEvenTimeWeeks = breakEvenTimeMonths * 4.33;

    const individualSessionCustomersNeeded = parseFloat(totalMonthlyCost / (revenueStreams.individualSessionPrice || 1)) || 0;
    const subscriptionCustomersNeeded = revenueStreams.subscriptionsEnabled 
      ? parseFloat((totalMonthlyCost / ((revenueStreams.subscriptionPrice || 0) + (revenueStreams.subscriptionSessionCost || 0) * (revenueStreams.subscriptionSessions || 0)))) || 0 
      : 0;
    const contractCustomersNeeded = revenueStreams.contractsEnabled 
      ? parseFloat(totalMonthlyCost / (revenueStreams.contractPrice || 1)) || 0 
      : 0;

    // Break-Even Analysis for different timeframes
    const calculateBreakEven = (months) => {
      const monthlyProfit = totalRevenue - totalMonthlyCost;
      return totalInitialInvestment / (monthlyProfit / months);
    }

    return {
      totalInitialInvestment,
      totalOperationalCosts,
      weeklyOperationalCosts,
      individualSessionRevenue,
      subscriptionRevenue,
      contractRevenue,
      totalRevenue,
      weeklyRevenue,
      totalMonthlyCost,
      monthlyProfit,
      profitMargin,
      breakEvenTimeMonths,
      breakEvenTimeWeeks,
      individualSessionCustomersNeeded,
      subscriptionCustomersNeeded,
      contractCustomersNeeded,
      breakEven12Months: calculateBreakEven(12),
      breakEven24Months: calculateBreakEven(24),
      breakEven36Months: calculateBreakEven(36)
    };
  };

  const data = calculateResults();

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue',
        data: [data.weeklyRevenue, data.weeklyRevenue * 2, data.weeklyRevenue * 3, data.weeklyRevenue * 4],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Break-Even Analysis</h2>
      <p>This section provides an analysis of when you'll break even based on your total revenue. The break-even time is calculated by dividing your total initial investment by your net monthly revenue.</p>
      <p>Break-Even Time: {isNaN(data.breakEvenTimeMonths) ? 'N/A' : `${data.breakEvenTimeMonths.toFixed(2)} months (${data.breakEvenTimeWeeks.toFixed(2)} weeks)`}</p>
      <p>Individual Session Customers Needed for Break-Even (based on individual sessions only): {data.individualSessionCustomersNeeded.toFixed(2)}</p>
      <p>Subscription Customers Needed for Break-Even (based on subscriptions only): {data.subscriptionCustomersNeeded.toFixed(2)}</p>
      <p>Contract Customers Needed for Break-Even (based on contracts only): {data.contractCustomersNeeded.toFixed(2)}</p>
      <h3>Break-Even Analysis for different timeframes</h3>
      <p>12 Months: {data.breakEven12Months.toFixed(2)}</p>
      <p>24 Months: {data.breakEven24Months.toFixed(2)}</p>
      <p>36 Months: {data.breakEven36Months.toFixed(2)}</p>

      <div className="mt-4">
        <Line data={chartData} />
      </div>
      <div className="mt-4 font-bold">
        <p>Total Monthly Revenue: ${data.totalRevenue.toFixed(2)}</p>
        <p>Total Monthly Cost: ${data.totalMonthlyCost.toFixed(2)}</p>
        <p>Monthly Profit: ${data.monthlyProfit.toFixed(2)}</p>
        <p>Profit Margin: {data.profitMargin.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Results;

