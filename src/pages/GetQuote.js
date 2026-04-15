import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, Sun, Zap, Star,
         TrendingDown, Shield, Phone, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';

/* ── Steps ── */
const STEPS = [
  {
    id: 'location',
    question: '📍 Aap kahan se hain?',
    subtitle: 'Apna city / state select karein',
    type: 'radio',
    options: ['Delhi / NCR', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Punjab', 'Madhya Pradesh', 'Other State'],
  },
  {
    id: 'type',
    question: '🏠 Solar kiske liye chahiye?',
    subtitle: 'Apna property type choose karein',
    type: 'radio',
    options: ['Ghar ki Chhat (Home Rooftop)', 'Society / Apartment', 'Dukaan / Office', 'Factory / Warehouse', 'Khet / Farm (Agriculture)', 'School / Hospital'],
  },
  {
    id: 'size',
    question: '⚡ Approx System Size?',
    subtitle: 'Monthly bill ke hisaab se suggest bhi kar sakte hain',
    type: 'radio',
    options: ['1–3 kW (Chhota Ghar)', '3–5 kW (Bada Ghar)', '5–10 kW (Villa / Shop)', '10–50 kW (Commercial)', '50 kW+ (Industrial)', 'Pata Nahi — Aap Suggest Karein'],
  },
  {
    id: 'bill',
    question: '💡 Monthly Bijli Bill kitna hai?',
    subtitle: 'Approximate amount batayein — isse hum best system design karenge',
    type: 'radio',
    options: ['Rs.1,000 – Rs.3,000', 'Rs.3,000 – Rs.6,000', 'Rs.6,000 – Rs.10,000', 'Rs.10,000 – Rs.20,000', 'Rs.20,000+'],
  },
  {
    id: 'timeline',
    question: '📅 Kab lagwana chahte hain?',
    subtitle: 'Aapka preferred timeline batayein',
    type: 'radio',
    options: ['Jald se jald (1–2 hafte)', '1 Mahine mein', '2–3 Mahine mein', 'Sirf information chahiye abhi'],
  },
  {
    id: 'contact',
    question: '📞 Aapki Contact Information',
    subtitle: 'Hamari team aapko FREE quote ke saath 30 minute mein call karegi!',
    type: 'form',
  },
];

/* ── Social proof ── */
const REVIEWS = [
  { name: 'Ramesh S.', city: 'Delhi', text: 'Bahut acchi service! Bill Rs.7,000 se Rs.200 ho gaya.', stars: 5 },
  { name: 'Priya M.',  city: 'Noida', text: 'Installation 2 din mein ho gayi. Team professional thi.', stars: 5 },
  { name: 'Anil V.',   city: 'Haryana', text: 'Subsidy mili, EMI bhi asan thi. Highly recommend!', stars: 5 },
];

function RadioOption({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 text-left transition-all duration-200 group
        ${selected
          ? 'border-primary-500 bg-primary-50 text-primary-800'
          : 'border-gray-200 hover:border-primary-200 text-gray-700 hover:bg-gray-50'}`}
    >
      <span className="font-medium text-sm">{label}</span>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
        ${selected ? 'border-primary-500 bg-primary-500' : 'border-gray-300 group-hover:border-primary-300'}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round(((current) / total) * 100);
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-gray-400 mb-1.5">
        <span>Step {current} of {total}</span>
        <span>{pct}% complete</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function GetQuote() {
  useScrollAnimation();
  const [stepIdx,   setStepIdx]   = useState(0);
  const [answers,   setAnswers]   = useState({});
  const [form,      setForm]      = useState({ name: '', phone: '', email: '' });
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const step    = STEPS[stepIdx];
  const isLast  = stepIdx === STEPS.length - 1;
  const isFirst = stepIdx === 0;
  const canProceed = step.type === 'radio' ? !!answers[step.id] : true;

  const next = () => {
    if (!canProceed) return;
    if (!isLast) { setStepIdx(i => i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const errs = {};
    if (!form.name.trim())            errs.name  = 'Naam zaroori hai';
    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Valid 10-digit number dalein';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 1400);
  };

  const prev = () => { if (!isFirst) { setStepIdx(i => i - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="pt-20 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center relative z-10">
          <span className="inline-block bg-solar-yellow text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Sirf Aaj — Limited Offer
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Bijli Bill 90% Kam Karein —<br />
            <span className="text-solar-yellow">FREE Solar Quote Paayen!</span>
          </h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-6">
            Sarkaari subsidy + expert installation + 25 saal ki warranty.<br />
            Neeche form bharo — hamaari team 30 minute mein call karegi!
          </p>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 justify-center">
            {['MNRE Certified', '1,200+ Installations', '25-Yr Warranty', 'Free Site Visit'].map(b => (
              <span key={b} className="flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-solar-yellow" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="-mt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Form Card ── */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

            {submitted ? (
              /* ── Success ── */
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Shukriya, {form.name.split(' ')[0]}! 🎉
                </h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Aapki inquiry successfully submit ho gayi.<br />
                  Hamari team <strong>30 minute mein</strong> aapko <strong>+91 {form.phone}</strong> par call karegi.
                </p>

                {/* Summary */}
                <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6 space-y-2">
                  <p className="font-bold text-gray-800 text-sm mb-3">Aapki Inquiry Summary:</p>
                  {Object.entries(answers).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" />
                      {val}
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800 text-left mb-6">
                  <p className="font-semibold mb-2">Aage kya hoga?</p>
                  <p>📞 30 min mein call aayegi</p>
                  <p>🏠 FREE site visit schedule hogi</p>
                  <p>📋 Custom quote milega 24 ghante mein</p>
                  <p>💰 Subsidy claim mein help milegi</p>
                </div>

                {/* WhatsApp direct */}
                <a
                  href="https://wa.me/919876543210?text=Maine%20AVN%20Techno%20website%20par%20inquiry%20ki%20hai.%20Kripya%20mujhse%20sampark%20karein."
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Par Bhi Sampark Karein
                </a>
              </div>

            ) : (
              <>
                {/* Form header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Sun className="w-6 h-6 text-solar-yellow" />
                    </div>
                    <div>
                      <p className="font-bold text-white">AVN Techno</p>
                      <p className="text-primary-200 text-xs">Free Solar Consultation — 100% No Cost</p>
                    </div>
                  </div>
                  <ProgressBar current={stepIdx + 1} total={STEPS.length} />
                </div>

                {/* Step body */}
                <div className="p-6">
                  {step.type === 'radio' ? (
                    <div>
                      <h2 className="font-display font-bold text-xl text-gray-900 mb-1">{step.question}</h2>
                      <p className="text-gray-400 text-sm mb-5">{step.subtitle}</p>
                      <div className="space-y-2.5">
                        {step.options.map(opt => (
                          <RadioOption
                            key={opt}
                            label={opt}
                            selected={answers[step.id] === opt}
                            onClick={() => setAnswers(prev => ({ ...prev, [step.id]: opt }))}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-display font-bold text-xl text-gray-900 mb-1">{step.question}</h2>
                      <p className="text-gray-400 text-sm mb-5">{step.subtitle}</p>

                      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5 text-xs text-blue-700">
                        🔒 Aapki details safe hain — sirf hamaari team use karegi, kisi ko share nahi ki jaayegi.
                      </div>

                      <div className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Poora Naam *</label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
                            placeholder="Jaise: Ramesh Sharma"
                            className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-all
                              ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number * (IN +91)</label>
                          <div className="flex gap-2">
                            <div className="px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-600 font-semibold flex items-center">+91</div>
                            <input
                              type="tel" maxLength={10}
                              value={form.phone}
                              onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: '' })); }}
                              placeholder="9876543210"
                              className={`flex-1 px-4 py-3.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-all
                                ${errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                          <p className="text-gray-400 text-xs mt-1">Hamari team is number par call karegi.</p>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (Optional)</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="aap@email.com"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Nav buttons */}
                  <div className="flex gap-3 mt-6">
                    {!isFirst && (
                      <button
                        onClick={prev}
                        className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 transition-colors shrink-0"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={next}
                      disabled={!canProceed || loading}
                      className="flex-1 bg-[#1877F2] hover:bg-blue-700 disabled:opacity-40 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
                    >
                      {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Bhej rahe hain…</>
                      ) : isLast ? (
                        <><CheckCircle2 className="w-5 h-5" />FREE Quote Submit Karein!</>
                      ) : (
                        <>Continue <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>

                  {!canProceed && step.type === 'radio' && (
                    <p className="text-center text-xs text-amber-600 mt-2">👆 Pehle ek option select karein</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-24">

            {/* Why choose AVN */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-solar-yellow" /> AVN Techno Kyun Chunein?
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: TrendingDown, text: 'Bijli bill 90% tak kam karein', color: 'text-green-600' },
                  { icon: Shield,       text: '40% sarkaari subsidy — hum process karenge', color: 'text-blue-600' },
                  { icon: CheckCircle2, text: 'MNRE certified team — 15+ saal ka anubhav', color: 'text-primary-600' },
                  { icon: Zap,          text: '1,200+ successful installations', color: 'text-solar-orange' },
                  { icon: Phone,        text: '24/7 support — koi bhi samasya', color: 'text-purple-600' },
                ].map(({ icon: Icon, text, color }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-gray-600">
                    <Icon className={`w-4 h-4 ${color} shrink-0`} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Hamare Customers Ki Baat</h3>
              <div className="space-y-4">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(r.stars)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-solar-yellow text-solar-yellow" />)}
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-2">"{r.text}"</p>
                    <p className="text-xs font-semibold text-gray-800">{r.name} <span className="text-gray-400 font-normal">— {r.city}</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
              <p className="font-bold text-primary-800 text-sm mb-3">Seedha Baat Karni Hai?</p>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-primary-700 font-semibold text-sm hover:text-primary-900 transition-colors mb-2">
                <Phone className="w-4 h-4" /> +91 12345 67890
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-900 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Karein
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
