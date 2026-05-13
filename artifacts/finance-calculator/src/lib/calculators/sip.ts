export function calculateSIP(monthlyInvestment: number, expectedRate: number, years: number) {
  if (monthlyInvestment <= 0 || expectedRate <= 0 || years <= 0) return { investedAmount: 0, estimatedReturns: 0, totalValue: 0 };
  
  const months = years * 12;
  const r = expectedRate / 12 / 100;
  
  const futureValue = monthlyInvestment * ( (Math.pow(1 + r, months) - 1) / r ) * (1 + r);
  const investedAmount = monthlyInvestment * months;
  const estimatedReturns = futureValue - investedAmount;
  
  return {
    investedAmount: Math.round(investedAmount),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(futureValue)
  };
}