import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateCurrency, currencies } from "@/lib/calculators/currency";

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  useEffect(() => {
    document.title = "Currency Converter | FinCalc Pro";
  }, []);

  const result = calculateCurrency(amount, fromCurrency, toCurrency);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/" className="text-muted-foreground hover:text-primary flex items-center text-sm font-medium w-fit transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Calculators
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Currency Converter</h1>
        <p className="text-muted-foreground">Approximate exchange rates for major currencies.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
        <CardHeader>
          <CardTitle>Convert Currency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
            <div className="space-y-4">
              <Label>Amount & From</Label>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="text-lg py-6 flex-1"
                />
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="w-[100px] h-[50px] text-lg font-bold">
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center mb-1">
              <Button variant="ghost" size="icon" onClick={swapCurrencies} className="rounded-full w-12 h-12 bg-primary/10 hover:bg-primary/20 text-primary">
                <ArrowRightLeft className="w-6 h-6" />
              </Button>
            </div>

            <div className="space-y-4">
              <Label>To Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-full h-[50px] text-lg font-bold">
                  <SelectValue placeholder="To" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <motion.div 
            key={`${amount}-${fromCurrency}-${toCurrency}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-xl bg-card border border-border text-center shadow-lg mt-8"
          >
            <div className="text-muted-foreground mb-2 text-lg">
              {amount.toLocaleString()} {fromCurrency} =
            </div>
            <div className="text-5xl font-bold text-primary mb-4 tracking-tight">
              {result.convertedAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} <span className="text-3xl text-foreground">{toCurrency}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              1 {fromCurrency} = {result.rate} {toCurrency}
            </div>
            <div className="text-xs text-muted-foreground/50 mt-4 italic">
              * Note: These are static approximate rates for demonstration. Do not use for real trading.
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}