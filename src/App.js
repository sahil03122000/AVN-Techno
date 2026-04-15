import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot        from './components/Chatbot';
import LeadPopup      from './components/LeadPopup';

import Home      from './pages/Home';
import About     from './pages/About';
import Services  from './pages/Services';
import Projects  from './pages/Projects';
import Contact   from './pages/Contact';
import Tools     from './pages/Tools';
import GetQuote  from './pages/GetQuote';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            <Route path="/services"  element={<Services />} />
            <Route path="/projects"  element={<Projects />} />
            <Route path="/tools"     element={<Tools />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/get-quote" element={<GetQuote />} />
          </Routes>
        </main>
        <Footer />
        {/* <WhatsAppButton /> */}
        {/* <Chatbot /> */}
        {/* <LeadPopup /> */}
      </div>
    </Router>
  );
}
