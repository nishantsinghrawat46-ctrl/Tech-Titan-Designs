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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateFD } from "@/lib/calculators/fd";
import { useToast } from "@/hooks/use-toast";

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(5);
  const [compounding, setCompounding] = useState<"annually" | "quarterly" | "monthly">("quarterly");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "FD Returns Calculator | FinCalc Pro";
  }, []);

  const result = calculateFD(principal, rate, years, compounding);

  const chartData = [
    {
      name: "Investment",
      Principal: principal,
      Interest: result.interestEarned
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`Maturity: ₹${result.maturityAmount.toLocaleString()} | Interest: ₹${result.interestEarned.toLocaleString()}`);
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
        <h1 className="text-3xl font-bold mb-2">Fixed Deposit (FD) Calculator</h1>
        <p className="text-muted-foreground">Calculate the maturity amount and interest earned on your Fixed Deposit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>FD Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Total Investment (₹)</Label>
                  <Input 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[principal]} 
                  min={5000} 
                  max={10000000} 
                  step={5000}
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
                  max={15} 
                  step={0.1}
                  onValueChange={([val]) => setRate(val)}
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
                  max={25} 
                  step={1}
                  onValueChange={([val]) => setYears(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4 pt-2">
                <Label>Compounding Frequency</Label>
                <Select value={compounding} onValueChange={(val: any) => setCompounding(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annually">Annually</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={result.maturityAmount}
                  className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Maturity Amount</div>
                  <div className="text-3xl font-bold text-primary">₹{result.maturityAmount.toLocaleString()}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  key={result.interestEarned}
                  className="p-6 rounded-xl bg-secondary/10 border border-secondary/20 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                  <div className="text-3xl font-bold text-secondary">₹{result.interestEarned.toLocaleString()}</div>
                </motion.div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" hide />
                    <Tooltip 
                      formatter={(value: number) => `₹${value.toLocaleString()}`}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      cursor={{fill: 'transparent'}}
                    />
                    <Legend />
                    <Bar dataKey="Principal" stackId="a" fill="hsl(var(--secondary))" radius={[4, 0, 0, 4]} barSize={40} />
                    <Bar dataKey="Interest" stackId="a" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">How are FD returns calculated?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-4">
              <p>Fixed Deposit uses the compound interest formula:</p>
              <div className="p-3 bg-background rounded-md border font-mono text-primary text-center">
                A = P × (1 + r/n)^(n×t)
              </div>
              <p>Where:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>A</strong> is Maturity Amount</li>
                <li><strong>P</strong> is Principal Amount</li>
                <li><strong>r</strong> is Annual Interest Rate (in decimal)</li>
                <li><strong>n</strong> is number of times interest is compounded per year</li>
                <li><strong>t</strong> is time in years</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}