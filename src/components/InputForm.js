import React from 'react';

const InputForm = ({ onChange }) => {
  const handleChange = (section, key, value) => {
    onChange(section, { [key]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Initial Investment</h2>
        <input type="number" placeholder="Vehicle" onChange={(e) => handleChange('initialInvestment', 'vehicle', e.target.value)} className="border p-2 w-full"/>
        <input type="number" placeholder="Treadmills" onChange={(e) => handleChange('initialInvestment', 'treadmills', e.target.value)} className="border p-2 w-full"/>
        <input type="number" placeholder="Branding" onChange={(e) => handleChange('initialInvestment', 'branding', e.target.value)} className="border p-2 w-full"/>
        <input type="number" placeholder="Website" onChange={(e) => handleChange('initialInvestment', 'website', e.target.value)} className="border p-2 w-full"/>
        <input type="number" placeholder="Booking Software" onChange={(e) => handleChange('initialInvestment', 'bookingSoftware', e.target.value)} className="border p-2 w-full"/>
      </div>
      <div>
        <h2 className="text-xl font-bold">Operational Costs</h2>
        <input type="number" placeholder="Fuel" onChange={(e) => handleChange('operationalCosts', 'fuel', e.target.value)} className="border p-2 w-full"/>
        <input type="number" placeholder="Labor" onChange={(e) => handleChange('operationalCosts', 'labor', e.target.value)} className="border p-2 w-full"/>
        <input type="number" placeholder="Insurance" onChange={(e) => handleChange('operationalCosts', 'insurance', e.target.value)} className="border p-2 w-full"/>
        <input type="number" placeholder="Maintenance" onChange={(e) => handleChange('operationalCosts', 'maintenance', e.target.value)} className="border p-2 w-full"/>
        <input type="number" placeholder="Software" onChange={(e) => handleChange('operationalCosts', 'software', e.target.value)} className="border p-2 w-full"/>
      </div>
      <div>
        <h2 className="text-xl font-bold">Revenue Streams</h2>
        <input type="number" placeholder="Individual Sessions" onChange={(e) => handleChange('revenueStreams', 'individualSessions', e.target.value)} className="border p-2 w-full"/>
        <label className="block">
          <input type="checkbox" onChange={(e) => handleChange('revenueStreams', 'subscriptionsEnabled', e.target.checked)} className="mr-2"/>
          Enable Subscriptions
        </label>
        <label className="block">
          <input type="checkbox" onChange={(e) => handleChange('revenueStreams', 'contractsEnabled', e.target.checked)} className="mr-2"/>
          Enable Contracts
        </label>
        {/* Additional input fields for subscriptions and contracts would appear based on the checkbox state */}
      </div>
    </div>
  );
};

export default InputForm;

