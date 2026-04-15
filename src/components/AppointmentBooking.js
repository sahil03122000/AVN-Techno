import React, { useState, useMemo } from 'react';
import { Calendar, Clock, User, Phone, MapPin, CheckCircle2, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import SectionHeader from './SectionHeader';

/* ── Time slots ── */
const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM',
];

/* ── Service types ── */
const SERVICE_TYPES = [
  { id: 'residential', label: '🏠 Residential Solar', desc: 'For homes & apartments' },
  { id: 'commercial',  label: '🏭 Commercial Solar',  desc: 'For businesses & factories' },
  { id: 'maintenance', label: '🔧 Maintenance Visit',  desc: 'For existing solar systems' },
  { id: 'consultation',label: '💡 Free Consultation',  desc: 'General solar advice' },
];

/* ── Days of week header ── */
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ── Booked slots (demo — in production this would be from backend) ── */
const BOOKED = new Set(['09:00 AM', '11:00 AM']); // some slots shown as unavailable

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function validate(form) {
  const e = {};
  if (!form.name.trim())             e.name    = 'Name is required';
  if (!/^\d{10}$/.test(form.phone))  e.phone   = 'Enter valid 10-digit number';
  if (!form.address.trim())          e.address = 'Address is required';
  return e;
}

export default function AppointmentBooking() {
  const today   = new Date();
  const [view,  setView]   = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [step,  setStep]   = useState(1);  // 1=service, 2=datetime, 3=details, 4=confirmed
  const [selected, setSelected] = useState({ service: '', date: null, time: '' });
  const [form,  setForm]   = useState({ name: '', phone: '', address: '', notes: '' });
  const [errors,setErrors] = useState({});

  const cells = useMemo(() => getMonthMatrix(view.year, view.month), [view]);

  const prevMonth = () => setView(v => {
    if (v.month === 0) return { year: v.year - 1, month: 11 };
    return { ...v, month: v.month - 1 };
  });
  const nextMonth = () => setView(v => {
    if (v.month === 11) return { year: v.year + 1, month: 0 };
    return { ...v, month: v.month + 1 };
  });

  const isDateValid = (day) => {
    if (!day) return false;
    const d = new Date(view.year, view.month, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return false;
    if (d.getDay() === 0) return false; // Sundays off
    return true;
  };

  const isSelectedDate = (day) => {
    if (!day || !selected.date) return false;
    const s = selected.date;
    return s.getFullYear() === view.year && s.getMonth() === view.month && s.getDate() === day;
  };

  const selectDate = (day) => {
    if (!isDateValid(day)) return;
    setSelected(s => ({ ...s, date: new Date(view.year, view.month, day), time: '' }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleConfirm = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(4);
  };

  const formatDate = (date) => date
    ? `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
    : '';

  /* ── Step indicator ── */
  const STEPS = ['Service', 'Date & Time', 'Your Details', 'Confirmed'];

  return (
    <section className="section-pad bg-gray-50">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Book a Visit"
          title="Schedule Your Free Site Assessment"
          subtitle="Pick a convenient date and time — our expert will visit and design your perfect solar system."
        />

        <div className="max-w-3xl mx-auto">
          {/* ── Step progress bar ── */}
          <div className="flex items-center mb-8">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                    ${step > i + 1 ? 'bg-primary-600 text-white' :
                      step === i + 1 ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                      'bg-gray-200 text-gray-500'}`}>
                    {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-semibold hidden sm:block ${step === i + 1 ? 'text-primary-600' : 'text-gray-400'}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 rounded-full transition-all ${step > i + 1 ? 'bg-primary-500' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

            {/* ══ STEP 1 — Service ══ */}
            {step === 1 && (
              <div className="p-8">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-6">What service do you need?</h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {SERVICE_TYPES.map(svc => (
                    <button
                      key={svc.id}
                      onClick={() => setSelected(s => ({ ...s, service: svc.id }))}
                      className={`p-4 rounded-2xl border-2 text-left transition-all
                        ${selected.service === svc.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'}`}
                    >
                      <p className="font-semibold text-gray-900 text-sm">{svc.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{svc.desc}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => selected.service && setStep(2)}
                  disabled={!selected.service}
                  className="w-full btn-primary disabled:opacity-40"
                >
                  Continue →
                </button>
              </div>
            )}

            {/* ══ STEP 2 — Date & Time ══ */}
            {step === 2 && (
              <div className="p-8">
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
                      <span className="font-bold text-gray-900 text-sm">{MONTH_NAMES[view.month]} {view.year}</span>
                      <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAY_NAMES.map(d => (
                        <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
                      ))}
                    </div>
                    {/* Date cells */}
                    <div className="grid grid-cols-7 gap-0.5">
                      {cells.map((day, i) => (
                        <button
                          key={i}
                          onClick={() => selectDate(day)}
                          disabled={!isDateValid(day)}
                          className={`aspect-square text-xs font-semibold rounded-lg transition-all
                            ${!day ? 'invisible' :
                              isSelectedDate(day) ? 'bg-primary-600 text-white shadow-md' :
                              isDateValid(day) ? 'hover:bg-primary-50 text-gray-700 hover:text-primary-600' :
                              'text-gray-300 cursor-not-allowed'}`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">* Sundays unavailable</p>
                  </div>

                  {/* Time slots */}
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-600" />
                      {selected.date ? `Available on ${formatDate(selected.date)}` : 'Select a date first'}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map(slot => {
                        const booked = BOOKED.has(slot) && selected.date?.getDate() % 3 === 0;
                        return (
                          <button
                            key={slot}
                            onClick={() => !booked && selected.date && setSelected(s => ({ ...s, time: slot }))}
                            disabled={!selected.date || booked}
                            className={`py-2.5 px-3 text-xs font-semibold rounded-xl border-2 transition-all
                              ${!selected.date || booked ? 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed' :
                                selected.time === slot ? 'border-primary-500 bg-primary-50 text-primary-700' :
                                'border-gray-200 hover:border-primary-300 text-gray-600'}`}
                          >
                            {slot}{booked ? ' — Full' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => selected.date && selected.time && setStep(3)}
                  disabled={!selected.date || !selected.time}
                  className="w-full btn-primary mt-8 disabled:opacity-40"
                >
                  Continue →
                </button>
              </div>
            )}

            {/* ══ STEP 3 — Details ══ */}
            {step === 3 && (
              <div className="p-8">
                <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                {/* Booking summary strip */}
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 flex flex-wrap gap-4 mb-6 text-sm">
                  <span className="flex items-center gap-1.5 text-primary-700 font-medium">
                    <Calendar className="w-4 h-4" /> {formatDate(selected.date)}
                  </span>
                  <span className="flex items-center gap-1.5 text-primary-700 font-medium">
                    <Clock className="w-4 h-4" /> {selected.time}
                  </span>
                  <span className="flex items-center gap-1.5 text-primary-700 font-medium capitalize">
                    <Zap className="w-4 h-4" /> {SERVICE_TYPES.find(s => s.id === selected.service)?.label}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-gray-900 mb-5">Your Contact Details</h3>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input type="text" name="name" value={form.name} onChange={handleFormChange}
                        placeholder="Rajesh Sharma"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-all bg-gray-50 focus:bg-white
                          ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`} />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input type="tel" name="phone" value={form.phone} onChange={handleFormChange}
                        placeholder="9876543210" maxLength={10}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-all bg-gray-50 focus:bg-white
                          ${errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Installation Address *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <textarea name="address" rows={2} value={form.address} onChange={handleFormChange}
                        placeholder="House no., Street, City, PIN code"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none resize-none transition-all bg-gray-50 focus:bg-white
                          ${errors.address ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`} />
                    </div>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Notes (optional)</label>
                    <textarea name="notes" rows={2} value={form.notes} onChange={handleFormChange}
                      placeholder="E.g. monthly bill amount, roof type, number of floors…"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 resize-none bg-gray-50 focus:bg-white" />
                  </div>
                </div>

                <button onClick={handleConfirm} className="w-full btn-primary mt-6 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Confirm Appointment
                </button>
              </div>
            )}

            {/* ══ STEP 4 — Confirmed ══ */}
            {step === 4 && (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed! 🎉</h3>
                <p className="text-gray-500 mb-6 text-sm">
                  Our solar expert will visit you on:
                </p>
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 inline-flex flex-col items-center gap-2 mb-6">
                  <p className="font-display text-xl font-bold text-primary-700">{formatDate(selected.date)}</p>
                  <p className="text-primary-600 font-semibold">{selected.time}</p>
                  <p className="text-primary-500 text-sm capitalize">{SERVICE_TYPES.find(s => s.id === selected.service)?.label}</p>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-left mb-6 text-sm text-amber-800 space-y-1">
                  <p className="font-semibold">📱 What to expect:</p>
                  <p>• You'll receive a confirmation SMS on <strong>{form.phone}</strong></p>
                  <p>• Our expert will call 30 mins before arrival</p>
                  <p>• The site visit takes approximately 45–60 minutes</p>
                  <p>• You'll get a custom quote within 24 hours</p>
                </div>

                <button
                  onClick={() => { setStep(1); setSelected({ service:'', date:null, time:'' }); setForm({ name:'', phone:'', address:'', notes:'' }); }}
                  className="btn-outline text-sm"
                >
                  Book Another Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
