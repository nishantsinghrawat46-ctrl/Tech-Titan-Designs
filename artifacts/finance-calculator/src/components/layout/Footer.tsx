import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">FinCalc Pro</h3>
            <p className="text-sm text-muted-foreground">
              Smart Financial Calculators for Better Money Decisions. Fast, precise, and visually stunning.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/calculators/emi" className="hover:text-primary">EMI Calculator</Link></li>
              <li><Link href="/calculators/sip" className="hover:text-primary">SIP Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-primary">Finance Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FinCalc Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
