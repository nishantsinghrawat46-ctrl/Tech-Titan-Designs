import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { calculateCreditCardEmi } from "@/lib/calculators/credit-card-emi";
import { useToast } from "@/hooks/use-toast";

export default function CreditCardEmiCalculator() {
  const [outstandingBalance, setOutstandingBalance] = useState(50000);
  const [interestRateMonthly, setInterestRateMonthly] = useState(3.5);
  const [minimumPaymentPercent, setMinimumPaymentPercent] = useState(5);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Credit Card EMI Calculator | FinCalc Pro";
  }, []);

  const result = calculateCreditCardEmi(outstandingBalance, interestRateMonthly, minimumPaymentPercent);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Months to pay off: ${result.monthsToPayOff} | Total Interest: ₹${result.totalInterest.toLocaleString()}`);
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
        <h1 className="text-3xl font-bold mb-2">Credit Card EMI Calculator</h1>
        <p className="text-muted-foreground">See how long it will take to pay off your credit card balance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Outstanding Balance (₹)</Label>
                  <Input 
                    type="number" 
                    value={outstandingBalance} 
                    onChange={(e) => setOutstandingBalance(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[outstandingBalance]} 
                  min={1000} 
                  max={1000000} 
                  step={1000}
                  onValueChange={([val]) => setOutstandingBalance(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Interest Rate (% per month)</Label>
                  <Input 
                    type="number" 
                    value={interestRateMonthly} 
                    onChange={(e) => setInterestRateMonthly(Number(e.target.value))}
                    className="w-24 text-right"
                    step={0.1}
                  />
                </div>
                <Slider 
                  value={[interestRateMonthly]} 
                  min={1} 
                  max={5} 
                  step={0.1}
                  onValueChange={([val]) => setInterestRateMonthly(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Minimum Payment (%)</Label>
                  <Input 
                    type="number" 
                    value={minimumPaymentPercent} 
                    onChange={(e) => setMinimumPaymentPercent(Number(e.target.value))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider 
                  value={[minimumPaymentPercent]} 
                  min={1} 
                  max={20} 
                  step={1}
                  onValueChange={([val]) => setMinimumPaymentPercent(val)}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive to-orange-500" />
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payoff Summary</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={result.monthsToPayOff}
                  className="p-4 rounded-xl bg-card border border-border/50 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Time to Pay Off</div>
                  <div className="text-2xl font-bold">
                    {result.monthsToPayOff >= 360 ? "> 30 Years" : `${Math.floor(result.monthsToPayOff / 12)}y ${result.monthsToPayOff % 12}m`}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  key={result.totalInterest}
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-destructive">₹{result.totalInterest.toLocaleString()}</div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  key={result.totalPayment}
                  className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-1">Total Payment</div>
                  <div className="text-2xl font-bold text-orange-500">₹{result.totalPayment.toLocaleString()}</div>
                </motion.div>
              </div>

              <ScrollArea className="h-[300px] rounded-md border">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Payment</TableHead>
                      <TableHead className="text-right">Interest</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.schedule.slice(0, 120).map((row) => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell className="text-right font-medium">₹{row.payment.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-destructive">₹{row.interest.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹{row.balance.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    {result.schedule.length > 120 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          ... and {result.schedule.length - 120} more months
                        </TableCell>
                      </TableRow>
                    )}
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