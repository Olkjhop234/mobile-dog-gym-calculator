import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Results = ({ inputValues }) => {
  const [timeFrame, setTimeFrame] = useState('weeks');

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
    const weeklyOperationalCosts = (totalOperationalCosts / 4.33).toFixed(2);

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
    const weeklyRevenue = (totalRevenue / 4.33).toFixed(2);

    // Break-Even Analysis
    const breakEvenTimeMonths = (totalInitialInvestment / (totalRevenue - totalOperationalCosts)).toFixed(2);
    const breakEvenTimeWeeks = (breakEvenTimeMonths * 4.33).toFixed(2);

    const individualSessionCustomersNeeded = Math.ceil(totalOperationalCosts / (revenueStreams.individualSessionPrice || 1));
    const subscriptionCustomersNeeded = revenueStreams.subscriptionsEnabled 
      ? Math.ceil((totalOperationalCosts - (revenueStreams.subscriptionSessionCost * revenueStreams.subscriptionSessions * revenueStreams.subscriptionCustomers)) / (revenueStreams.subscriptionPrice || 1)) 
      : 0;
    const contractCustomersNeeded = revenueStreams.contractsEnabled 
      ? Math.ceil(totalOperationalCosts / (revenueStreams.contractPrice || 1)) 
      : 0;

    // Break-Even Analysis for different timeframes
    const calculateBreakEven = (months) => {
      const monthlyProfit = totalRevenue - totalOperationalCosts;
      return Math.ceil(totalInitialInvestment / (monthlyProfit / months));
    };

    const monthlyProfit = (totalRevenue - totalOperationalCosts).toFixed(2);
    const profitMargin = ((monthlyProfit / totalRevenue) * 100).toFixed(2);

    const totalSessionsNeeded = Math.ceil(individualSessionCustomersNeeded + subscriptionCustomersNeeded * (revenueStreams.subscriptionSessions || 0));
    const weeklySessionsNeeded = (totalSessionsNeeded / 4.33).toFixed(2);
    const sessionsPerDay5Days = Math.ceil(totalSessionsNeeded / 20); // Assuming 4 weeks a month, 5 days a week
    const sessionsPerDay7Days = Math.ceil(totalSessionsNeeded / 28); // Assuming 4 weeks a month, 7 days a week

    return {
      totalInitialInvestment,
      totalOperationalCosts,
      weeklyOperationalCosts,
      individualSessionRevenue,
      subscriptionRevenue,
      contractRevenue,
      totalRevenue,
      weeklyRevenue,
      breakEvenTimeMonths,
      breakEvenTimeWeeks,
      individualSessionCustomersNeeded,
      subscriptionCustomersNeeded,
      contractCustomersNeeded,
      monthlyProfit,
      profitMargin,
      totalSessionsNeeded,
      weeklySessionsNeeded,
      sessionsPerDay5Days,
      sessionsPerDay7Days
    };
  };

  const data = calculateResults();

  const chartData = {
    labels: timeFrame === 'weeks' ? Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`) : Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Revenue',
        data: timeFrame === 'weeks' ? Array.from({ length: 12 }, (_, i) => data.weeklyRevenue * (i + 1)) : Array.from({ length: 12 }, (_, i) => data.totalRevenue * (i + 1)),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Operational Costs',
        data: timeFrame === 'weeks' ? Array.from({ length: 12 }, (_, i) => data.weeklyOperationalCosts * (i + 1)) : Array.from({ length: 12 }, (_, i) => data.totalOperationalCosts * (i + 1)),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit',
        data: timeFrame === 'weeks' ? Array.from({ length: 12 }, (_, i) => (data.weeklyRevenue - data.weeklyOperationalCosts) * (i + 1)) : Array.from({ length: 12 }, (_, i) => (data.totalRevenue - data.totalOperationalCosts) * (i + 1)),
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Break-Even Analysis</h2>
      <p>Break-Even Time: {isNaN(data.breakEvenTimeMonths) ? 'N/A' : `${data.breakEvenTimeMonths} months (${data.breakEvenTimeWeeks} weeks)`}</p>

      <h3 className="text-xl font-bold mt-4">Financial Summary</h3>
      <p>Based on your input, to cover your cost, you will need to provide {data.totalSessionsNeeded} Mobile Dog Gym sessions each month or about {data.weeklySessionsNeeded} a week. If you were operating 5 days a week that is about {data.sessionsPerDay5Days} sessions a day, if you were operating 7 days a week it's about {data.sessionsPerDay7Days} sessions a day. Consider the operational times and shifts of your fitness unit to understand if this is achievable. Also consider any contracts you have that will cause your fitness unit to be unable to serve regular clients.</p>
      <p>Total Monthly Revenue: ${data.totalRevenue.toFixed(2)}</p>
      <p>Total Monthly Cost: ${data.totalOperationalCosts.toFixed(2)}</p>
      <p>Monthly Profit: ${data.monthlyProfit}</p>
      <p>Profit Margin: {data.profitMargin}%</p>

      <div className="mt-4">
        <Line data={chartData} />
      </div>

      <div className="flex justify-center mt-4">
        <button className={`px-4 py-2 mx-2 ${timeFrame === 'weeks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setTimeFrame('weeks')}>
          12 Weeks
        </button>
        <button className={`px-4 py-2 mx-2 ${timeFrame === 'months' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setTimeFrame('months')}>
          12 Months
        </button>
      </div>
    </div>
  );
};

export default Results;
