import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Leaf, Headphones, ArrowRight, Star, CheckCircle2,
  Sun, Battery, TrendingDown, Shield
} from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import SectionHeader from '../components/SectionHeader';
import StatsBar from '../components/StatsBar';
import FAQ from '../components/FAQ';
import LeadPopup from '../components/LeadPopup';

/* ─── Data ─── */
const features = [
  { icon: TrendingDown, color: 'text-solar-yellow',  bg: 'bg-amber-50',   title: 'Save Money',     desc: 'Cut electricity bills by up to 90% and earn from excess power fed to the grid.' },
  { icon: Leaf,         color: 'text-primary-600',   bg: 'bg-primary-50', title: 'Eco-Friendly',   desc: 'Reduce your carbon footprint and contribute to a cleaner, greener planet.' },
  { icon: Headphones,   color: 'text-blue-600',      bg: 'bg-blue-50',    title: '24/7 Support',   desc: 'Round-the-clock technical assistance and proactive system monitoring.' },
  { icon: Shield,       color: 'text-purple-600',    bg: 'bg-purple-50',  title: '25-Year Warranty', desc: 'Industry-leading panel warranty and 10-year workmanship guarantee.' },
];

const testimonials = [
  {
    name: 'Ramesh Sharma', role: 'Homeowner, Delhi',
    text: 'AVN Techno transformed our electricity bills. We went from paying ₹8,000/month to almost zero! The installation was quick and professional.',
    stars: 5, img: 'RS',
  },
  {
    name: 'Priya Mehta', role: 'Business Owner, Noida',
    text: 'Best investment for our factory. ROI in under 3 years. The team handled everything from permits to grid connection. Highly recommend!',
    stars: 5, img: 'PM',
  },
  {
    name: 'Anil Verma', role: 'Farmer, Haryana',
    text: 'The solar pump system AVN installed has saved us lakhs in diesel costs. Our crops are better and we no longer worry about power cuts.',
    stars: 5, img: 'AV',
  },
];

const avatarColors = ['bg-primary-600', 'bg-solar-orange', 'bg-purple-600'];

