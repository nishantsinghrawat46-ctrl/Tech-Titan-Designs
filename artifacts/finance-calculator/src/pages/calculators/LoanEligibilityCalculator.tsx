import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { calculateLoanEligibility } from "@/lib/calculators/loan-eligibility";
import { useToast } from "@/hooks/use-toast";

export default function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEmi, setExistingEmi] = useState(15000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Loan Eligibility Calculator | FinCalc Pro";
  }, []);

  const result = calculateLoanEligibility(monthlyIncome, existingEmi, rate, tenureYears);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Eligible Loan: ₹${result.maxLoanAmount.toLocaleString()} | Max EMI: ₹${result.maxEmi.toLocaleString()}`);
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
        <h1 className="text-3xl font-bold mb-2">Loan Eligibility Calculator</h1>
        <p className="text-muted-foreground">Check your home or personal loan eligibility based on income and existing EMIs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-8">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Monthly Net Income (₹)</Label>
                  <Input 
                    type="number" 
                    value={monthlyIncome} 
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[monthlyIncome]} 
                  min={20000} 
                  max={1000000} 
                  step={5000}
                  onValueChange={([val]) => setMonthlyIncome(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Existing Monthly EMIs (₹)</Label>
                  <Input 
                    type="number" 
                    value={existingEmi} 
                    onChange={(e) => setExistingEmi(Number(e.target.value))}
                    className="w-32 text-right"
                  />
                </div>
                <Slider 
                  value={[existingEmi]} 
                  min={0} 
                  max={500000} 
                  step={1000}
                  onValueChange={([val]) => setExistingEmi(val)}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Expected Interest Rate (%)</Label>
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
                  min={5} 
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
        </div>

        <div className="lg:col-span-6 space-y-8 flex flex-col">
          <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden relative flex-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Eligibility Result</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center h-[calc(100%-80px)] text-center pb-12">
              {result.maxLoanAmount > 0 ? (
                <>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    key={result.maxLoanAmount}
                    className="space-y-2 mb-8"
                  >
                    <div className="text-lg text-muted-foreground">You are eligible for a loan up to</div>
                    <div className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight shadow-primary/20 drop-shadow-lg">
                      ₹{result.maxLoanAmount.toLocaleString()}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    key={result.maxEmi}
                    className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 inline-block"
                  >
                    <div className="text-sm text-muted-foreground mb-1">Maximum Affordable EMI</div>
                    <div className="text-2xl font-bold text-secondary">₹{result.maxEmi.toLocaleString()} / month</div>
                  </motion.div>
                </>
              ) : (
                <div className="text-destructive p-6 border border-destructive/20 rounded-xl bg-destructive/10">
                  <h3 className="text-xl font-bold mb-2">Not Eligible</h3>
                  <p>Your existing EMIs are too high relative to your income, or your income is too low.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}