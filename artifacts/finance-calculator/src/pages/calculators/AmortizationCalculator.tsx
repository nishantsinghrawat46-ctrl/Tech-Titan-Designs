import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { calculateAmortization } from "@/lib/calculators/loan-amortization";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Loan Amortization Calculator | FinCalc Pro";
  }, []);

  const result = calculateAmortization(loanAmount, rate, tenureYears);

  // Group chart data by year for better visualization
  const chartData = [];
  let currentYearPrincipal = 0;
  let currentYearInterest = 0;
  
  result.schedule.forEach((month, index) => {
    currentYearPrincipal += month.principalPaid;
    currentYearInterest += month.interest;
    
    if ((index + 1) % 12 === 0 || index === result.schedule.length - 1) {
      chartData.push({
        year: Math.ceil((index + 1) / 12),
        Principal: Math.round(currentYearPrincipal),
        Interest: Math.round(currentYearInterest),
        Balance: month.balance
      });
      currentYearPrincipal = 0;
      currentYearInterest = 0;
    }
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(`EMI: ₹${result.emi.toLocaleString()} | Total Interest: ₹${result.totalInterest.toLocaleString()}`);
    setCopied(true);
    toast({ title: "Result copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link href="/" className="text-muted-foreground hover:text-primary flex items-center text-sm font-medium w-fit transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Calculators
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Loan Amortization Schedule</h1>
        <p className="text-muted-foreground">View the month-by-month breakdown of your loan repayment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
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
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[loanAmount]} 
                  min={100000} 
                  max={50000000} 
                  step={50000}
                  onValueChange={([val]) => setLoanAmount(val)}
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
                  max={20} 
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
          
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Summary</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Monthly EMI</span>
                <span className="font-bold text-primary text-xl">₹{result.emi.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-bold">₹{result.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Payment</span>
                <span className="font-bold">₹{result.totalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <CardHeader>
              <CardTitle>Annual Payment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
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
                      tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                      width={60}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Line type="monotone" dataKey="Interest" stroke="hsl(var(--secondary))" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Principal" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Balance" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Amortization Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Principal</TableHead>
                      <TableHead className="text-right">Interest</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.schedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell className="text-right text-primary font-medium">₹{row.principalPaid.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-secondary">₹{row.interest.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹{row.balance.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}