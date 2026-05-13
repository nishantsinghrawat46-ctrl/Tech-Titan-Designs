export function calculateGST(amount: number, rate: number, isAddingGst: boolean = true) {
  if (amount <= 0 || rate < 0) return { cgst: 0, sgst: 0, igst: 0, total: amount };
  
  let baseAmount = amount;
  let gstAmount = 0;
  
  if (isAddingGst) {
    gstAmount = amount * (rate / 100);
  } else {
    baseAmount = amount / (1 + (rate / 100));
    gstAmount = amount - baseAmount;
  }
  
  const halfGst = gstAmount / 2;
  
  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    cgst: Math.round(halfGst * 100) / 100,
    sgst: Math.round(halfGst * 100) / 100,
    igst: Math.round(gstAmount * 100) / 100,
    total: Math.round((baseAmount + gstAmount) * 100) / 100
  };
}