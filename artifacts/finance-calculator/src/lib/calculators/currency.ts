// Static approximate exchange rates relative to USD
const rates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.50,
  JPY: 154.20,
  AED: 3.67,
  CAD: 1.37,
  AUD: 1.52,
  SGD: 1.36,
  CHF: 0.91
};

export const currencies = Object.keys(rates);

export function calculateCurrency(amount: number, fromCurrency: string, toCurrency: string) {
  if (amount <= 0 || !rates[fromCurrency] || !rates[toCurrency]) return { convertedAmount: 0, rate: 0 };
  
  // Convert to USD first, then to target currency
  const amountInUSD = amount / rates[fromCurrency];
  const convertedAmount = amountInUSD * rates[toCurrency];
  const rate = rates[toCurrency] / rates[fromCurrency];
  
  return {
    convertedAmount: Math.round(convertedAmount * 100) / 100,
    rate: Math.round(rate * 10000) / 10000
  };
}