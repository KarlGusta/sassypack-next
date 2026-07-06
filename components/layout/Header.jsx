"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">SassyPack</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 font-medium flex items-center">
                Stacks
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/mern-saas-starter-kit" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  MERN Stack
                </Link>
                <Link href="/nextjs-saas-starter-kit" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  Next.js
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 font-medium flex items-center">
                Features
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/features/authentication" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  Authentication
                </Link>
                <Link href="/features/payment-integration" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  Payments
                </Link>
                <Link href="/features/dashboard-templates" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  Dashboards
                </Link>
                <Link href="/features/api-structure" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  API Structure
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 font-medium flex items-center">
                For
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/for/indie-developers" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  Indie Developers
                </Link>
                <Link href="/for/startup-founders" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  Startup Founders
                </Link>
                <Link href="/for/dev-agencies" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  Agencies
                </Link>
                <Link href="/for/freelance-developers" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                  Freelancers
                </Link>
              </div>
            </div>

            <Link href="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <Link
              href="/pricing"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/mern-saas-starter-kit" className="text-gray-700 hover:text-indigo-600 font-medium">
                MERN Stack
              </Link>
              <Link href="/nextjs-saas-starter-kit" className="text-gray-700 hover:text-indigo-600 font-medium">
                Next.js
              </Link>
              <Link href="/features/authentication" className="text-gray-700 hover:text-indigo-600">
                Authentication
              </Link>
              <Link href="/features/payment-integration" className="text-gray-700 hover:text-indigo-600">
                Payments
              </Link>
              <Link href="/for/indie-developers" className="text-gray-700 hover:text-indigo-600">
                Indie Developers
              </Link>
              <Link href="/for/startup-founders" className="text-gray-700 hover:text-indigo-600">
                Startup Founders
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium">
                Pricing
              </Link>
              <Link
                href="/pricing"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
