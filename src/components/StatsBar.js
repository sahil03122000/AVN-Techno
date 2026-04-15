import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 1200, suffix: '+', label: 'Installations Done' },
  { value: 15,   suffix: '+', label: 'Years Experience' },
  { value: 98,   suffix: '%', label: 'Customer Satisfaction' },
  { value: 50,   suffix: 'MW', label: 'Solar Capacity Installed' },
];

function AnimatedCounter({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let current  = 0;
    const steps  = 60;
    const increment = target / steps;
    const timer  = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  );
}

export default function StatsBar() {
  const [active, setActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          {stats.map(stat => (
            <div key={stat.label} className="space-y-1">
              <div className="font-display text-4xl font-bold text-solar-yellow">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} active={active} />
              </div>
              <p className="text-primary-100 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
