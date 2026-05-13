export function calculateEMI(principal: number, rate: number, months: number) {
  if (principal <= 0 || rate <= 0 || months <= 0) return { emi: 0, totalInterest: 0, totalAmount: principal };
  
  const r = rate / 12 / 100;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  
  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount)
  };
}