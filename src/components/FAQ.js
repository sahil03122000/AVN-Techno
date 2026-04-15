import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';

const faqs = [
  {
    q: 'How much does a solar installation cost?',
    a: 'The cost depends on system size, roof type, and your energy needs. Residential systems typically range from ₹1.5 – ₹4 lakhs after government subsidies. We provide a free site assessment and custom quote.',
  },
  {
    q: 'How long does installation take?',
    a: 'Most residential installations are completed in 1–3 days. Commercial projects may take 1–2 weeks. We handle all permits, inspections, and grid-connection paperwork.',
  },
  {
    q: 'What government subsidies are available?',
    a: 'Under PM Surya Ghar Muft Bijli Yojana, homeowners get up to 40% subsidy on systems up to 3 kW and 20% for 3–10 kW. Our team helps you claim all applicable subsidies.',
  },
  {
    q: 'What is the payback period for solar?',
    a: 'With current electricity rates and subsidies, the typical payback period is 3–5 years. After that, you enjoy free electricity for 20+ years.',
  },
  {
    q: 'Do solar panels work on cloudy days?',
    a: 'Yes! Solar panels generate electricity from daylight, not direct sunlight. They produce 10–25% of their rated output on overcast days and work efficiently in India\'s climate year-round.',
  },
  {
    q: 'What maintenance do solar panels require?',
    a: 'Solar panels are virtually maintenance-free. We recommend an annual professional inspection and periodic cleaning (every 2–3 months). Our AMC plans cover all service needs.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="section-pad bg-gray-50">
      <div className="container-max">
        <SectionHeader
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before going solar."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                aria-expanded={openIndex === idx}
              >
                <span className={`font-semibold text-sm sm:text-base transition-colors ${openIndex === idx ? 'text-primary-600' : 'text-gray-800'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 ml-4 text-gray-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary-500' : ''}`}
                />
              </button>

              {/* Animated answer */}
              <div className={`accordion-content ${openIndex === idx ? 'open' : ''}`}>
                <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
