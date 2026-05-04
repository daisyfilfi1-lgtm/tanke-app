'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { name: '首页', href: '/' },
  { name: '项目', href: '/projects' },
  { name: '关于', href: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-indigo-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-x-12">
            <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              探客
            </Link>
            <div className="hidden md:flex md:gap-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">打开菜单</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-indigo-100 mt-2 pt-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
