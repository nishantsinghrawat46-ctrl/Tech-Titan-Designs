export function calculateMortgage(homePrice: number, downPayment: number, interestRate: number, loanTermYears: number, propertyTaxPercent: number, hoaFees: number) {
  if (homePrice <= 0 || loanTermYears <= 0) {
    return { monthlyPayment: 0, totalCost: 0, breakdown: null };
  }
  
  const principal = Math.max(0, homePrice - downPayment);
  const months = loanTermYears * 12;
  const r = interestRate / 12 / 100;
  
  let principalAndInterest = 0;
  if (r > 0 && principal > 0) {
    principalAndInterest = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  } else if (principal > 0) {
    principalAndInterest = principal / months;
  }
  
  const monthlyPropertyTax = (homePrice * (propertyTaxPercent / 100)) / 12;
  const totalMonthlyPayment = principalAndInterest + monthlyPropertyTax + hoaFees;
  
  const totalCost = (totalMonthlyPayment * months) + downPayment;
  
  return {
    monthlyPayment: Math.round(totalMonthlyPayment),
    totalCost: Math.round(totalCost),
    breakdown: {
      principalAndInterest: Math.round(principalAndInterest),
      propertyTax: Math.round(monthlyPropertyTax),
      hoaFees: Math.round(hoaFees),
      loanAmount: principal
    }
  };
}