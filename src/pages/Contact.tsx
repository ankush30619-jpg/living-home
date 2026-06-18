/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, ChangeEvent } from 'react';
import { Page, ContactForm } from '../types';
import { IMAGES } from '../data';
import { 
  Phone, Mail, MessageSquare, Compass, ShieldCheck, CheckCircle2, 
  MapPin, Clock, CalendarDays, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleCanvasBg } from '../components/ui/particle-canvas-bg';

interface ContactProps {
  setCurrentPage: (page: Page) => void;
}

export default function Contact({ setCurrentPage }: ContactProps) {
  const [formData, setFormData] = useState<ContactForm>({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Architecture',
    city: '',
    budget: 'Prefer to discuss',
    description: '',
    source: 'Instagram'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successName, setSuccessName] = useState('');

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.phone.trim() && formData.email.trim()) {
      setSuccessName(formData.fullName);
      setFormSubmitted(true);
      // Reset
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        projectType: 'Architecture',
        city: '',
        budget: 'Prefer to discuss',
        description: '',
        source: 'Instagram'
      });
    }
  };

  const faqs = [
    {
      q: 'Is the first discovery consultation really free?',
      a: 'Absolutely. We believe that a mutual trust fit is fundamental to high-end builds. Your 30-minute discovery chat with principal Kabir is completely free, with absolutely zero pressure.'
    },
    {
      q: 'What should I prepare for the discovery consultation?',
      a: 'Just your raw architectural floor plans if you have them, basic coordinate layouts, and any inspiration pictures about decor details or mood preferences. We handle all technical mapping from there.'
    },
    {
      q: 'How soon can on-site work typically begin?',
      a: 'Following draft blueprint approvals, cost-sheet validations, and contracts signing, we typically stage site coordinators, safety nets, and materials procurement within 2 to 4 weeks.'
    },
    {
      q: 'Can I book a Vastu service separately?',
      a: 'Yes, our Vastu energy mapping and remedy guides can be purchased as completely standalone services. You do not need to sign a full architectural contract to get a Vastu plot audit.'
    }
  ];

  return (
    <div className="w-full relative">
      {/* Gold particle canvas — page background layer */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <ParticleCanvasBg />
      </div>
      {/* 1. SEPARATED SPLIT HERO */}
      <section className="relative h-auto min-h-[55vh] w-full flex flex-col lg:flex-row z-10 select-none">
        {/* Left deep-navy contact parameters pane */}
        <div className="w-full lg:w-1/2 bg-navy text-ivory p-8 md:p-16 flex flex-col justify-center items-start gap-4 pt-28">
          <div className="flex items-center gap-2">
            <span className="h-[1.5px] w-8 bg-gold pointer-events-none" />
            <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-bold">START PROJECT JOURNEY</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight font-light text-[#F8F6F2]">
            Your Dream Space <span className="text-gold italic block">Starts With Hello</span>
          </h1>
          <p className="text-xs text-beige/70 font-sans font-light max-w-sm leading-relaxed">
            Ready to design your bespoke estate? Choose your communication channel or submit our premium onboarding form.
          </p>

          <hr className="w-12 border-gold/15 my-1" />

          {/* Quick contacts parameters list */}
          <div className="flex flex-col gap-4 mt-1 font-sans text-xs">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center text-gold">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <a href="tel:+911234567890" className="text-[#F8F6F2] hover:text-gold transition-colors font-medium">
                +91 12345 67890 &nbsp; (Private Line)
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center text-gold">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <a href="mailto:hello@livinghomestudio.com" className="text-[#F8F6F2] hover:text-gold transition-colors font-medium">
                hello@livinghomestudio.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center text-gold">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <p className="text-beige/90 leading-relaxed font-light">
                Ahmedabad Studio HQ: S.G. Highway, imperial Enclave, Gujarat.
              </p>
            </div>
          </div>
        </div>

        {/* Right gorgeous visual mockup panel */}
        <div className="w-full lg:w-1/2 h-[300px] lg:h-auto min-h-[55vh] relative overflow-hidden flex items-end justify-start p-8 md:p-12">
          <img
            src={IMAGES.statuarioLiving}
            alt="Luxury modern foyer design"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle overlay frame */}
          <div className="absolute inset-4 border border-white/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          
          <div className="relative z-10 text-white max-w-sm flex flex-col gap-1.5 text-left select-none">
            <span className="text-[8px] text-gold font-display uppercase tracking-widest font-semibold">Ahmedabad Showroom</span>
            <h4 className="font-serif text-xl md:text-2xl tracking-wide font-light">Book a Private Gallery Tour</h4>
            <p className="text-[10px] text-zinc-300 font-sans font-light">
              Walk-ins of select stone slabs and walnut library joinery are staging daily. Schedule space in calendar.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ONBOARDING FORM AND CHECKLIST PANEL */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form box */}
          <div className="lg:col-span-7 bg-white border border-gold/15 p-6 md:p-10 shadow-lg relative rounded-sm">
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="onboarding-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="border-b border-gold/10 pb-4 mb-2">
                    <span className="text-[10px] text-gold font-display uppercase tracking-widest block font-bold mb-1">AUDITED FORM</span>
                    <h3 className="font-serif text-2xl md:text-3xl tracking-wide font-medium text-navy">Schedule Your Free Discovery Session</h3>
                  </div>

                  {/* Field blocks (Bottom-border only) */}
                  <div className="flex flex-col gap-5">
                    
                    {/* Full Name field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-display uppercase tracking-widest text-[#2D2D2D]/60 font-semibold">Full Name*</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleValueChange}
                        placeholder="e.g., Kabir Dev Sanghavi"
                        className="w-full bg-transparent border-b border-beige focus:border-gold text-navy placeholder-zinc-300 focus:outline-none pb-2 font-sans text-xs"
                      />
                    </div>

                    {/* Dual row (Email & Phone) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-display uppercase tracking-widest text-[#2D2D2D]/60 font-semibold">Email Address*</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleValueChange}
                          placeholder="e.g., dev@domain.com"
                          className="w-full bg-transparent border-b border-beige focus:border-gold text-navy placeholder-zinc-300 focus:outline-none pb-2 font-sans text-xs"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-display uppercase tracking-widest text-[#2D2D2D]/60 font-semibold">Phone Number*</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleValueChange}
                          placeholder="e.g., +91 / +971"
                          className="w-full bg-transparent border-b border-beige focus:border-gold text-navy placeholder-zinc-300 focus:outline-none pb-2 font-sans text-xs"
                        />
                      </div>
                    </div>

                    {/* Dual row (Project Type & City) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-display uppercase tracking-widest text-[#2D2D2D]/60 font-semibold">Project Stream*</label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleValueChange}
                          className="w-full bg-transparent border-b border-beige focus:border-gold text-navy focus:outline-none pb-2 font-sans text-xs cursor-pointer capitalize"
                        >
                          <option value="Architecture">Villa Architecture</option>
                          <option value="Interior Design">Luxury Interior Staging</option>
                          <option value="Vastu Consultancy">Scientific Vastu Audit</option>
                          <option value="Turnkey Solution">Turnkey Handover</option>
                          <option value="Farm Space">Earthy Farm Estate</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-display uppercase tracking-widest text-[#2D2D2D]/60 font-semibold">Target Location City*</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleValueChange}
                          placeholder="e.g., Ahmedabad / Pune"
                          className="w-full bg-transparent border-b border-beige focus:border-gold text-navy placeholder-zinc-300 focus:outline-none pb-2 font-sans text-xs"
                        />
                      </div>
                    </div>

                    {/* Dual row (Budget & Referral) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-display uppercase tracking-widest text-[#2D2D2D]/60 font-semibold">Approx Budget Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleValueChange}
                          className="w-full bg-transparent border-b border-beige focus:border-gold text-navy focus:outline-none pb-2 font-sans text-xs cursor-pointer"
                        >
                          <option value="Under ₹15L">Under ₹15 Lakhs</option>
                          <option value="₹15L–50L">₹15 – ₹50 Lakhs</option>
                          <option value="₹50L–1Cr">₹50 Lakhs – ₹1 Crore</option>
                          <option value="₹1Cr+">₹1 Crore+ (Luxury Villa)</option>
                          <option value="Prefer to discuss">Prefer to discuss in call</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-display uppercase tracking-widest text-[#2D2D2D]/60 font-semibold">How did you locate us?</label>
                        <select
                          name="source"
                          value={formData.source}
                          onChange={handleValueChange}
                          className="w-full bg-transparent border-b border-beige focus:border-gold text-navy focus:outline-none pb-2 font-sans text-xs cursor-pointer"
                        >
                          <option value="Instagram">Instagram Showcase</option>
                          <option value="Google">Google Search</option>
                          <option value="Referral">Family Referral</option>
                          <option value="Other">Bespoke Press</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Description (Textarea) */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <label className="text-[9px] font-display uppercase tracking-widest text-[#2D2D2D]/60 font-semibold">Project Notes &amp; Routine requirements</label>
                      <textarea
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleValueChange}
                        placeholder="Tell us about your plot coordinates, sloped hills requirements, specific room layout count, or Vastu queries..."
                        className="w-full bg-transparent border-b border-beige focus:border-gold text-navy placeholder-zinc-300 focus:outline-none pb-2 font-sans text-xs resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-navy text-navy hover:text-gold text-xs font-sans font-bold uppercase tracking-[0.15em] py-4 rounded-sm transition-all shadow-md mt-4 cursor-pointer"
                  >
                    Submit Booking Form
                  </button>
                </motion.form>
              ) : (
                /* Success Animated Checked State */
                <motion.div
                  key="form-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-10 gap-6 select-none"
                >
                  {/* Big pulsing checkmark */}
                  <div className="h-20 w-20 rounded-full bg-gold/15 flex items-center justify-center border-2 border-gold text-gold relative shadow-lg">
                    <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping" />
                    <CheckCircle2 className="w-10 h-10 shrink-0" />
                  </div>

                  <div className="flex flex-col gap-2 max-w-sm">
                    <h3 className="font-serif text-3xl text-navy">Thank You, {successName.split(' ')[0]}!</h3>
                    <p className="text-[11px] text-zinc-500 font-sans tracking-wide">
                      Our senior architectural curators have registered your coordinates successfully.
                    </p>
                  </div>

                  <hr className="w-16 border-gold/10" />

                  {/* Onboarding schedules detail card */}
                  <div className="flex items-start gap-3 bg-ivory border border-gold/20 p-5 rounded-sm max-w-md w-full text-left font-sans text-xs">
                    <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5 animate-pulse" />
                    <div className="flex flex-col gap-1 text-slate-700 leading-normal">
                      <p className="font-bold text-navy uppercase tracking-wider text-[10px]">What Happens Next?</p>
                      <p className="font-light">1. A confirmation email with scheduling portals has been dispatched.</p>
                      <p className="font-light">2. Kabir Dev Mehta will call your private line within 12 business hours.</p>
                      <p className="font-light">3. We coordinate a complimentary 30-min Zoom to outline plot concepts.</p>
                    </div>
                  </div>

                  {/* Add to Calendar custom action button */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        alert("Onboarding slot registered on local device calendar successfully.");
                      }}
                      className="bg-gold hover:bg-navy text-navy hover:text-gold text-[10px] font-sans font-bold uppercase tracking-widest py-3 px-6 rounded-sm transition-all shadow"
                    >
                      ✓ Add Consult To Calendar
                    </button>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="border border-navy text-navy hover:bg-navy hover:text-white text-[10px] font-sans font-bold uppercase tracking-widest py-3 px-6 rounded-sm transition-all"
                    >
                      Fill Another Request
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Panel: Walkthrough checklists explanation */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left bg-navy text-ivory p-8 md:p-10 border border-gold/20 shadow-xl rounded-sm relative selection:bg-gold selection:text-navy lg:sticky lg:top-24 select-none">
            <h4 className="font-serif text-2xl text-[#F8F6F2] pl-1 tracking-wide">The Onboarding Stage</h4>
            <div className="h-[1.5px] w-12 bg-gold mt-1 pl-1" />
            
            <div className="flex flex-col gap-6 mt-2 font-sans text-xs leading-relaxed font-light text-beige">
              
              {/* Bullet 1 */}
              <div className="flex gap-4">
                <div className="h-7 w-7 rounded-full bg-gold/10 border border-gold flex items-center justify-center shrink-0 mt-0.5 text-gold text-[10px] font-mono font-bold">1</div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Zero-obligation Discovery</p>
                  <p>A simple listening call to details target deadlines, routine layouts, budget and sloped hills. No contracts.</p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex gap-4">
                <div className="h-7 w-7 rounded-full bg-gold/10 border border-gold flex items-center justify-center shrink-0 mt-0.5 text-gold text-[10px] font-mono font-bold">2</div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Aesthetic Pre-Drafting</p>
                  <p>We craft complimentary initial mood boards and coordinate layouts before demanding structural retainer fees.</p>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className="flex gap-4">
                <div className="h-7 w-7 rounded-full bg-gold/10 border border-gold flex items-center justify-center shrink-0 mt-0.5 text-gold text-[10px] font-mono font-bold">3</div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Fluid Supervisory Portal</p>
                  <p>Upon final approvals, you review blueprints updates, Gantt milestones, and live camera coordinates instantly.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. QUICK faq SECTION (4 simple cards grid) */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col gap-1 max-w-md mx-auto">
            <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-semibold">QUICK RESOLUTIONS</span>
            <h2 className="font-serif text-3xl text-navy">Quick Answers FAQ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border-l-4 border-gold p-6 flex flex-col gap-3 shadow-sm select-none">
                <h4 className="font-serif text-lg font-bold text-navy leading-snug">{faq.q}</h4>
                <p className="text-zinc-500 font-light leading-relaxed font-sans">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROMINENT WhatsApp CTA STRIP */}
      <section className="py-16 bg-navy text-ivory text-center px-4 relative z-10 select-none selections:bg-gold selections:text-navy">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <Compass className="w-10 h-10 text-gold animate-[spin_60s_linear_infinite]" />
          <h2 className="font-serif text-3xl md:text-4xl text-[#F8F6F2] tracking-wide font-light">Prefer To Chat First?</h2>
          <p className="text-xs text-beige/70 font-sans max-w-sm leading-relaxed">
            Message us directly on secure WhatsApp line wa.me. Or coordinate queries directly with our supervisors within 30 minutes.
          </p>
          <a
            href="https://wa.me/911234567890?text=Hi%2C%20I'd%20love%20to%20discuss%20a%20project%20with%20Living%20Home%20Design%20Studio."
            target="_blank"
            rel="noreferrer"
            className="mt-2 bg-[#25D366] hover:bg-white text-white hover:text-[#25D366] text-xs font-sans font-bold uppercase tracking-[0.15em] py-4 px-10 rounded-sm transition-all flex items-center justify-center gap-2.5 shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-white hover:text-[#25D366] shrink-0" />
            <span>Chat on WhatsApp &nbsp; +91 12345 67890</span>
          </a>
        </div>
      </section>
    </div>
  );
}
