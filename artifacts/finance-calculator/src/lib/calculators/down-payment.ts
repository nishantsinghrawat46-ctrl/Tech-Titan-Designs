export function calculateDownPayment(propertyPrice: number, downPaymentPercent: number) {
  if (propertyPrice <= 0 || downPaymentPercent < 0 || downPaymentPercent > 100) {
    return { downPaymentAmount: 0, loanAmount: propertyPrice };
  }
  
  const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  
  return {
    downPaymentAmount: Math.round(downPaymentAmount),
    loanAmount: Math.round(loanAmount)
  };
}