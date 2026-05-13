export function calculateAmortization(principal: number, rate: number, tenureYears: number) {
  if (principal <= 0 || rate <= 0 || tenureYears <= 0) return { schedule: [], totalInterest: 0, totalAmount: 0 };
  
  const months = tenureYears * 12;
  const r = rate / 12 / 100;
  
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  
  const schedule = [];
  let balance = principal;
  
  for (let i = 1; i <= months; i++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    
    schedule.push({
      month: i,
      principalPaid: Math.round(principalPaid),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance))
    });
  }
  
  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount),
    schedule
  };
}