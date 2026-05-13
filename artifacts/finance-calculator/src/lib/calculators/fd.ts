export function calculateFD(principal: number, rate: number, years: number, compoundingFrequency: "quarterly" | "monthly" | "annually") {
  if (principal <= 0 || rate <= 0 || years <= 0) return { maturityAmount: principal, interestEarned: 0 };
  
  let n = 1;
  if (compoundingFrequency === "monthly") n = 12;
  else if (compoundingFrequency === "quarterly") n = 4;
  
  const r = rate / 100;
  const maturityAmount = principal * Math.pow((1 + r / n), n * years);
  const interestEarned = maturityAmount - principal;
  
  return {
    maturityAmount: Math.round(maturityAmount),
    interestEarned: Math.round(interestEarned)
  };
}