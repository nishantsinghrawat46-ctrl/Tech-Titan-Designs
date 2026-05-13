export function calculateLoanEligibility(monthlyIncome: number, existingEmi: number, rate: number, tenureYears: number) {
  if (monthlyIncome <= 0 || rate <= 0 || tenureYears <= 0) return { maxLoanAmount: 0, maxEmi: 0 };
  
  // Rule of thumb: Total EMIs should not exceed 50% of monthly income
  const maxEmiCapacity = (monthlyIncome * 0.5) - existingEmi;
  
  if (maxEmiCapacity <= 0) {
    return { maxLoanAmount: 0, maxEmi: 0 };
  }
  
  const months = tenureYears * 12;
  const r = rate / 12 / 100;
  
  // Calculate P from EMI formula: P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
  const maxLoanAmount = maxEmiCapacity * (Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months));
  
  return {
    maxLoanAmount: Math.round(maxLoanAmount),
    maxEmi: Math.round(maxEmiCapacity)
  };
}