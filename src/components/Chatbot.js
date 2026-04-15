import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

/* ── Quick reply suggestion chips ── */
const SUGGESTIONS = [
  'What is the cost of solar?',
  'How much can I save?',
  'What subsidy is available?',
  'How long does installation take?',
  'Do you offer EMI?',
];

/* ── Static FAQ bot responses (instant, no API needed) ── */
const BOT_RULES = [
  { keys: ['cost', 'price', 'charges', 'how much'],
    reply: '💰 Residential solar systems typically start from **₹45,000** (after subsidy) for a 1 kW system. A 3–5 kW system for an average home costs ₹1.2 – ₹2.5 lakhs after government subsidy. Would you like a **free custom quote**? Just share your monthly electricity bill amount!' },
  { keys: ['subsidy', 'government', 'scheme', 'pm surya'],
    reply: '🏛️ Under **PM Surya Ghar Muft Bijli Yojana**, you get:\n• **40% subsidy** on systems up to 3 kW\n• **20% subsidy** on 3–10 kW\n\nWe handle the entire subsidy paperwork for you — zero hassle!' },
  { keys: ['save', 'saving', 'bill', 'electricity'],
    reply: '⚡ With solar, most homes save **70–100% on electricity bills**. For example, if your bill is ₹5,000/month, you could save **₹4,000–₹5,000 every month** — that\'s ₹60,000 per year! Use our **Solar Savings Calculator** on this page to get your exact savings.' },
  { keys: ['emi', 'loan', 'finance', 'payment'],
    reply: '🏦 Yes! We offer flexible financing options:\n• **0% interest EMI** for 12–24 months\n• Bank loans at 7–9% interest\n• NABARD & SBI solar loan schemes\n\nWith EMI, your monthly payment is often **less than your current electricity bill!**' },
  { keys: ['install', 'time', 'days', 'how long', 'duration'],
    reply: '🔧 Installation timeline:\n• **Site survey**: 1 day (free)\n• **Permits & approvals**: 3–7 days\n• **Installation**: 1–3 days\n• **Grid connection**: 3–5 days\n\nTotal: Most homes go live within **2–3 weeks** of order confirmation.' },
  { keys: ['warranty', 'guarantee', 'guarantee'],
    reply: '🛡️ AVN Techno provides:\n• **25-year** performance warranty on solar panels\n• **10-year** workmanship guarantee\n• **5-year** inverter warranty\n• **1-year** free maintenance\n\nAll backed by our ISO 9001:2015 certification.' },
  { keys: ['maintenance', 'amc', 'service', 'cleaning'],
    reply: '🔧 Solar panels need very little maintenance! We offer:\n• **Annual Maintenance Contracts (AMC)** from ₹3,500/year\n• Quarterly cleaning & inspection\n• 24/7 remote monitoring\n• Priority breakdown support\n\nShall I connect you with our service team?' },
  { keys: ['contact', 'call', 'phone', 'reach', 'speak'],
    reply: '📞 You can reach us at:\n• **Phone**: +91 12345 67890\n• **Email**: info@avntechno.in\n• **WhatsApp**: Click the green button on screen\n• **Office hours**: Mon–Sat, 9 AM – 7 PM\n\nOr **book a free site visit** using the Appointment Booking form on this page!' },
  { keys: ['commercial', 'factory', 'office', 'business', 'industry'],
    reply: '🏭 For commercial projects, we offer:\n• Systems from **20 kW to 10 MW+**\n• **Accelerated depreciation** tax benefit (40%)\n• Power Purchase Agreements (PPA)\n• SCADA & remote monitoring\n• Dedicated project manager\n\nCommercial ROI is typically **2–4 years**. Want a detailed proposal?' },
  { keys: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon'],
    reply: '👋 Hello! Welcome to **AVN Techno**! I\'m your solar assistant.\n\nI can help you with:\n• Solar cost & savings estimates\n• Government subsidies\n• Installation process\n• Financing options\n\nWhat would you like to know?' },
];

function getBotReply(userMsg) {
  const msg = userMsg.toLowerCase();
  for (const rule of BOT_RULES) {
    if (rule.keys.some(k => msg.includes(k))) return rule.reply;
  }
  return "🤔 Great question! For a precise answer, our solar expert can help you best.\n\n📞 **Call us**: +91 12345 67890\n📅 **Book a free consultation** using the form on this page.\n\nIs there anything else I can help you with?";
}

/* ── Render markdown-lite (bold + newlines) ── */
function FormattedText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part.split('\n').map((line, j, arr) => (
              <React.Fragment key={`${i}-${j}`}>
                {line}{j < arr.length - 1 && <br />}
              </React.Fragment>
            ))
      )}
    </span>
  );
}

export default function Chatbot() {
  const [open,      setOpen]      = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input,     setInput]     = useState('');
  const [messages,  setMessages]  = useState([
    { from: 'bot', text: "👋 Hi! I'm **Surya**, your AVN Techno solar assistant.\n\nAsk me anything about solar panels, costs, subsidies, or installation!", time: new Date() }
  ]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();
  const inputRef  = useRef();

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  /* Focus input when opened */
  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, minimized]);

  const sendMessage = (text) => {
    const userText = (text || input).trim();
    if (!userText) return;
    setInput('');

    const userMsg = { from: 'user', text: userText, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    /* Simulate bot thinking delay */
    setTimeout(() => {
      const reply = getBotReply(userText);
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: reply, time: new Date() }]);
    }, 900 + Math.random() * 600);
  };

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const fmt = date => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* ── Floating toggle button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-200 animate-pulse-glow"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          {/* Unread dot */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-solar-yellow rounded-full border-2 border-white text-[9px] font-bold text-gray-900 flex items-center justify-center">1</span>
        </button>
      )}

      {/* ── Chat window ── */}
      {open && (
        <div
          className={`fixed right-4 z-50 w-[350px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300
            ${minimized ? 'bottom-6 h-16' : 'bottom-6 h-[520px]'}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-primary-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">Surya — Solar Assistant</p>
              <p className="text-primary-200 text-xs">Usually replies instantly</p>
            </div>
            <button onClick={() => setMinimized(!minimized)} className="text-white/70 hover:text-white p-1" aria-label="Minimize">
              {minimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1
                      ${msg.from === 'bot' ? 'bg-primary-100' : 'bg-solar-yellow'}`}>
                      {msg.from === 'bot'
                        ? <Bot  className="w-4 h-4 text-primary-600" />
                        : <User className="w-4 h-4 text-gray-700" />}
                    </div>
                    {/* Bubble */}
                    <div className={`max-w-[75%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                        ${msg.from === 'bot'
                          ? 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
                          : 'bg-primary-600 text-white rounded-tr-sm'}`}>
                        <FormattedText text={msg.text} />
                      </div>
                      <span className="text-[10px] text-gray-400 px-1">{fmt(msg.time)}</span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                      {[0,1,2].map(i => (
                        <span key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="shrink-0 text-xs font-medium text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors whitespace-nowrap"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-3 py-3 bg-white border-t border-gray-100 flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type your question…"
                  className="flex-1 resize-none px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 bg-gray-50 max-h-24"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || typing}
                  className="w-10 h-10 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
