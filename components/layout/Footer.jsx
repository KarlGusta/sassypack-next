import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Stacks</h3>
            <ul className="space-y-2">
              <li><Link href="/mern-saas-starter-kit" className="hover:text-white transition-colors">MERN Stack</Link></li>
              <li><Link href="/nextjs-saas-starter-kit" className="hover:text-white transition-colors">Next.js</Link></li>
              <li><Link href="/mern-stack-saas-boilerplate" className="hover:text-white transition-colors">MERN Boilerplate</Link></li>
              <li><Link href="/nextjs-saas-starter-kit" className="hover:text-white transition-colors">Next.js Template</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link href="/features/authentication" className="hover:text-white transition-colors">Authentication</Link></li>
              <li><Link href="/features/payment-integration" className="hover:text-white transition-colors">Payments</Link></li>
              <li><Link href="/features/dashboard-templates" className="hover:text-white transition-colors">Dashboards</Link></li>
              <li><Link href="/features/api-structure" className="hover:text-white transition-colors">API Structure</Link></li>
              <li><Link href="/features/ui-components" className="hover:text-white transition-colors">UI Components</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">For</h3>
            <ul className="space-y-2">
              <li><Link href="/for/indie-developers" className="hover:text-white transition-colors">Indie Developers</Link></li>
              <li><Link href="/for/startup-founders" className="hover:text-white transition-colors">Startup Founders</Link></li>
              <li><Link href="/for/dev-agencies" className="hover:text-white transition-colors">Agencies</Link></li>
              <li><Link href="/for/freelance-developers" className="hover:text-white transition-colors">Freelancers</Link></li>
              <li><Link href="/for/non-technical-founders" className="hover:text-white transition-colors">Non-Technical Founders</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
              <li><Link href="/vs/custom-build" className="hover:text-white transition-colors">vs Custom Build</Link></li>
              <li><Link href="/vs/other-starter-kits" className="hover:text-white transition-colors">vs Other Kits</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-white">SassyPack</Link>
            <p className="text-sm mt-1">Launch your SaaS in hours, not months.</p>
          </div>
          <div className="text-sm">© {currentYear} SassyPack. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
