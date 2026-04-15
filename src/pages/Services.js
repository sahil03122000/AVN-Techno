import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Wrench, Cpu, Sun, Zap, CheckCircle2, ArrowRight, Battery } from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import SectionHeader from '../components/SectionHeader';

const services = [
  {
    icon: Home,
    color: 'text-primary-600',
    bg: 'from-primary-500 to-primary-700',
    lightBg: 'bg-primary-50',
    title: 'Residential Solar Installation',
    subtitle: 'For homes & apartments',
    desc: 'Transform your rooftop into a power plant. Our residential solar solutions are designed to maximise energy generation for Indian homes — from 1 kW to 20 kW systems.',
    features: [
      'Custom system design for your roof',
      'On-grid, off-grid & hybrid systems',
      'Net metering assistance',
      'Government subsidy guidance',
      '25-year panel warranty',
      '10-year workmanship guarantee',
    ],
    price: '₹45,000 onwards',
  },
  {
    icon: Building2,
    color: 'text-solar-orange',
    bg: 'from-solar-orange to-solar-yellow',
    lightBg: 'bg-amber-50',
    title: 'Commercial Solar Solutions',
    subtitle: 'For businesses & industries',
    desc: 'Reduce your commercial electricity costs by up to 80%. We design and install large-scale solar plants for factories, warehouses, hospitals, schools, and office complexes.',
    features: [
      'Systems from 20 kW to 10 MW+',
      'Rooftop & ground-mounted options',
      'Power Purchase Agreements (PPA)',
      'Remote monitoring & SCADA',
      'Accelerated depreciation benefits',
      'Dedicated project manager',
    ],
    price: 'Custom Pricing',
  },
  {
    icon: Wrench,
    color: 'text-blue-600',
    bg: 'from-blue-500 to-blue-700',
    lightBg: 'bg-blue-50',
    title: 'Maintenance & AMC Services',
    subtitle: 'For all solar systems',
    desc: 'Keep your solar investment performing at peak efficiency with our comprehensive Annual Maintenance Contracts — whether we installed the system or not.',
    features: [
      'Quarterly preventive maintenance',
      'Panel cleaning & inspection',
      '24/7 remote monitoring',
      'Inverter health checks',
      'Performance reporting',
      'Priority breakdown support',
    ],
    price: '₹3,500/year onwards',
  },
  {
    icon: Battery,
    color: 'text-purple-600',
    bg: 'from-purple-500 to-purple-700',
    lightBg: 'bg-purple-50',
    title: 'Solar Battery Storage',
    subtitle: 'Energy independence',
    desc: 'Pair your solar system with high-capacity lithium battery storage for round-the-clock power — eliminating grid dependence and protecting against power cuts.',
    features: [
      'Lithium & LiFePO4 batteries',
      '5 kWh to 100 kWh+ capacity',
      'AI-based energy management',
      'Seamless power backup',
      '10-year battery warranty',
      'Smart app monitoring',
    ],
    price: '₹80,000 onwards',
  },
  {
    icon: Sun,
    color: 'text-green-600',
    bg: 'from-green-500 to-green-700',
    lightBg: 'bg-green-50',
    title: 'Solar Water Pumping',
    subtitle: 'For agriculture & irrigation',
    desc: 'Replace diesel pumps with silent, zero-cost solar water pumps under PM KUSUM scheme. Ideal for farms, villages, and remote water supply projects.',
    features: [
      'AC & DC pump systems',
      'PM KUSUM subsidy eligible',
      '1 HP to 10 HP pumps',
      'VFD-based smart control',
      'Bore-well compatible',
      'Remote monitoring option',
    ],
    price: '₹60,000 onwards',
  },
  {
    icon: Cpu,
    color: 'text-rose-600',
    bg: 'from-rose-500 to-rose-600',
    lightBg: 'bg-rose-50',
    title: 'Solar Consultation & Audit',
    subtitle: 'For informed decisions',
    desc: 'Not sure which solar system is right for you? Our experts provide detailed energy audits and feasibility reports to help you make the most informed investment.',
    features: [
      'Site feasibility assessment',
      'Energy consumption analysis',
      'System sizing & design',
      'ROI & payback calculation',
      'Subsidy & financing advice',
      'Detailed project report',
    ],
    price: 'FREE Assessment',
  },
];

export default function Services() {
  useScrollAnimation();

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary-50 via-white to-amber-50">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 border border-primary-100 px-4 py-2 rounded-full mb-4">What We Offer</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Our Solar <span className="text-gradient">Services</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            End-to-end solar solutions for every need — residential, commercial, agricultural, and beyond.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="section-pad bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="animate-on-scroll card-hover rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-br ${service.bg} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
                    <div className="absolute -right-2 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
                    <div className={`w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4 relative z-10`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-1 relative z-10">{service.title}</h3>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-wide relative z-10">{service.subtitle}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 className={`w-4 h-4 ${service.color} shrink-0`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Starting from</p>
                        <p className={`font-bold ${service.color}`}>{service.price}</p>
                      </div>
                      <Link
                        to="/contact"
                        className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors group-hover:text-primary-600"
                      >
                        Get Quote <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section-pad bg-gray-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="How We Deliver Excellence"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Site Survey',       desc: 'Free on-site visit to assess roof condition, shading, and energy needs.' },
              { step: 2, title: 'Design & Proposal', desc: 'Detailed system design with 3D shadow analysis and financial projections.' },
              { step: 3, title: 'Installation',       desc: 'Certified engineers install the system with zero disruption to your daily life.' },
              { step: 4, title: 'Handover & AMC',    desc: 'Complete training, app setup, and optional Annual Maintenance Contract.' },
            ].map((item, i) => (
              <div key={item.step} className="animate-on-scroll text-center p-6 bg-white rounded-2xl shadow-sm" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 text-white font-display font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-primary-100 mb-8 max-w-lg mx-auto">Talk to our solar experts today — free consultation, no pressure, no commitment.</p>
          <Link to="/contact" className="bg-solar-yellow hover:bg-amber-400 text-gray-900 font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
            <Zap className="w-5 h-5" /> Talk to an Expert
          </Link>
        </div>
      </section>
    </>
  );
}
