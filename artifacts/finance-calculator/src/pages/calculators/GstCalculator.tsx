import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateGST } from "@/lib/calculators/gst";
import { useToast } from "@/hooks/use-toast";

const GST_RATES = [5, 12, 18, 28];

export default function GstCalculator() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [isAddingGst, setIsAddingGst] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "GST Calculator | FinCalc Pro";
  }, []);

  const result = calculateGST(amount, rate, isAddingGst);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Base: ₹${result.baseAmount} | GST: ₹${result.igst} | Total: ₹${result.total}`);
    setCopied(true);
    toast({ title: "Result copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/" className="text-muted-foreground hover:text-primary flex items-center text-sm font-medium w-fit transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Calculators
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">GST Calculator</h1>
        <p className="text-muted-foreground">Calculate GST amount and find the base or total price easily.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>GST Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label>GST Calculation Type</Label>
              <RadioGroup 
                value={isAddingGst ? "add" : "remove"} 
                onValueChange={(v) => setIsAddingGst(v === "add")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border p-3 rounded-lg flex-1 cursor-pointer" onClick={() => setIsAddingGst(true)}>
                  <RadioGroupItem value="add" id="add" />
                  <Label htmlFor="add" className="cursor-pointer">Add GST</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-lg flex-1 cursor-pointer" onClick={() => setIsAddingGst(false)}>
                  <RadioGroupItem value="remove" id="remove" />
                  <Label htmlFor="remove" className="cursor-pointer">Remove GST</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>{isAddingGst ? "Base Amount (₹)" : "Total Amount with GST (₹)"}</Label>
              <Input 
                type="number" 
                value={amount || ""} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="text-lg py-6"
                placeholder="Enter amount"
              />
            </div>

            <div className="space-y-4">
              <Label>GST Rate (%)</Label>
              <div className="grid grid-cols-4 gap-2">
                {GST_RATES.map((r) => (
                  <Button
                    key={r}
                    variant={rate === r ? "default" : "outline"}
                    className={rate === r ? "bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(132,204,22,0.4)]" : ""}
                    onClick={() => setRate(r)}
                  >
                    {r}%
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden relative flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Calculation Result</CardTitle>
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="space-y-6">
              <motion.div 
                key={`total-${result.total}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-xl bg-card border border-border text-center shadow-lg"
              >
                <div className="text-sm text-muted-foreground mb-2">Total Amount</div>
                <div className="text-4xl font-bold text-primary">₹{result.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="text-xs text-muted-foreground mb-1">Base Amount</div>
                  <div className="text-lg font-semibold">₹{result.baseAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="text-xs text-muted-foreground mb-1">Total GST ({rate}%)</div>
                  <div className="text-lg font-semibold text-secondary">₹{result.igst.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div>
                  <div className="text-xs text-muted-foreground">CGST ({rate/2}%)</div>
                  <div className="font-medium">₹{result.cgst.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">SGST ({rate/2}%)</div>
                  <div className="font-medium">₹{result.sgst.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}