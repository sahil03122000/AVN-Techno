import React, { useState, useMemo } from 'react';
import { TrendingDown, Zap, Leaf, IndianRupee, Sun, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';

/* ── Constants ── */
const RATE_PER_UNIT   = 8;     // ₹ per kWh (average India)
const SOLAR_PER_KW    = 4;     // units/day per kW installed
const COST_PER_KW     = 55000; // ₹ per kW before subsidy
const CO2_PER_UNIT    = 0.82;  // kg CO2 per kWh

function subsidyRate(kw) {
  if (kw <= 3)  return 0.40;
  if (kw <= 10) return 0.20;
  return 0.10;
}

function getSystemSize(monthlyBill) {
  // kWh consumed per month
  const monthlyUnits = monthlyBill / RATE_PER_UNIT;
  // kW needed (4 sun-hours/day × 30 days)
  return Math.ceil(monthlyUnits / (SOLAR_PER_KW * 30));
}

const ROOF_AREAS = [
  { label: 'Small  (< 500 sq ft)',  kw: 3  },
  { label: 'Medium (500–1000 sq ft)', kw: 5 },
  { label: 'Large  (1000–2000 sq ft)',kw: 8 },
  { label: 'Very Large (2000+ sq ft)',kw: 12},
];

export default function SolarCalculator() {
  const [bill,      setBill]      = useState(3000);
  const [roofIdx,   setRoofIdx]   = useState(1);
  const [rate,      setRate]      = useState(RATE_PER_UNIT);
  const [showResult,setShowResult]= useState(false);

  /* ── Calculations ── */
  const results = useMemo(() => {
    const neededKw   = getSystemSize(bill);
    const maxKw      = ROOF_AREAS[roofIdx].kw;
    const systemKw   = Math.min(neededKw, maxKw);

    const dailyGen   = systemKw * SOLAR_PER_KW;            // units/day
    const monthlyGen = dailyGen * 30;                       // units/month
    const monthlyGen_value = monthlyGen * rate;             // ₹/month
    const solarSaving = Math.min(monthlyGen_value, bill);   // can't save more than bill
    const newBill    = Math.max(0, bill - solarSaving);

    const grossCost  = systemKw * COST_PER_KW;
    const sub        = grossCost * subsidyRate(systemKw);
    const netCost    = grossCost - sub;
    const annualSaving = solarSaving * 12;
    const payback    = netCost / annualSaving;

    const co2Saved   = (monthlyGen * CO2_PER_UNIT * 12) / 1000; // tonnes/yr
    const trees      = Math.round(co2Saved * 45);                // ~45 trees/tonne

    return {
      systemKw, dailyGen, monthlyGen, solarSaving,
      newBill, grossCost, sub, netCost,
      annualSaving, payback: payback.toFixed(1),
      co2Saved: co2Saved.toFixed(1), trees,
      pct: Math.round((solarSaving / bill) * 100),
    };
  }, [bill, roofIdx, rate]);

  return (
    <section className="section-pad bg-gradient-to-br from-primary-50 via-white to-amber-50">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Solar Savings Calculator"
          title="See How Much You Can Save"
          subtitle="Enter your details below and get an instant estimate of your solar savings and system cost."
        />

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-start">

          {/* ── Input Panel ── */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
            <h3 className="font-display font-bold text-xl text-gray-900">Your Details</h3>

            {/* Monthly Bill */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Monthly Electricity Bill</label>
                <span className="font-bold text-primary-600 text-lg">₹{bill.toLocaleString()}</span>
              </div>
              <input
                type="range" min="500" max="30000" step="500"
                value={bill}
                onChange={e => setBill(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹500</span><span>₹30,000</span>
              </div>
            </div>

            {/* Roof Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Available Roof Area</label>
              <div className="grid grid-cols-2 gap-2">
                {ROOF_AREAS.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setRoofIdx(i)}
                    className={`text-xs font-semibold px-3 py-2.5 rounded-xl border-2 transition-all text-left
                      ${roofIdx === i
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-600 hover:border-primary-200'}`}
                  >
                    {r.label}
                    <span className="block text-[10px] font-normal text-gray-400 mt-0.5">Up to {r.kw} kW</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Electricity Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Electricity Rate (₹/unit)</label>
                <span className="font-bold text-primary-600">₹{rate}</span>
              </div>
              <input
                type="range" min="4" max="15" step="0.5"
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹4</span><span>₹15</span>
              </div>
            </div>

            <button
              onClick={() => setShowResult(true)}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" /> Calculate My Savings
            </button>
          </div>

          {/* ── Results Panel ── */}
          <div className={`space-y-4 transition-all duration-500 ${showResult ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>

            {/* Savings highlight */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="w-5 h-5 text-solar-yellow" />
                <span className="font-semibold text-primary-200 text-sm">Monthly Bill Reduction</span>
              </div>
              <div className="flex items-end gap-4 mb-4">
                <div>
                  <p className="text-primary-300 text-xs mb-1">Current Bill</p>
                  <p className="font-display text-3xl font-bold line-through text-primary-300">₹{bill.toLocaleString()}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-solar-yellow mb-2" />
                <div>
                  <p className="text-primary-300 text-xs mb-1">New Bill</p>
                  <p className="font-display text-3xl font-bold text-solar-yellow">₹{results.newBill.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl px-4 py-3 flex justify-between items-center">
                <span className="text-sm text-primary-100">You save every month</span>
                <span className="font-bold text-xl text-white">₹{results.solarSaving.toLocaleString()} ({results.pct}%)</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Sun,         color:'text-solar-yellow', bg:'bg-amber-50',   label:'System Size',     value:`${results.systemKw} kW` },
                { icon: Zap,         color:'text-primary-600',  bg:'bg-primary-50', label:'Daily Generation', value:`${results.dailyGen} units` },
                { icon: TrendingDown,color:'text-green-600',    bg:'bg-green-50',   label:'Annual Savings',  value:`₹${results.annualSaving.toLocaleString()}` },
                { icon: Leaf,        color:'text-teal-600',     bg:'bg-teal-50',    label:'CO₂ Saved/Year',  value:`${results.co2Saved} T` },
              ].map(({ icon: Icon, color, bg, label, value }) => (
                <div key={label} className={`${bg} rounded-2xl p-4 border border-gray-100`}>
                  <Icon className={`w-5 h-5 ${color} mb-2`} />
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className={`font-bold text-lg ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">💰 Investment Breakdown</h4>
              {[
                { label: 'System Cost (before subsidy)', value: `₹${results.grossCost.toLocaleString()}`, cls: 'text-gray-600' },
                { label: `Govt. Subsidy (${Math.round(subsidyRate(results.systemKw)*100)}%)`,  value: `- ₹${Math.round(results.sub).toLocaleString()}`, cls: 'text-green-600' },
                { label: 'Your Net Investment',           value: `₹${Math.round(results.netCost).toLocaleString()}`, cls: 'text-primary-700 font-bold' },
                { label: 'Payback Period',                value: `${results.payback} years`, cls: 'text-solar-orange font-bold' },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-500">{row.label}</span>
                  <span className={row.cls}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Eco fact */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">🌳</span>
              <p className="text-green-800 text-sm">
                Your system will offset the equivalent of planting <strong>{results.trees} trees</strong> every year!
              </p>
            </div>

            <Link to="/contact" className="block">
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <ArrowRight className="w-4 h-4" /> Get My Free Custom Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
