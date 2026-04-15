import React from 'react';

/**
 * SectionHeader — reusable section title block
 * @param {string} eyebrow  - small label above title
 * @param {string} title    - main heading
 * @param {string} subtitle - optional paragraph below
 * @param {string} align    - 'center' | 'left'
 */
export default function SectionHeader({ eyebrow, title, subtitle, align = 'center' }) {
  const isCenter = align === 'center';
  return (
    <div className={`mb-12 ${isCenter ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-gray-500 text-lg leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
