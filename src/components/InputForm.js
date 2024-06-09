import React, { useState } from 'react';

const InputForm = ({ onChange, inputValues }) => {
  const [subscriptionsEnabled, setSubscriptionsEnabled] = useState(inputValues.revenueStreams.subscriptionsEnabled);
  const [contractsEnabled, setContractsEnabled] = useState(inputValues.revenueStreams.contractsEnabled);

  const handleChange = (section, key, value) => {
    onChange(section, { ...inputValues[section], [key]: value });
  };

  const formatCurrency = (value) => {
    return parseFloat(value || 0).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Initial Investment</h2>
        <input type="number" placeholder="Vehicle" onChange={(e) => handleChange('initialInvestment', 'vehicle', e.target.value)} className="border p-2 w-full" />
        <input type="number" placeholder="Treadmills" onChange={(e) => handleChange('initialInvestment', 'treadmills', e.target.value)} className="border p-2 w-full" />
        <input type="number" placeholder="Branding" onChange={(e) => handleChange('initialInvestment', 'branding', e.target.value)} className="border p-2 w-full" />
        <input type="number" placeholder="Website" onChange={(e) => handleChange('initialInvestment', 'website', e.target.value)} className="border p-2 w-full" />
        <input type="number" placeholder="Booking Software" onChange={(e) => handleChange('initialInvestment', 'bookingSoftware', e.target.value)} className="border p-2 w-full" />
        <input type="number" placeholder="Other" onChange={(e) => handleChange('initialInvestment', 'other', e.target.value)} className="border p-2 w-full" />
        <div className="text-right font-bold">Total Initial Investment: ${formatCurrency(
          Object.values(inputValues.initialInvestment).reduce((acc, val) => acc + parseFloat(val || 0), 0)
        )}</div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Estimated Monthly Operational Cost</h2>
        <input type="number" placeholder="Fuel" onChange={(e) => handleChange('operationalCosts', 'fuel', e.target.value)} className="border p-2 w-full" />
        <div className="text-right">Weekly Fuel Estimate: ${formatCurrency(parseFloat(inputValues.operationalCosts.fuel || 0) / 4.33)}</div>
        <input type="number" placeholder="Labor" onChange={(e) => handleChange('operationalCosts', 'labor', e.target.value)} className="border p-2 w-full" />
        <div className="text-right">Weekly Labor Estimate: ${formatCurrency(parseFloat(inputValues.operationalCosts.labor || 0) / 4.33)}</div>
        <input type="number" placeholder="Insurance" onChange={(e) => handleChange('operationalCosts', 'insurance', e.target.value)} className="border p-2 w-full" />
        <div className="text-right">Weekly Insruance Estimate: ${formatCurrency(parseFloat(inputValues.operationalCosts.insurance || 0) / 4.33)}</div>
        <input type="number" placeholder="Maintenance" onChange={(e) => handleChange('operationalCosts', 'maintenance', e.target.value)} className="border p-2 w-full" />
        <div className="text-right">Weekly Maintenance Estimate: ${formatCurrency(parseFloat(inputValues.operationalCosts.maintenance || 0) / 4.33)}</div>
        <input type="number" placeholder="Software" onChange={(e) => handleChange('operationalCosts', 'software', e.target.value)} className="border p-2 w-full" />
        <div className="text-right">Weekly Software Estimate: ${formatCurrency(parseFloat(inputValues.operationalCosts.software || 0) / 4.33)}</div>
        <input type="number" placeholder="Vehicle Loan" onChange={(e) => handleChange('operationalCosts', 'vehicleLoan', e.target.value)} className="border p-2 w-full" />
        <div className="text-right">Weekly Vehicle Loan Estimate: ${formatCurrency(parseFloat(inputValues.operationalCosts.vehicleLoan || 0) / 4.33)}</div>
        <input type="number" placeholder="Other Loans" onChange={(e) => handleChange('operationalCosts', 'otherLoans', e.target.value)} className="border p-2 w-full" />
        <div className="text-right">Weekly Other Loans Estimate: ${formatCurrency(parseFloat(inputValues.operationalCosts.otherLoans || 0) / 4.33)}</div>
        <div className="text-right font-bold">Total Monthly Operational Cost: ${formatCurrency(
          Object.values(inputValues.operationalCosts).reduce((acc, val) => acc + parseFloat(val || 0), 0)
        )}</div>
        <div className="text-right">Weekly Estimate: ${formatCurrency(
          Object.values(inputValues.operationalCosts).reduce((acc, val) => acc + parseFloat(val || 0), 0) / 4.33
        )}</div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Revenue Streams (Monthly)</h2>
        <p>This is where you can play with the price you will charge customers for individual sessions and assume no add ons. Then play with how many customers you estimate you will have. Keep adjusting until you reach breakeven or are profitable.</p>
        <input type="number" placeholder="What will you charge for each session?" onChange={(e) => handleChange('revenueStreams', 'individualSessionPrice', e.target.value)} className="border p-2 w-full" />
        <input type="number" placeholder="Number of Customers" onChange={(e) => handleChange('revenueStreams', 'individualSessionCustomers', e.target.value)} className="border p-2 w-full" />
        <div className="text-right">Weekly Revenue: ${formatCurrency(
          (parseFloat(inputValues.revenueStreams.individualSessionPrice || 0) * parseFloat(inputValues.revenueStreams.individualSessionCustomers || 0)) / 4.33
        )}</div>
        <div className="text-right">Total Monthly Individual Session Revenue: ${formatCurrency(
          parseFloat(inputValues.revenueStreams.individualSessionPrice || 0) * parseFloat(inputValues.revenueStreams.individualSessionCustomers || 0)
        )}</div>
        <label className="block">
          <input type="checkbox" checked={subscriptionsEnabled} onChange={(e) => { setSubscriptionsEnabled(e.target.checked); handleChange('revenueStreams', 'subscriptionsEnabled', e.target.checked); }} className="mr-2" />
          Enable Subscriptions
        </label>
        {subscriptionsEnabled && (
          <>
            <p>Subscriptions are variable. This section assumes you are selling subscriptions which are a monthly fee and a set number of runs for the subscriber at a reduced rate. For example, the user subscribes for $100 a month and can get 10 runs a month for $30 each.</p>
            <input type="number" placeholder="Subscription Price" onChange={(e) => handleChange('revenueStreams', 'subscriptionPrice', e.target.value)} className="border p-2 w-full" />
            <input type="number" placeholder="Number of Subscribers" onChange={(e) => handleChange('revenueStreams', 'subscriptionCustomers', e.target.value)} className="border p-2 w-full" />
            <input type="number" placeholder="Avg Sessions with Subscription" onChange={(e) => handleChange('revenueStreams', 'subscriptionSessions', e.target.value)} className="border p-2 w-full" />
            <input type="number" placeholder="Avg Session Cost with Subscription" onChange={(e) => handleChange('revenueStreams', 'subscriptionSessionCost', e.target.value)} className="border p-2 w-full" />
            <div className="text-right">Total Monthly Subscription Revenue: ${formatCurrency(
              (parseFloat(inputValues.revenueStreams.subscriptionPrice || 0) * parseFloat(inputValues.revenueStreams.subscriptionCustomers || 0)) +
              (parseFloat(inputValues.revenueStreams.subscriptionSessionCost || 0) * parseFloat(inputValues.revenueStreams.subscriptionSessions || 0) * parseFloat(inputValues.revenueStreams.subscriptionCustomers || 0))
            )}</div>
          </>
        )}
        <label className="block">
  <input
    type="checkbox"
    checked={contractsEnabled}
    onChange={(e) => {
      setContractsEnabled(e.target.checked);
      handleChange('revenueStreams', 'contractsEnabled', e.target.checked);
    }}
    className="mr-2"
  />
  Enable Contracts
</label>
{contractsEnabled && (
  <>
    <p>
      Contracts are deals you've made with businesses and apartment buildings.
      This assumes you have a deal with an apartment building, for example, to
      run their guest and residents at no additional cost to the pet parent. For
      example, you have a contract that for $350 a month to visit the site once
      a month for 3 hours.
    </p>
    <input
      type="number"
      placeholder="Contract Price"
      onChange={(e) => handleChange('revenueStreams', 'contractPrice', e.target.value)}
      className="border p-2 w-full"
    />
    <input
      type="number"
      placeholder="Number of Contracts"
      onChange={(e) => handleChange('revenueStreams', 'contractCustomers', e.target.value)}
      className="border p-2 w-full"
    />
    <div className="text-right">
      Total Monthly Contract Revenue: ${formatCurrency(
        parseFloat(inputValues.revenueStreams.contractPrice || 0) *
        parseFloat(inputValues.revenueStreams.contractCustomers || 0)
      )}
    </div>
  </>
)}
        <div className="text-right font-bold">Total Monthly Revenue: ${formatCurrency(
          (parseFloat(inputValues.revenueStreams.individualSessionPrice || 0) * parseFloat(inputValues.revenueStreams.individualSessionCustomers || 0)) +
          (subscriptionsEnabled ? (parseFloat(inputValues.revenueStreams.subscriptionPrice || 0) * parseFloat(inputValues.revenueStreams.subscriptionCustomers || 0)) + (parseFloat(inputValues.revenueStreams.subscriptionSessionCost || 0) * parseFloat(inputValues.revenueStreams.subscriptionSessions || 0) * parseFloat(inputValues.revenueStreams.subscriptionCustomers || 0)) : 0) +
          (contractsEnabled ? parseFloat(inputValues.revenueStreams.contractPrice || 0) * parseFloat(inputValues.revenueStreams.contractCustomers || 0) : 0)
        )}</div>
      </div>
    </div>
  );
};

export default InputForm;
