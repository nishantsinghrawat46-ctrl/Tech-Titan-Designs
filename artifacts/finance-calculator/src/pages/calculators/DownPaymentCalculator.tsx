import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { calculateDownPayment } from "@/lib/calculators/down-payment";
import { useToast } from "@/hooks/use-toast";

export default function DownPaymentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(5000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Down Payment Calculator | FinCalc Pro";
  }, []);

  const result = calculateDownPayment(propertyPrice, downPaymentPercent);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Down Payment: ₹${result.downPaymentAmount.toLocaleString()} | Loan Amount: ₹${result.loanAmount.toLocaleString()}`);
    setCopied(true);
    toast({ title: "Result copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link href="/" className="text-muted-foreground hover:text-primary flex items-center text-sm font-medium w-fit transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Calculators
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Down Payment Calculator</h1>
        <p className="text-muted-foreground">Calculate your required down payment and remaining loan amount.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Property Price (₹)</Label>
                <Input 
                  type="number" 
                  value={propertyPrice} 
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-32 text-right"
                />
              </div>
              <Slider 
                value={[propertyPrice]} 
                min={500000} 
                max={50000000} 
                step={100000}
                onValueChange={([val]) => setPropertyPrice(val)}
                className="py-4"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Down Payment (%)</Label>
                <Input 
                  type="number" 
                  value={downPaymentPercent} 
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-24 text-right"
                  step={1}
                />
              </div>
              <Slider 
                value={[downPaymentPercent]} 
                min={5} 
                max={100} 
                step={1}
                onValueChange={([val]) => setDownPaymentPercent(val)}
                className="py-4"
              />
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground pt-4 border-t">
              <span>Down Payment in ₹</span>
              <span className="font-mono">₹{result.downPaymentAmount.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden relative flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Result</CardTitle>
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center gap-6 pb-8">
            <motion.div 
              key={result.downPaymentAmount}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center shadow-lg"
            >
              <div className="text-sm text-muted-foreground mb-2">Required Down Payment</div>
              <div className="text-4xl font-bold text-primary">₹{result.downPaymentAmount.toLocaleString()}</div>
            </motion.div>
            
            <motion.div 
              key={result.loanAmount}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-card border border-border text-center shadow-lg"
            >
              <div className="text-sm text-muted-foreground mb-2">Required Loan Amount</div>
              <div className="text-3xl font-bold">₹{result.loanAmount.toLocaleString()}</div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}