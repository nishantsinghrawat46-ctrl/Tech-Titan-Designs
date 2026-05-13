export function calculateCreditCardEmi(outstandingBalance: number, interestRateMonthly: number, minimumPaymentPercent: number) {
  if (outstandingBalance <= 0 || interestRateMonthly <= 0 || minimumPaymentPercent <= 0) {
    return { monthsToPayOff: 0, totalInterest: 0, schedule: [] };
  }
  
  let balance = outstandingBalance;
  let totalInterest = 0;
  let monthsToPayOff = 0;
  const schedule = [];
  
  // Cap at 360 months (30 years) to prevent infinite loops
  while (balance > 0 && monthsToPayOff < 360) {
    monthsToPayOff++;
    
    const interest = balance * (interestRateMonthly / 100);
    totalInterest += interest;
    
    // Minimum payment or remaining balance (including interest)
    let payment = Math.max(outstandingBalance * (minimumPaymentPercent / 100), interest + 1); // Need to pay at least interest + something
    
    if (balance + interest <= payment) {
      payment = balance + interest;
    }
    
    const principalPaid = payment - interest;
    balance -= principalPaid;
    
    schedule.push({
      month: monthsToPayOff,
      payment: Math.round(payment),
      interest: Math.round(interest),
      principalPaid: Math.round(principalPaid),
      balance: Math.max(0, Math.round(balance))
    });
  }
  
  return {
    monthsToPayOff,
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(outstandingBalance + totalInterest),
    schedule
  };
}