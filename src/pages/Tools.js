import React, { useState } from 'react';
import { Calculator, TrendingDown, Calendar, ChevronDown } from 'lucide-react';
import SolarCalculator from '../components/SolarCalculator';
import BillSimulator   from '../components/BillSimulator';
import AppointmentBooking from '../components/AppointmentBooking';
import { useScrollAnimation } from '../components/useScrollAnimation';

const TABS = [
  { id: 'calculator', label: 'Savings Calculator', icon: Calculator,   desc: 'Estimate your solar savings & system cost instantly' },
  { id: 'simulator',  label: 'Bill Simulator',      icon: TrendingDown, desc: 'See your before & after bills month by month' },
  // { id: 'booking',    label: 'Book a Visit',         icon: Calendar,     desc: 'Schedule a free site assessment at your convenience' },
];

export default function Tools() {
  useScrollAnimation();
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 border border-primary-100 px-4 py-2 rounded-full mb-4">
            Free Solar Tools
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Plan Your Solar <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-solar-yellow">Journey</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Use our free interactive tools to calculate savings, simulate your bill, and book a visit — all in one place.
          </p>
        </div>
      </section>

      {/* ── Tab Switcher ── */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200
                    ${activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active Tool ── */}
      <div>
        {activeTab === 'calculator' && <SolarCalculator />}
        {activeTab === 'simulator'  && <BillSimulator />}
        {activeTab === 'booking'    && <AppointmentBooking />}
      </div>
    </>
  );
}
