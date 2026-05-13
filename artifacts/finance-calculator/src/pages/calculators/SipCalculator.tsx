import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { calculateSIP } from "@/lib/calculators/sip";
import { useToast } from "@/hooks/use-toast";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedRate, setExpectedRate] = useState(12);
  const [years, setYears] = useState(10);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "SIP Calculator | FinCalc Pro";
  }, []);

  const result = calculateSIP(monthlyInvestment, expectedRate, years);

  // Generate chart data
  const chartData = [];
  for (let i = 1; i <= years; i++) {
    const res = calculateSIP(monthlyInvestment, expectedRate, i);
    chartData.push({
      year: i,
      Invested: res.investedAmount,
      Value: res.totalValue,
      Returns: res.estimatedReturns
    });
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`Invested: ₹${result.investedAmount.toLocaleString()} | Returns: ₹${result.estimatedReturns.toLocaleString()} | Total Value: ₹${result.totalValue.toLocaleString()}`);
    setCopied(true);
    toast({ title: "Result copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/" className="text-muted-foreground hover:text-primary flex items-center text-sm font-medium w-fit transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Calculators
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SIP Calculator</h1>
        <p className="text-muted-foreground">Calculate the future value of your Systematic Investment Plan (SIP).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Monthly Investment (₹)</Label>
                  <Input 
                    type="number" 
                    value={monthlyInvestment} 
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[monthlyInvestment]} 
                  min={500} 
                  max={100000} 
                  step={500}
                  onValueChange={([val]) => setMonthlyInvestment(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Expected Return Rate (% p.a.)</Label>
                  <Input 
                    type="number" 
                    value={expectedRate} 
                    onChange={(e) => setExpectedRate(Number(e.target.value))}
                    className="w-24 text-right"
                    step={0.5}
                  />
                </div>
                <Slider 
                  value={[expectedRate]} 
                  min={1} 
                  max={30} 
                  step={0.5}
                  onValueChange={([val]) => setExpectedRate(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Time Period (Years)</Label>
                  <Input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider 
                  value={[years]} 
                  min={1} 
                  max={40} 
                  step={1}
                  onValueChange={([val]) => setYears(val)}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Estimated Returns</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={result.investedAmount}
                  className="p-4 rounded-xl bg-card border border-border/50 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Invested Amount</div>
                  <div className="text-xl font-bold">₹{result.investedAmount.toLocaleString()}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  key={result.estimatedReturns}
                  className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Est. Returns</div>
                  <div className="text-xl font-bold text-secondary">₹{result.estimatedReturns.toLocaleString()}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  key={result.totalValue}
                  className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Total Value</div>
                  <div className="text-2xl font-bold text-primary">₹{result.totalValue.toLocaleString()}</div>
                </motion.div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => `Yr ${value}`}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                      width={60}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Area type="monotone" dataKey="Value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    <Area type="monotone" dataKey="Invested" stroke="hsl(var(--secondary))" strokeWidth={2} fillOpacity={1} fill="url(#colorInvested)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}