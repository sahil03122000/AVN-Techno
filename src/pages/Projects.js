import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPin, Sun, Battery, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import SectionHeader from '../components/SectionHeader';

/* ── Project data (uses gradient placeholders instead of real images) ── */
const projects = [
  {
    id: 1,
    title: 'Sharma Residence — 5 kW Rooftop',
    location: 'Dwarka, New Delhi',
    type: 'Residential',
    capacity: '5 kW',
    savings: '₹6,000/month',
    gradient: 'from-primary-400 to-primary-700',
    icon: Sun,
    tag: 'Residential',
  },
  {
    id: 2,
    title: 'Pacific Industries — 500 kW Plant',
    location: 'Manesar, Haryana',
    type: 'Commercial',
    capacity: '500 kW',
    savings: '₹2.5L/month',
    gradient: 'from-solar-orange to-amber-500',
    icon: Battery,
    tag: 'Commercial',
  },
  {
    id: 3,
    title: 'Green Valley School — 50 kW',
    location: 'Noida, UP',
    type: 'Commercial',
    capacity: '50 kW',
    savings: '₹35,000/month',
    gradient: 'from-blue-400 to-blue-700',
    icon: Sun,
    tag: 'Commercial',
  },
  {
    id: 4,
    title: 'Verma Farm — Solar Pump 5 HP',
    location: 'Karnal, Haryana',
    type: 'Agricultural',
    capacity: '5 kW',
    savings: '₹12,000/month',
    gradient: 'from-green-400 to-green-700',
    icon: Zap,
    tag: 'Agricultural',
  },
  {
    id: 5,
    title: 'City Hospital — 200 kW Plant',
    location: 'Rohtak, Haryana',
    type: 'Commercial',
    capacity: '200 kW',
    savings: '₹1.2L/month',
    gradient: 'from-purple-400 to-purple-700',
    icon: Battery,
    tag: 'Commercial',
  },
  {
    id: 6,
    title: 'Mehta Apartment Complex — 20 kW',
    location: 'Gurgaon, Haryana',
    type: 'Residential',
    capacity: '20 kW',
    savings: '₹18,000/month',
    gradient: 'from-rose-400 to-rose-600',
    icon: Sun,
    tag: 'Residential',
  },
  {
    id: 7,
    title: 'Sunrise Mall — 1 MW Plant',
    location: 'Faridabad, Haryana',
    type: 'Commercial',
    capacity: '1,000 kW',
    savings: '₹6L/month',
    gradient: 'from-teal-400 to-teal-700',
    icon: Battery,
    tag: 'Commercial',
  },
  {
    id: 8,
    title: 'Patel Village — Community Solar',
    location: 'Mewat, Haryana',
    type: 'Agricultural',
    capacity: '30 kW',
    savings: '40 households served',
    gradient: 'from-indigo-400 to-indigo-700',
    icon: Zap,
    tag: 'Agricultural',
  },
  {
    id: 9,
    title: 'Kumar Bungalow — 10 kW + Storage',
    location: 'Chandigarh',
    type: 'Residential',
    capacity: '10 kW',
    savings: '₹10,000/month',
    gradient: 'from-cyan-400 to-cyan-700',
    icon: Battery,
    tag: 'Residential',
  },
];

const filters = ['All', 'Residential', 'Commercial', 'Agricultural'];

export default function Projects() {
  useScrollAnimation();
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.tag === active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary-50 via-white to-amber-50">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 border border-primary-100 px-4 py-2 rounded-full mb-4">Our Work</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Solar <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Real projects, real savings. Explore installations we've completed across North India.
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="section-pad bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${active === filter
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="animate-on-scroll group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  {/* Image placeholder */}
                  <div className={`relative bg-gradient-to-br ${project.gradient} h-52 overflow-hidden`}>
                    {/* Solar panel grid illustration */}
                    <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 gap-1 p-4 opacity-30">
                      {[...Array(20)].map((_, j) => (
                        <div key={j} className="bg-white/40 rounded-sm" />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Tag */}
                    <span className="absolute top-3 right-3 bg-white/90 text-xs font-bold text-gray-700 px-3 py-1 rounded-full">
                      {project.tag}
                    </span>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        to="/contact"
                        className="bg-white text-gray-900 font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        Get Similar Quote <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 bg-white">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{project.title}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                      <MapPin className="w-3.5 h-3.5" /> {project.location}
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Capacity</p>
                        <p className="font-bold text-primary-600 text-sm">{project.capacity}</p>
                      </div>
                      <div className="w-px h-8 bg-gray-100" />
                      <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Monthly Savings</p>
                        <p className="font-bold text-solar-orange text-sm">{project.savings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonial strip ── */}
      <section className="py-16 bg-primary-50">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="font-display text-2xl sm:text-3xl text-gray-800 font-bold italic mb-6">
              "From day one, AVN Techno was transparent, professional, and delivered exactly what they promised. Our 500 kW plant has been flawless for 3 years."
            </p>
            <footer className="text-gray-500">
              <strong className="text-gray-800">Rajesh Gupta</strong>, MD — Pacific Industries, Manesar
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Want to See Your Project Here?</h2>
          <p className="text-primary-100 mb-8 max-w-lg mx-auto">Join 1,200+ satisfied customers who switched to solar with AVN Techno.</p>
          <Link to="/contact" className="bg-solar-yellow hover:bg-amber-400 text-gray-900 font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
            <Zap className="w-5 h-5" /> Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
}
