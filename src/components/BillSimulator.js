import React, { useState, useMemo } from 'react';
import { Zap, TrendingDown, Calendar, ArrowRight, Sun, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';

/* ── Monthly avg sun hours by season (India) ── */
const MONTHS = [
  { name: 'Jan', sun: 5.2 }, { name: 'Feb', sun: 5.8 }, { name: 'Mar', sun: 6.4 },
  { name: 'Apr', sun: 6.8 }, { name: 'May', sun: 6.5 }, { name: 'Jun', sun: 5.0 },
  { name: 'Jul', sun: 4.2 }, { name: 'Aug', sun: 4.5 }, { name: 'Sep', sun: 5.5 },
  { name: 'Oct', sun: 5.8 }, { name: 'Nov', sun: 5.4 }, { name: 'Dec', sun: 5.0 },
];

const RATE_PER_UNIT = 8;

export default function BillSimulator() {
  const [monthlyBill, setMonthlyBill]   = useState(4000);
  const [systemKw,    setSystemKw]      = useState(5);
  const [rateIncrease,setRateIncrease]  = useState(5); // % annual electricity rate hike

  /* ── Year-by-year projection ── */
  const projection = useMemo(() => {
    const years = 25;
    const data  = [];
    let currentRate     = RATE_PER_UNIT;
    let withoutSolarBill = monthlyBill;

    for (let y = 1; y <= years; y++) {
      const degradation    = Math.pow(0.993, y); // 0.7% panel degradation/yr
      const annualGen      = MONTHS.reduce((sum, m) => sum + systemKw * m.sun * 30, 0) * degradation;
      const annualGenValue = annualGen * currentRate;
      const withoutSolar   = withoutSolarBill * 12;
      const withSolar      = Math.max(0, withoutSolar - annualGenValue);
      const saving         = withoutSolar - withSolar;

      data.push({
        year: y,
        withoutSolar: Math.round(withoutSolar),
        withSolar:    Math.round(withSolar),
        saving:       Math.round(saving),
        cumSaving:    data.length ? data[data.length - 1].cumSaving + Math.round(saving) : Math.round(saving),
      });

      currentRate      *= (1 + rateIncrease / 100);
      withoutSolarBill *= (1 + rateIncrease / 100);
    }
    return data;
  }, [monthlyBill, systemKw, rateIncrease]);

  /* Monthly breakdown (current year) */
  const monthlyData = useMemo(() => {
    return MONTHS.map(m => {
      const solarGen   = systemKw * m.sun * 30; // units
      const solarValue = solarGen * RATE_PER_UNIT;
      const before     = monthlyBill;
      const after      = Math.max(0, monthlyBill - solarValue);
      return { ...m, before: Math.round(before), after: Math.round(after), saving: Math.round(before - after) };
    });
  }, [monthlyBill, systemKw]);

  const totalLifetimeSaving = projection[projection.length - 1]?.cumSaving || 0;
  const avgMonthlySaving    = Math.round(projection[0]?.saving / 12) || 0;
  const maxBarVal           = Math.max(...monthlyData.map(m => m.before));

  return (
    <section className="section-pad bg-white">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Bill Simulator"
          title="Before & After Solar — Your Bill Over Time"
          subtitle="See exactly how your electricity bill changes month by month and year by year after going solar."
        />

        {/* ── Controls ── */}
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-6 mb-10 grid sm:grid-cols-3 gap-6">
          {/* Monthly Bill */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Monthly Bill</label>
              <span className="font-bold text-primary-600">₹{monthlyBill.toLocaleString()}</span>
            </div>
            <input type="range" min="500" max="30000" step="500" value={monthlyBill}
              onChange={e => setMonthlyBill(Number(e.target.value))}
              className="w-full accent-primary-600 cursor-pointer" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>₹500</span><span>₹30,000</span></div>
          </div>

          {/* System Size */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">System Size</label>
              <span className="font-bold text-primary-600">{systemKw} kW</span>
            </div>
            <input type="range" min="1" max="20" step="1" value={systemKw}
              onChange={e => setSystemKw(Number(e.target.value))}
              className="w-full accent-primary-600 cursor-pointer" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>1 kW</span><span>20 kW</span></div>
          </div>

          {/* Rate Hike */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Annual Rate Hike</label>
              <span className="font-bold text-primary-600">{rateIncrease}%/yr</span>
            </div>
            <input type="range" min="0" max="15" step="1" value={rateIncrease}
              onChange={e => setRateIncrease(Number(e.target.value))}
              className="w-full accent-primary-600 cursor-pointer" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>0%</span><span>15%</span></div>
          </div>
        </div>

        {/* ── Summary Cards ── */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: IndianRupee, color:'text-primary-600',  bg:'bg-primary-50',  label:'Avg Monthly Saving', value:`₹${avgMonthlySaving.toLocaleString()}` },
            { icon: TrendingDown,color:'text-green-600',    bg:'bg-green-50',    label:'Annual Saving (Yr 1)',value:`₹${(avgMonthlySaving*12).toLocaleString()}` },
            { icon: Calendar,   color:'text-solar-orange', bg:'bg-amber-50',    label:'25-Year Total Saving', value:`₹${(totalLifetimeSaving/100000).toFixed(1)}L` },
            { icon: Sun,        color:'text-yellow-600',   bg:'bg-yellow-50',   label:'System Payback',       value:`~${(Math.round(systemKw * 55000 * 0.7) / (avgMonthlySaving * 12 || 1)).toFixed(1)} yrs` },
          ].map(({ icon: Icon, color, bg, label, value }) => (
            <div key={label} className={`${bg} rounded-2xl p-4 text-center border border-white shadow-sm`}>
              <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</p>
              <p className={`font-bold text-lg ${color} mt-1`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Monthly Bar Chart ── */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            Month-by-Month Bill Comparison (Year 1)
          </h3>
          <div className="flex gap-1 items-end h-48 mb-3">
            {monthlyData.map(m => (
              <div key={m.name} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full flex flex-col justify-end gap-0.5" style={{ height: '160px' }}>
                  {/* Before bar */}
                  <div
                    className="w-full bg-red-200 rounded-t-sm relative group"
                    style={{ height: `${(m.before / maxBarVal) * 160}px` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Before: ₹{m.before.toLocaleString()}
                    </div>
                  </div>
                  {/* After bar */}
                  <div
                    className="w-full bg-primary-500 rounded-t-sm relative group -mt-px"
                    style={{ height: `${(m.after / maxBarVal) * 160}px`, marginTop: `-${(m.before / maxBarVal) * 160}px`, opacity: 0.85 }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      After: ₹{m.after.toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 mt-1">{m.name}</span>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex gap-4 justify-center text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-200 inline-block" /> Without Solar</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary-500 inline-block" /> With Solar</span>
          </div>
        </div>

        {/* ── 25-Year Projection Table (first 10 rows) ── */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-primary-600" />
            Long-Term Savings Projection
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Year','Without Solar (Annual)','With Solar (Annual)','Annual Saving','Cumulative Saving'].map(h => (
                  <th key={h} className="text-left pb-2 text-xs font-semibold text-gray-400 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projection.slice(0, 10).map(row => (
                <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 pr-4 font-semibold text-gray-600">Year {row.year}</td>
                  <td className="py-2.5 pr-4 text-red-500">₹{row.withoutSolar.toLocaleString()}</td>
                  <td className="py-2.5 pr-4 text-primary-600">₹{row.withSolar.toLocaleString()}</td>
                  <td className="py-2.5 pr-4 font-semibold text-green-600">₹{row.saving.toLocaleString()}</td>
                  <td className="py-2.5 font-bold text-gray-900">₹{row.cumSaving.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-primary-50">
                <td className="py-3 pr-4 font-bold text-primary-700" colSpan={4}>Total 25-Year Savings</td>
                <td className="py-3 font-bold text-xl text-primary-700">₹{totalLifetimeSaving.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="text-center">
          <Link to="/contact">
            <button className="btn-primary inline-flex items-center gap-2">
              <Zap className="w-5 h-5" /> Get My Personalised Report
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <p className="text-xs text-gray-400 mt-3">* Estimates based on average Indian electricity rates and solar conditions. Actual savings may vary.</p>
        </div>
      </div>
    </section>
  );
}
