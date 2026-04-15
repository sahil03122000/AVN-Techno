import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us',   to: '/about' },
    { label: 'Services',   to: '/services' },
    { label: 'Projects',   to: '/projects' },
    { label: 'Contact',    to: '/contact' },
  ],
  Services: [
    { label: 'Residential Solar', to: '/services' },
    { label: 'Commercial Solar',  to: '/services' },
    { label: 'Maintenance',       to: '/services' },
    { label: 'Consultation',      to: '/contact' },
  ],
};

const socials = [
  { icon: Facebook,  href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter,   href: '#', label: 'Twitter' },
  { icon: Linkedin,  href: '#', label: 'LinkedIn' },
  { icon: Youtube,   href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* ── Newsletter strip ── */}
      {/* <div className="bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl text-white font-bold">Stay Updated</h3>
              <p className="text-primary-100 mt-1 text-sm">Get solar tips & exclusive offers in your inbox.</p>
            </div>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 text-sm"
              />
              <button
                type="submit"
                className="bg-solar-yellow text-gray-900 font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-amber-400 transition-colors text-sm"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="block font-display font-bold text-xl text-white">AVN Techno</span>
                <span className="block text-[10px] text-solar-yellow tracking-widest uppercase">Solar Energy</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Empowering homes and businesses with clean, affordable solar energy solutions since 2015.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 uppercase text-xs tracking-widest">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase text-xs tracking-widest">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                123 Solar Street, Green Park, New Delhi – 110016
              </li>
              <li>
                <a href="tel:+911234567890" className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                  +91 12345 67890
                </a>
              </li>
              <li>
                <a href="mailto:info@avntechno.in" className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                  info@avntechno.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} AVN Techno. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
