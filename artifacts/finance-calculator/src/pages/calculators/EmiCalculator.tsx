import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { calculateEMI } from "@/lib/calculators/emi";
import { useToast } from "@/hooks/use-toast";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))'];

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(10.5);
  const [tenureYears, setTenureYears] = useState(5);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "EMI Calculator | FinCalc Pro";
  }, []);

  const tenureMonths = tenureYears * 12;
  const result = calculateEMI(principal, rate, tenureMonths);

  const data = [
    { name: 'Principal', value: principal },
    { name: 'Total Interest', value: result.totalInterest }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`EMI: ₹${result.emi.toLocaleString()} | Total Interest: ₹${result.totalInterest.toLocaleString()} | Total Amount: ₹${result.totalAmount.toLocaleString()}`);
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
        <h1 className="text-3xl font-bold mb-2">EMI Calculator</h1>
        <p className="text-muted-foreground">Calculate your monthly Equated Monthly Installment (EMI) for loans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Loan Amount (₹)</Label>
                  <Input 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[principal]} 
                  min={10000} 
                  max={10000000} 
                  step={10000}
                  onValueChange={([val]) => setPrincipal(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Interest Rate (% p.a.)</Label>
                  <Input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-24 text-right"
                    step={0.1}
                  />
                </div>
                <Slider 
                  value={[rate]} 
                  min={1} 
                  max={30} 
                  step={0.1}
                  onValueChange={([val]) => setRate(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Loan Tenure (Years)</Label>
                  <Input 
                    type="number" 
                    value={tenureYears} 
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider 
                  value={[tenureYears]} 
                  min={1} 
                  max={30} 
                  step={1}
                  onValueChange={([val]) => setTenureYears(val)}
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
              <CardTitle>Calculation Result</CardTitle>
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
                  key={result.emi}
                  className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Monthly EMI</div>
                  <div className="text-2xl font-bold text-primary">₹{result.emi.toLocaleString()}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  key={result.totalInterest}
                  className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-secondary">₹{result.totalInterest.toLocaleString()}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  key={result.totalAmount}
                  className="p-4 rounded-xl bg-card border border-border/50 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                  <div className="text-2xl font-bold">₹{result.totalAmount.toLocaleString()}</div>
                </motion.div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `₹${value.toLocaleString()}`}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">How is EMI Calculated?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-4">
              <p>The mathematical formula for calculating EMIs is:</p>
              <div className="p-3 bg-background rounded-md border font-mono text-primary text-center">
                EMI = P × r × (1+r)^n / ((1+r)^n - 1)
              </div>
              <p>Where:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>P</strong> is Principal Loan Amount</li>
                <li><strong>r</strong> is rate of interest calculated on monthly basis (i.e., r = Rate of Annual interest/12/100)</li>
                <li><strong>n</strong> is loan term / tenure / duration in number of months</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}