export default function Home() {
  useScrollAnimation();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
    {showPopup && <LeadPopup onClose={() => setShowPopup(false)} forceShow />}
    <>
      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center bg-hero-pattern overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle w-64 h-64 bg-primary-400/10 -top-20 -right-20" style={{ animationDelay: '0s' }} />
          <div className="particle w-40 h-40 bg-solar-yellow/10 bottom-20 left-10"  style={{ animationDelay: '1.5s' }} />
          <div className="particle w-24 h-24 bg-primary-300/15 top-1/3 right-1/4"   style={{ animationDelay: '0.8s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-4 py-2 rounded-full animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                India's Trusted Solar Partner
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1]">
                Power Your Future{' '}
                <span className="text-gradient">with Solar Energy</span>
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                AVN Techno delivers premium solar solutions for homes and businesses across India.
                Go green, save big, and achieve energy independence with our certified experts.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {['MNRE Certified', 'ISO 9001:2015', '5-Star Rated', 'NABCEP Trained'].map(badge => (
                  <span key={badge} className="flex items-center gap-1.5 text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {badge}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowPopup(true)}
                  className="btn-primary flex items-center gap-2 animate-pulse-glow"
                >
                  <Zap className="w-5 h-5" /> Free Quote Paayein ☀️
                </button>
                <Link to="/contact" className="btn-outline flex items-center gap-2">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {['R','P','A','S'].map((l, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-white ${avatarColors[i % 3]} flex items-center justify-center text-white text-xs font-bold`}>{l}</div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-solar-yellow text-solar-yellow" />)}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Trusted by 1,200+ happy customers</p>
                </div>
              </div>
            </div>

            {/* Right — Visual Card */}
            <div className="relative animate-float hidden lg:block">
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-2xl shadow-primary-900/30">
                <Sun className="w-20 h-20 text-solar-yellow mx-auto mb-6 drop-shadow-lg" />
                <h3 className="font-display text-3xl font-bold text-center mb-2">Switch to Solar</h3>
                <p className="text-primary-200 text-center text-sm mb-8">Start saving from day one</p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Battery,     label: 'Energy Stored',  val: '4.2 kWh' },
                    { icon: TrendingDown, label: 'Bill Reduction', val: '90%' },
                    { icon: Leaf,        label: 'CO₂ Saved',      val: '2.4 T/yr' },
                    { icon: Zap,         label: 'Power Generated', val: '6.8 kW' },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                      <Icon className="w-6 h-6 text-solar-yellow mx-auto mb-2" />
                      <p className="text-xl font-bold">{val}</p>
                      <p className="text-primary-200 text-xs">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-solar-yellow text-gray-900 font-bold text-sm px-4 py-2 rounded-full shadow-lg">
                ₹0 Electricity!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Installation Complete!</p>
                  <p className="text-xs text-gray-500">System live & generating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <StatsBar />

      {/* ══ FEATURES ══ */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <SectionHeader
            eyebrow="Why Solar?"
            title="Everything You Need to Go Solar"
            subtitle="From consultation to commissioning — we make solar simple, affordable, and powerful."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="animate-on-scroll card-hover p-6 rounded-2xl border border-gray-100 bg-white shadow-sm text-center group"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${f.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="section-pad bg-gray-50">
        <div className="container-max">
          <SectionHeader
            eyebrow="How It Works"
            title="Your Solar Journey in 4 Simple Steps"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-primary-100 z-0" />

            {[
              { step: '01', title: 'Free Consultation', desc: 'We assess your energy needs and roof suitability at zero cost.' },
              { step: '02', title: 'Custom Design',     desc: 'Our engineers design the perfect system sized for your consumption.' },
              { step: '03', title: 'Installation',      desc: 'Certified technicians install your system in 1–3 days.' },
              { step: '04', title: 'Go Live & Earn',    desc: 'Flip the switch and start saving — net metering earns you credits.' },
            ].map((item, i) => (
              <div
                key={item.step}
                className="animate-on-scroll relative z-10 text-center"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white font-display font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <SectionHeader
            eyebrow="Happy Customers"
            title="What Our Clients Say"
            subtitle="Real stories from real people who made the switch to solar."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="animate-on-scroll card-hover p-6 rounded-2xl border border-gray-100 bg-white shadow-sm"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-solar-yellow text-solar-yellow" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[i]} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.img}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="relative section-pad bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)' }} />
        <div className="container-max text-center relative z-10">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Limited Time Offer
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
            Get a FREE Solar Assessment Today
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Our experts will visit your site, design a custom system, and show you exactly how much you'll save — completely free.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-solar-yellow hover:bg-amber-400 text-gray-900 font-bold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Book Free Site Visit
            </Link>
            <a href="tel:+911234567890" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-full border border-white/30 transition-all duration-300">
              Call +91 12345 67890
            </a>
          </div>
        </div>
      </section>

      {/* ══ TOOLS TEASER ══ */}
      <section className="section-pad bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Free Solar Tools"
            title="Plan Your Solar Journey — For Free"
            subtitle="Use our interactive tools to estimate savings, simulate your bill, and book a site visit in minutes."
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { emoji:"🧮", title:"Savings Calculator",  desc:"Enter your monthly bill and instantly see how much you can save with solar — including subsidy and payback period.", link:"/tools", cta:"Calculate Now" },
              { emoji:"📊", title:"Bill Simulator",       desc:"See your electricity bill before and after solar, month by month for 25 years, with inflation factored in.", link:"/tools", cta:"Simulate My Bill" },
              { emoji:"📅", title:"Book a Free Visit",   desc:"Schedule a free site assessment at your home or business. Pick your date, time, and service in 2 minutes.", link:"/tools", cta:"Book Now" },
            ].map((tool, i) => (
              <div key={tool.title} className="animate-on-scroll card-hover p-6 rounded-2xl border border-gray-100 shadow-sm bg-gray-50 text-center" style={{ transitionDelay: i * 0.1 + "s" }}>
                <div className="text-4xl mb-4">{tool.emoji}</div>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{tool.desc}</p>
                <Link to={tool.link} className="btn-primary inline-block text-sm py-2.5 px-6">{tool.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <FAQ />
    </>
  </>);
}
