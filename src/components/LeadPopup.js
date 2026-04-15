import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Sun, Zap } from 'lucide-react';

const STEPS = [
  {
    id: 'location',
    question: '📍 Aap kahan se hain?',
    subtitle: 'Apna city / state select karein',
    type: 'radio',
    options: ['Delhi / NCR', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Punjab', 'Other State'],
  },
  {
    id: 'type',
    question: '🏠 Solar kiske liye chahiye?',
    subtitle: 'Apna property type choose karein',
    type: 'radio',
    options: ['Ghar ki Chhat (Home Rooftop)', 'Society / Apartment', 'Dukaan / Office', 'Factory / Warehouse', 'Khet / Farm (Agriculture)'],
  },
  {
    id: 'size',
    question: '⚡ Approx System Size?',
    subtitle: 'Agar pata nahi toh "Pata Nahi" select karein',
    type: 'radio',
    options: ['1–3 kW (Chhota Ghar)', '3–5 kW (Bada Ghar)', '5–10 kW (Villa / Shop)', '10 kW+ (Commercial)', 'Pata Nahi — Suggest Karein'],
  },
  {
    id: 'bill',
    question: '💡 Monthly Bijli Bill kitna hai?',
    subtitle: 'Approximate amount batayein',
    type: 'radio',
    options: ['Rs.1,000 – Rs.3,000', 'Rs.3,000 – Rs.6,000', 'Rs.6,000 – Rs.10,000', 'Rs.10,000 – Rs.20,000', 'Rs.20,000+'],
  },
  {
    id: 'contact',
    question: '📞 Aapki Contact Information',
    subtitle: 'Hamari team 30 minute mein call karegi — bilkul FREE!',
    type: 'form',
  },
];

function ProgressBar({ current, total }) {
  return (
    <div className="flex gap-1.5 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-300
            ${i < current ? 'bg-primary-600' : i === current ? 'bg-primary-400' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );
}

function RadioOption({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 group
        ${selected
          ? 'border-primary-500 bg-primary-50 text-primary-800'
          : 'border-gray-200 hover:border-primary-300 text-gray-700 hover:bg-gray-50'}`}
    >
      <span className="text-sm font-medium">{label}</span>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
        ${selected ? 'border-primary-500 bg-primary-500' : 'border-gray-300 group-hover:border-primary-300'}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}

export default function LeadPopup() {
  const [open,      setOpen]      = useState(false);
  const [stepIdx,   setStepIdx]   = useState(0);
  const [answers,   setAnswers]   = useState({});
  const [form,      setForm]      = useState({ name: '', phone: '', email: '' });
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('avnLeadSeen');
    if (seen) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('avnLeadSeen', '1');
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const step    = STEPS[stepIdx];
  const isLast  = stepIdx === STEPS.length - 1;
  const isFirst = stepIdx === 0;
  const canProceed = step.type === 'radio' ? !!answers[step.id] : true;

  const selectOption = (opt) => setAnswers(prev => ({ ...prev, [step.id]: opt }));

  const next = () => {
    if (!canProceed) return;
    if (!isLast) { setStepIdx(i => i + 1); return; }
    const errs = {};
    if (!form.name.trim())            errs.name  = 'Naam zaroori hai';
    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Valid 10-digit number dalein';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  const prev  = () => { if (!isFirst) setStepIdx(i => i - 1); };
  const close = () => setOpen(false);
  const reset = () => {
    setStepIdx(0); setAnswers({});
    setForm({ name: '', phone: '', email: '' });
    setErrors({}); setSubmitted(false); setOpen(false);
  };

  return (
    <>
      {/* Sticky bottom CTA bar (mobile) */}
      {!open && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold py-4 flex items-center justify-center gap-2 shadow-2xl"
          >
            <Zap className="w-5 h-5 text-solar-yellow" />
            FREE Solar Quote Paayen — Abhi Apply Karein!
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Backdrop + Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-5 pt-5 pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <Sun className="w-5 h-5 text-solar-yellow" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm leading-none">AVN Techno</p>
                    <p className="text-primary-200 text-xs">Free Solar Consultation</p>
                  </div>
                </div>
                <button onClick={close} className="text-white/70 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!submitted && (
                <div className="bg-white/10 rounded-2xl px-4 py-3 mb-3">
                  <p className="text-white font-bold text-sm">Bijli Bill 90% Kam Karein!</p>
                  <p className="text-primary-100 text-xs mt-0.5">Sarkaari Subsidy + FREE Site Visit — Limited Slots!</p>
                </div>
              )}

              {!submitted && <ProgressBar current={stepIdx} total={STEPS.length} />}
            </div>

            {/* Body */}
            <div className="px-5 py-5 max-h-[65vh] overflow-y-auto">

              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                    Shukriya, {form.name.split(' ')[0]}!
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Hamari team <strong>30 minute mein</strong> aapko <strong>+91 {form.phone}</strong> par call karegi.
                  </p>
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-left text-xs text-amber-800 space-y-1 mb-5">
                    <p className="font-semibold mb-2">Aapki Inquiry Summary:</p>
                    {Object.entries(answers).map(([key, val]) => (
                      <p key={key} className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />{val}</p>
                    ))}
                  </div>
                  <button onClick={reset} className="btn-outline text-sm w-full">Nayi Inquiry Karein</button>
                </div>

              ) : step.type === 'radio' ? (
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-1">{step.question}</h3>
                  <p className="text-gray-400 text-xs mb-4">{step.subtitle}</p>
                  <div className="space-y-2">
                    {step.options.map(opt => (
                      <RadioOption key={opt} label={opt} selected={answers[step.id] === opt} onClick={() => selectOption(opt)} />
                    ))}
                  </div>
                </div>

              ) : (
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-1">{step.question}</h3>
                  <p className="text-gray-400 text-xs mb-4">{step.subtitle}</p>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4 text-xs text-blue-700">
                    Aapki details sirf hamari team ke saath share hogi — kisi ko bhi sell nahi ki jaayegi.
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Poora Naam *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
                        placeholder="Jaise: Ramesh Sharma"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-all
                          ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number * (IN +91)</label>
                      <div className="flex gap-2">
                        <div className="w-16 px-3 py-3 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 font-medium flex items-center justify-center">+91</div>
                        <input
                          type="tel"
                          maxLength={10}
                          value={form.phone}
                          onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: '' })); }}
                          placeholder="9876543210"
                          className={`flex-1 px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-all
                            ${errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      <p className="text-gray-400 text-xs mt-1">AVN Techno aapko follow-up ke liye contact karegi.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (Optional)</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="aap@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                <div className="flex gap-3">
                  {!isFirst && (
                    <button onClick={prev} className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 transition-colors shrink-0">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={next}
                    disabled={!canProceed || loading}
                    className="flex-1 bg-[#1877F2] hover:bg-blue-700 disabled:opacity-40 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Bhej rahe hain…</>
                    ) : isLast ? (
                      <><CheckCircle2 className="w-5 h-5" />Submit — FREE Quote Paayen!</>
                    ) : (
                      <>Continue <ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  Step {stepIdx + 1} of {STEPS.length} • Aapki details safe hain
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
