'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import gsap from 'gsap';

export default function ContactClient() {
  const t = useTranslations('Contact');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subject, setSubject] = React.useState('general');
  const pageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-fade', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div ref={pageRef} className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-7xl">
        <header className="mb-20 stagger-fade">
          <span className="font-sans text-sm font-bold uppercase text-orange tracking-[0.3em] block mb-6">
            {t('overline')}
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-black uppercase text-ink tracking-tighter mb-6 leading-[0.85]">
            {t('title')} <br /><span className="text-gold italic">HQ</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Form Side */}
          <div className="stagger-fade bg-vintage border-2 border-ink p-8 md:p-12 shadow-[12px_12px_0_0_#1A1A1A]">
            <h2 className="text-3xl font-sans font-black uppercase tracking-tight mb-8">
              {t('formTitle')}
            </h2>

            {status === 'success' ? (
              <div className="bg-gold border-2 border-ink p-8 font-sans font-black uppercase text-xl text-center shadow-[4px_4px_0_0_#1A1A1A]">
                {t('success')}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-sans text-xs font-black uppercase mb-2 text-ink/60">
                      {t('nameLabel')}
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-cream border-2 border-ink/10 px-4 py-4 font-sans focus:outline-none focus:border-gold transition-colors text-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-sans text-xs font-black uppercase mb-2 text-ink/60">
                      {t('emailLabel')}
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-cream border-2 border-ink/10 px-4 py-4 font-sans focus:outline-none focus:border-gold transition-colors text-lg"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block font-sans text-xs font-black uppercase mb-2 text-ink/60">
                    {t('subjectLabel')}
                  </label>
                  <select
                    required
                    id="subject-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-cream border-2 border-ink/10 px-4 py-4 font-sans focus:outline-none focus:border-gold transition-colors appearance-none rounded-none text-lg"
                  >
                    <option value="general">{t('subjects.general')}</option>
                    <option value="other">{t('subjects.other')}</option>
                  </select>
                </div>
                {subject === 'other' && (
                  <div className="stagger-fade">
                    <label htmlFor="custom-subject" className="block font-sans text-xs font-black uppercase mb-2 text-ink/60">
                      {t('subjectLabel')}
                    </label>
                    <input
                      required
                      type="text"
                      id="custom-subject"
                      name="subject"
                      placeholder={t('subjects.other')}
                      className="w-full bg-cream border-2 border-ink px-4 py-4 font-sans focus:outline-none focus:border-gold transition-colors text-lg"
                    />
                  </div>
                )}
                <input type="hidden" name="subject" value={subject === 'other' ? '' : subject} disabled={subject === 'other'} />
                <div>
                  <label htmlFor="message" className="block font-sans text-xs font-black uppercase mb-2 text-ink/60">
                    {t('messageLabel')}
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full bg-cream border-2 border-ink/10 px-4 py-4 font-sans focus:outline-none focus:border-gold transition-colors resize-none text-lg"
                  ></textarea>
                </div>
                <div className="pt-4">
                  <Button type="submit" variant="brutalist" size="lg" className="w-full py-6 text-xl" disabled={status === 'loading'}>
                    {status === 'loading' ? t('sending') : t('sendButton')}
                  </Button>
                </div>

                {status === 'error' && (
                  <p className="text-orange font-sans font-black text-center mt-2 uppercase tracking-tight">
                    {t('error')}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="flex flex-col stagger-fade">
            <h2 className="text-3xl font-sans font-black uppercase tracking-tight mb-8">
              {t('hq')}
            </h2>

            <address className="not-italic font-serif text-ink/80 text-2xl space-y-2 mb-12 border-l-8 border-gold pl-8 py-4 bg-ink/5">
              <p className="font-sans font-black uppercase text-ink/40 text-xs tracking-[0.2em] mb-4">
                {t('addressTitle')}
              </p>
              <p className="text-ink font-black uppercase font-sans">Supporter FC Meilen</p>
              <p>Sportzentrum Allmend</p>
              <p>Burgstrasse 160, 8706 Meilen,</p>
              <p>Switzerland</p>
              <p className="pt-6">
                <a href="mailto:supporter@fcmeilen.ch" className="text-ink font-sans font-black uppercase text-sm hover:text-orange transition-all border-b-4 border-gold hover:border-orange pb-1">
                  supporter@fcmeilen.ch
                </a>
              </p>
            </address>

            {/* Stadium Map Embed */}
            <div className="w-full aspect-video border-2 border-ink shadow-[12px_12px_0_0_#D4AF37] relative overflow-hidden bg-ink/5 stagger-fade">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1gc_f12m0l_DYzd89caIREN_cMJE&femb=1&ll=47.27228291027119%2C8.65106599076829&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125"
                title="Meilen Stadium Map"
              ></iframe>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}
