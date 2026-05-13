import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { calculateMortgage } from "@/lib/calculators/mortgage";
import { useToast } from "@/hooks/use-toast";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--chart-3))'];

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(15000000);
  const [downPayment, setDownPayment] = useState(3000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTermYears, setLoanTermYears] = useState(20);
  const [propertyTaxPercent, setPropertyTaxPercent] = useState(1.2);
  const [hoaFees, setHoaFees] = useState(2000);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Mortgage Calculator | FinCalc Pro";
  }, []);

  const result = calculateMortgage(homePrice, downPayment, interestRate, loanTermYears, propertyTaxPercent, hoaFees);

  const data = result.breakdown ? [
    { name: 'Principal & Interest', value: result.breakdown.principalAndInterest },
    { name: 'Property Tax', value: result.breakdown.propertyTax },
    { name: 'HOA Fees', value: result.breakdown.hoaFees }
  ] : [];

  const handleCopy = () => {
    navigator.clipboard.writeText(`Monthly Payment: ₹${result.monthlyPayment.toLocaleString()} | Total Cost: ₹${result.totalCost.toLocaleString()}`);
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
        <h1 className="text-3xl font-bold mb-2">Mortgage Calculator</h1>
        <p className="text-muted-foreground">Calculate your complete monthly home payment including taxes and fees.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Home Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Home Price (₹)</Label>
                  <Input 
                    type="number" 
                    value={homePrice} 
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[homePrice]} 
                  min={1000000} 
                  max={100000000} 
                  step={500000}
                  onValueChange={([val]) => setHomePrice(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Down Payment (₹)</Label>
                  <Input 
                    type="number" 
                    value={downPayment} 
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[downPayment]} 
                  min={0} 
                  max={homePrice} 
                  step={100000}
                  onValueChange={([val]) => setDownPayment(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Interest Rate (% p.a.)</Label>
                  <Input 
                    type="number" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-24 text-right"
                    step={0.1}
                  />
                </div>
                <Slider 
                  value={[interestRate]} 
                  min={1} 
                  max={15} 
                  step={0.1}
                  onValueChange={([val]) => setInterestRate(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4 pt-2">
                <Label>Loan Term</Label>
                <Select value={loanTermYears.toString()} onValueChange={(val) => setLoanTermYears(Number(val))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Years</SelectItem>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="25">25 Years</SelectItem>
                    <SelectItem value="30">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <Label>Property Tax (% per year)</Label>
                  <Input 
                    type="number" 
                    value={propertyTaxPercent} 
                    onChange={(e) => setPropertyTaxPercent(Number(e.target.value))}
                    className="w-24 text-right"
                    step={0.1}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Label>HOA Fees (₹ per month)</Label>
                  <Input 
                    type="number" 
                    value={hoaFees} 
                    onChange={(e) => setHoaFees(Number(e.target.value))}
                    className="w-24 text-right"
                    step={500}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payment Breakdown</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={result.monthlyPayment}
                  className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center shadow-lg"
                >
                  <div className="text-sm text-muted-foreground mb-1">Est. Monthly Payment</div>
                  <div className="text-4xl font-bold text-primary">₹{result.monthlyPayment.toLocaleString()}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  key={result.totalCost}
                  className="p-6 rounded-xl bg-card border border-border text-center shadow-lg"
                >
                  <div className="text-sm text-muted-foreground mb-1">Total Cost (incl. Down Payment)</div>
                  <div className="text-3xl font-bold">₹{result.totalCost.toLocaleString()}</div>
                </motion.div>
              </div>

              {result.breakdown && (
                <div className="h-64 w-full mb-8">
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
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `₹${value.toLocaleString()}`}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}