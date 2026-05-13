import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, PieChart, Landmark, Percent, Zap, CheckCircle2, Phone, CreditCard, Banknote, Building, Coins } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blogData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const calculators = [
  { id: "emi", title: "EMI Calculator", desc: "Calculate monthly installments and interest for loans.", icon: Calculator },
  { id: "sip", title: "SIP Returns", desc: "Estimate returns on mutual fund investments.", icon: TrendingUp },
  { id: "fd", title: "FD Returns", desc: "Calculate maturity amount for Fixed Deposits.", icon: Landmark },
  { id: "gst", title: "GST Calculator", desc: "Add or remove GST from prices instantly.", icon: Percent },
  { id: "loan-eligibility", title: "Loan Eligibility", desc: "Check maximum loan amount based on income.", icon: CheckCircle2 },
  { id: "inflation", title: "Inflation Calculator", desc: "See how inflation affects your future money.", icon: TrendingUp },
  { id: "amortization", title: "Amortization", desc: "Full month-by-month loan payment schedule.", icon: PieChart },
  { id: "currency", title: "Currency Converter", desc: "Convert amounts between major global currencies.", icon: Banknote },
  { id: "down-payment", title: "Down Payment", desc: "Calculate down payment and remaining loan amount.", icon: Building },
  { id: "credit-card-emi", title: "Credit Card Payoff", desc: "See how long it takes to clear credit debt.", icon: CreditCard },
  { id: "mortgage", title: "Mortgage Calculator", desc: "Calculate total home payments including taxes.", icon: Building },
];

const features = [
  { title: "Fast Calculations", desc: "Client-side processing means zero waiting time.", icon: Zap },
  { title: "Accurate Formulas", desc: "Industry-standard mathematical models.", icon: CheckCircle2 },
  { title: "Free to Use", desc: "No paywalls, no sign-ups required. Ever.", icon: Coins },
  { title: "Mobile Optimized", desc: "Works perfectly on your phone browser.", icon: Phone },
];

const investPlatforms = [
  {
    name: "Zerodha",
    type: "Stock Broker",
    desc: "India's largest discount broker. Trade stocks, F&O, commodities, and mutual funds with flat-fee brokerage and a powerful Kite trading platform.",
    tags: ["Stocks", "F&O", "Mutual Funds", "IPO"],
  },
  {
    name: "Groww",
    type: "Investment App",
    desc: "A beginner-friendly platform to invest in mutual funds, stocks, and US stocks. Clean UI and zero commission on mutual funds make it ideal for new investors.",
    tags: ["Mutual Funds", "Stocks", "US Stocks", "Gold"],
  },
  {
    name: "Upstox",
    type: "Stock Broker",
    desc: "A fast-growing discount broker backed by Tiger Global. Offers stock trading, IPO investing, and mutual funds with competitive brokerage fees.",
    tags: ["Stocks", "F&O", "Mutual Funds", "ETF"],
  },
  {
    name: "Angel One",
    type: "Full-Service Broker",
    desc: "A full-service broker offering research reports, algo trading, and robo-advisory. Good for investors who want guidance along with trading tools.",
    tags: ["Stocks", "Advisory", "Algo Trading", "SIP"],
  },
  {
    name: "Coin by Zerodha",
    type: "Mutual Fund Platform",
    desc: "Zerodha's direct mutual fund platform. Invest in direct plans with zero commission, saving up to 1% in expense ratio compared to regular plans.",
    tags: ["Direct MF", "SIP", "Zero Commission"],
  },
  {
    name: "INDmoney",
    type: "Wealth Management",
    desc: "An all-in-one wealth platform for stocks, US stocks, mutual funds, and fixed deposits. Tracks your net worth across all investments in one place.",
    tags: ["Stocks", "US Stocks", "FD", "NPS"],
  },
  {
    name: "ET Money",
    type: "Investment App",
    desc: "An Economic Times platform for SIP investing, insurance, NPS, and financial goal planning. Strong analytics help track your portfolio's performance.",
    tags: ["SIP", "Insurance", "NPS", "Goal Planning"],
  },
  {
    name: "Paytm Money",
    type: "Investment Platform",
    desc: "Invest in stocks, mutual funds, NPS, and digital gold through Paytm's investment arm. Easy to use for existing Paytm users.",
    tags: ["Stocks", "Mutual Funds", "Digital Gold", "NPS"],
  },
  {
    name: "Smallcase",
    type: "Thematic Investing",
    desc: "Invest in curated baskets of stocks and ETFs built around a theme or strategy — from 'Electric Vehicles' to 'IT Giants'. Great for passive, theme-based investing.",
    tags: ["Thematic", "Baskets", "ETF", "Rebalancing"],
  },
];

const testimonials = [
  { name: "Rahul S.", role: "Retail Investor", review: "The SIP calculator is incredibly intuitive. Helps me plan my monthly investments clearly.", initials: "RS" },
  { name: "Priya M.", role: "Home Buyer", review: "Used the mortgage and EMI tools to plan my house purchase. The UI is stunning and easy to read.", initials: "PM" },
  { name: "Amit K.", role: "Small Business Owner", review: "The GST calculator saves me so much time during billing. Absolutely love the dark mode.", initials: "AK" },
];

export default function Home() {
  useEffect(() => {
    document.title = "FinCalc Pro - Smart Financial Calculators";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 min-h-[80vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
        {/* Animated grid lines background effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Fintech-Grade Precision
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Smart Financial Calculators for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-500">Better Money Decisions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Calculate EMI, loans, investments, SIP returns, taxes, and more instantly. No math degree required.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-[0_0_30px_rgba(132,204,22,0.4)] hover:shadow-[0_0_40px_rgba(132,204,22,0.6)] transition-all">
              <Link href="/calculators/emi">Start Calculating</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-border hover:bg-card">
              <a href="#tools">Explore Tools</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section id="tools" className="py-24 bg-card/30 border-y border-border/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Toolset</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to plan your financial future, housed in one elegant dashboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc, i) => {
              const Icon = calc.icon;
              return (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="h-full"
                >
                  <Link href={`/calculators/${calc.id}`}>
                    <Card className="h-full cursor-pointer hover:border-primary/50 hover:shadow-[0_0_20px_rgba(132,204,22,0.1)] transition-all bg-card/50 backdrop-blur overflow-hidden group">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon size={24} />
                        </div>
                        <CardTitle>{calc.title}</CardTitle>
                        <CardDescription className="text-sm mt-2">{calc.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FinCalc Pro</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 text-secondary">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Platforms */}
      <section className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">Curated List</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3">Best Apps & Websites to Invest and Trade</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A curated list of the most popular and trusted platforms used by Indian investors and traders.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {investPlatforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/40 transition-all group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {p.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-base">{p.name}</CardTitle>
                        <span className="text-xs text-primary font-medium">{p.type}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">{p.desc}</CardDescription>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map(tag => (
                        <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog/best-investment-apps-india">
              <Button variant="outline" size="lg" className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground">
                Read Full Guide to Investment Platforms &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Finance Tips & Guides</h2>
              <p className="text-muted-foreground">Master your money with our latest articles.</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex text-primary hover:text-primary/80">
              <Link href="/blog">View All Articles &rarr;</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.slice(0, 4).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full cursor-pointer hover:border-primary/50 transition-colors bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary/5 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur border-border/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary">{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{t.name}</CardTitle>
                      <CardDescription>{t.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{t.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}