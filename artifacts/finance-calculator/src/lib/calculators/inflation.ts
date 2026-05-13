export function calculateInflation(currentAmount: number, inflationRate: number, years: number) {
  if (currentAmount <= 0 || inflationRate < 0 || years <= 0) return { futureValueNeeded: currentAmount, chartData: [] };
  
  const r = inflationRate / 100;
  const futureValueNeeded = currentAmount * Math.pow(1 + r, years);
  
  const chartData = [];
  for (let i = 0; i <= years; i++) {
    chartData.push({
      year: i,
      value: Math.round(currentAmount * Math.pow(1 + r, i))
    });
  }
  
  return {
    futureValueNeeded: Math.round(futureValueNeeded),
    chartData
  };
}