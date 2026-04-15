import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import FAQ from '../components/FAQ';
import AppointmentBooking from '../components/AppointmentBooking';

/* ─── Form validation ─── */
function validate(fields) {
  const errors = {};
  if (!fields.name.trim())                   errors.name    = 'Name is required.';
  if (!/^\d{10}$/.test(fields.phone))        errors.phone   = 'Enter a valid 10-digit phone number.';
  if (!/\S+@\S+\.\S+/.test(fields.email))   errors.email   = 'Enter a valid email address.';
  if (fields.message.trim().length < 10)     errors.message = 'Message must be at least 10 characters.';
  return errors;
}

const contactInfo = [
  { icon: Phone,   label: 'Call Us',        value: '+91 12345 67890',    href: 'tel:+911234567890' },
  { icon: Mail,    label: 'Email Us',        value: 'info@avntechno.in',  href: 'mailto:info@avntechno.in' },
  { icon: MapPin,  label: 'Visit Us',        value: '123 Solar Street, Green Park, New Delhi – 110016', href: '#' },
  { icon: Clock,   label: 'Working Hours',   value: 'Mon–Sat: 9 AM – 7 PM', href: null },
];

export default function Contact() {
  useScrollAnimation();

  const [fields, setFields]   = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate form submission
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary-50 via-white to-amber-50">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 border border-primary-100 px-4 py-2 rounded-full mb-4">Get In Touch</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Contact <span className="text-gradient">AVN Techno</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to go solar? Have questions? Our team is here to help — reach out any time.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-pad bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* ── Left: Info ── */}
            <div className="lg:col-span-2 space-y-6 animate-on-scroll">
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Let's Talk Solar</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Fill in the form or use any of the contact options below. We typically respond within 30 minutes during business hours.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-3">
                {contactInfo.map(item => {
                  const Icon = item.icon;
                  const inner = (
                    <div key={item.label} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
                      <div className="w-10 h-10 bg-primary-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</p>
                        <p className="text-gray-800 font-medium text-sm mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  );
                  return item.href && item.href !== '#'
                    ? <a key={item.label} href={item.href}>{inner}</a>
                    : <div key={item.label}>{inner}</div>;
                })}
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden shadow-md h-60 border border-gray-100">
                <iframe
                  title="AVN Techno Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4264!2d77.2048!3d28.6129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1699000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="lg:col-span-3 animate-on-scroll">
              {/* <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8">

                {submitted ? (
                
                  <div className="py-16 text-center">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-primary-600" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      We've received your enquiry. Our solar expert will call you within 30 minutes during business hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFields({ name:'', phone:'', email:'', service:'', message:'' }); }}
                      className="mt-6 btn-primary text-sm"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  
                  <>
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-6">Get a Free Quote</h3>
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={fields.name}
                          onChange={handleChange}
                          placeholder="Rajesh Sharma"
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white outline-none transition-all
                            ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={fields.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                            maxLength={10}
                            className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white outline-none transition-all
                              ${errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={fields.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white outline-none transition-all
                              ${errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Interested In</label>
                        <select
                          name="service"
                          value={fields.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700"
                        >
                          <option value="">Select a service…</option>
                          <option>Residential Solar Installation</option>
                          <option>Commercial Solar Solutions</option>
                          <option>Solar Battery Storage</option>
                          <option>Solar Water Pumping</option>
                          <option>Maintenance & AMC</option>
                          <option>Free Consultation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                        <textarea
                          name="message"
                          rows={4}
                          value={fields.message}
                          onChange={handleChange}
                          placeholder="Tell us about your energy needs, roof size, monthly bill, etc."
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white outline-none resize-none transition-all
                            ${errors.message ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Send Enquiry
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-400 text-center">
                        🔒 Your information is secure and will never be shared.
                      </p>
                    </form>
                  </>
                )}
              </div> */}
              <AppointmentBooking/>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQ />
    </>
  );
}
