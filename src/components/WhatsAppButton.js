import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true);
  const phone   = '919876543210'; // Replace with actual WhatsApp number
  const message = encodeURIComponent('Hello AVN Techno! I\'m interested in solar installation. Can you help me?');
  const href    = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {tooltip && (
        <div className="relative bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 animate-fade-up border border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Chat with us!</p>
          <button
            onClick={() => setTooltip(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close tooltip"
          >
            <X className="w-4 h-4" />
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
        </div>
      )}

      {/* WhatsApp Circle Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-btn w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        onClick={() => setTooltip(false)}
      >
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.369.637 4.587 1.746 6.497L2.667 29.333l7.065-1.729A13.27 13.27 0 0016.004 29.333C23.368 29.333 29.333 23.364 29.333 16S23.368 2.667 16.004 2.667zm0 2.133c6.178 0 11.196 5.018 11.196 11.2 0 6.178-5.018 11.196-11.196 11.196a11.16 11.16 0 01-5.62-1.517l-.403-.24-4.193 1.026 1.062-4.07-.264-.418A11.147 11.147 0 014.8 16c0-6.182 5.022-11.2 11.204-11.2zm-3.254 5.6c-.214 0-.561.08-.855.4-.293.32-1.12 1.094-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.24 3.52 5.494 4.8 2.72 1.072 3.254.858 3.84.805.587-.053 1.894-.773 2.16-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.614-.373-.32-.16-1.893-.933-2.186-1.04-.294-.107-.507-.16-.72.16-.214.32-.827 1.04-.987 1.253-.16.214-.32.24-.64.08-.32-.16-1.35-.498-2.573-1.59-.95-.85-1.59-1.9-1.777-2.22-.187-.32-.02-.494.14-.653.144-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.693-1.747-.973-2.387-.267-.614-.547-.52-.72-.52z"/>
        </svg>
      </a>
    </div>
  );
}
