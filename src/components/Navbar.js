import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Tools',    to: '/tools' },
  { label: 'Contact',  to: '/contact' },
];
// CTA button route
const NAV_CTA = '/get-quote';

export default function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const { pathname } = useLocation();

  /* ── Close menu on route change ── */
  useEffect(() => setOpen(false), [pathname]);

  /* ── Sticky scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/40 transition-shadow duration-300">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block font-display font-bold text-xl text-primary-700">AVN Techno</span>
              <span className="block text-[10px] font-body font-medium text-solar-yellow tracking-widest uppercase">Solar Energy</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${pathname === link.to
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/get-quote"
              className="ml-4 btn-primary flex items-center gap-2 text-sm py-2.5 bg-solar-yellow hover:bg-amber-400 text-gray-900"
            >
              <Zap className="w-4 h-4" />
              FREE Quote Paayen
            </Link>
          </nav>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-primary-50 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100
          ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors
                ${pathname === link.to
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mt-3 btn-primary text-center text-sm"
          >
            Get a Free Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
