import React from 'react';

const steps = ['WhatsApp', 'Produto', 'Brinde', 'Confirmação'];

type StepNavProps = {
  active: number;
};

const StepNav: React.FC<StepNavProps> = ({ active }) => {
  return (
    <div className="stepper">
      {steps.map((label, index) => (
        <div key={label} className={`step ${active === index ? 'active' : ''}`}>
          {index + 1}. {label}
        </div>
      ))}
    </div>
  );
};

export default StepNav;
