import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Eye, Award, Users, Zap, Heart, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import SectionHeader from '../components/SectionHeader';
import StatsBar from '../components/StatsBar';

const whyUs = [
  { icon: Award,   title: 'MNRE Certified',      desc: 'Government-approved installer with all necessary licences and certifications.' },
  { icon: Users,   title: 'Expert Team',          desc: '50+ trained engineers with NABCEP certifications and 10+ years of field experience.' },
  { icon: Zap,     title: 'Premium Products',     desc: 'We use only Tier-1 panels (Adani, Waaree, Longi) with 25-year performance warranty.' },
  { icon: Heart,   title: 'Customer-First',       desc: 'Transparent pricing, no hidden costs, and a dedicated service manager for every client.' },
  { icon: Target,  title: 'On-Time Delivery',     desc: '98% of our projects are delivered on schedule with zero compromise on quality.' },
  { icon: CheckCircle2, title: 'AMC Plans',       desc: 'Comprehensive Annual Maintenance Contracts for worry-free long-term ownership.' },
];

const team = [
  { name: 'Arvind Nanda',   role: 'Founder & CEO',         initials: 'AN', bg: 'bg-primary-600' },
  { name: 'Varun Khanna',   role: 'Head of Engineering',   initials: 'VK', bg: 'bg-solar-orange' },
  { name: 'Neha Sharma',    role: 'Operations Director',   initials: 'NS', bg: 'bg-purple-600' },
];

export default function About() {
  useScrollAnimation();

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary-50 via-white to-amber-50">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 border border-primary-100 px-4 py-2 rounded-full mb-4">Our Story</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            About <span className="text-gradient">AVN Techno</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Since 2015, we've been leading India's solar revolution — one rooftop at a time.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <StatsBar />

      {/* ── Company Intro ── */}
      <section className="section-pad bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll space-y-6">
              <SectionHeader
                eyebrow="Who We Are"
                title="India's Premier Solar Solutions Company"
                align="left"
              />
              <p className="text-gray-500 leading-relaxed">
                Founded in 2015, AVN Techno has grown from a small startup into one of North India's most trusted solar energy companies. With headquarters in New Delhi and operations across 12 states, we've helped over 1,200 homes and businesses transition to clean energy.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Our holistic approach — combining cutting-edge technology, certified expertise, and genuine care for our customers — has earned us a 98% satisfaction rate and numerous industry awards.
              </p>
              <ul className="space-y-3">
                {[
                  'MNRE empanelled solar installer',
                  'ISO 9001:2015 certified company',
                  'Authorised dealer for Adani, Waaree & Longi panels',
                  'Service network across 12 states',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Visual */}
            <div className="animate-on-scroll grid grid-cols-2 gap-4">
              {[
                { bg: 'from-primary-500 to-primary-700', text: '1,200+ Installations', sub: 'Across India' },
                { bg: 'from-solar-orange to-solar-yellow', text: '10 MW+', sub: 'Commercial Capacity' },
                { bg: 'from-purple-500 to-purple-700',    text: '15+ Years', sub: 'Combined Experience' },
                { bg: 'from-blue-500 to-blue-700',        text: '50,000+ Tons', sub: 'CO₂ Offset' },
              ].map(card => (
                <div key={card.text} className={`bg-gradient-to-br ${card.bg} rounded-2xl p-6 text-white text-center shadow-lg`}>
                  <p className="font-display text-2xl font-bold">{card.text}</p>
                  <p className="text-white/80 text-xs mt-1">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section-pad bg-gray-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="animate-on-scroll bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-primary-100 leading-relaxed">
                To accelerate India's transition to sustainable energy by making high-quality solar power accessible, affordable, and reliable for every home and business — driving energy independence and environmental stewardship.
              </p>
            </div>

            {/* Vision */}
            <div className="animate-on-scroll bg-gradient-to-br from-solar-orange to-solar-yellow rounded-3xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-amber-100 leading-relaxed">
                To be India's most trusted solar brand, powering 1 million households and businesses by 2030 — creating a future where clean energy is not a luxury, but a standard for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section-pad bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why AVN Techno?"
            title="What Sets Us Apart"
            subtitle="We don't just install panels — we deliver complete solar experiences."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="animate-on-scroll card-hover p-6 rounded-2xl border border-gray-100 shadow-sm"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-pad bg-gray-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Leadership"
            title="Meet the Team Behind AVN Techno"
          />
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <div key={member.name} className="animate-on-scroll text-center card-hover" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`w-24 h-24 ${member.bg} rounded-full flex items-center justify-center text-white font-display text-2xl font-bold mx-auto mb-4 shadow-lg`}>
                  {member.initials}
                </div>
                <h4 className="font-bold text-gray-900">{member.name}</h4>
                <p className="text-gray-500 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Join Our Solar Family?</h2>
          <p className="text-primary-100 mb-8 max-w-lg mx-auto">Get a free site assessment and customised quote within 24 hours.</p>
          <Link to="/contact" className="bg-solar-yellow hover:bg-amber-400 text-gray-900 font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
            <Zap className="w-5 h-5" /> Get Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
