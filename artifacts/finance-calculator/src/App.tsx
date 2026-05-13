import { Switch, Route, Router as WouterRouter } from "wouter";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

import EmiCalculator from "@/pages/calculators/EmiCalculator";
import SipCalculator from "@/pages/calculators/SipCalculator";
import FdCalculator from "@/pages/calculators/FdCalculator";
import GstCalculator from "@/pages/calculators/GstCalculator";
import LoanEligibilityCalculator from "@/pages/calculators/LoanEligibilityCalculator";
import InflationCalculator from "@/pages/calculators/InflationCalculator";
import AmortizationCalculator from "@/pages/calculators/AmortizationCalculator";
import CurrencyCalculator from "@/pages/calculators/CurrencyCalculator";
import DownPaymentCalculator from "@/pages/calculators/DownPaymentCalculator";
import CreditCardEmiCalculator from "@/pages/calculators/CreditCardEmiCalculator";
import MortgageCalculator from "@/pages/calculators/MortgageCalculator";

import BlogIndex from "@/pages/blog/BlogIndex";
import BlogPost from "@/pages/blog/BlogPost";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          
          <Route path="/calculators/emi" component={EmiCalculator} />
          <Route path="/calculators/sip" component={SipCalculator} />
          <Route path="/calculators/fd" component={FdCalculator} />
          <Route path="/calculators/gst" component={GstCalculator} />
          <Route path="/calculators/loan-eligibility" component={LoanEligibilityCalculator} />
          <Route path="/calculators/inflation" component={InflationCalculator} />
          <Route path="/calculators/amortization" component={AmortizationCalculator} />
          <Route path="/calculators/currency" component={CurrencyCalculator} />
          <Route path="/calculators/down-payment" component={DownPaymentCalculator} />
          <Route path="/calculators/credit-card-emi" component={CreditCardEmiCalculator} />
          <Route path="/calculators/mortgage" component={MortgageCalculator} />
          
          <Route path="/blog" component={BlogIndex} />
          <Route path="/blog/:slug" component={BlogPost} />
          
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;