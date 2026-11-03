'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function JoinClient() {
  const t = useTranslations('JoinPage');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/join', {
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
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Info */}
          <div>
            <span className="font-sans text-xs font-bold uppercase text-orange tracking-widest block mb-6">
              {t('overline')}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-black uppercase text-ink tracking-tight leading-[0.9] mb-8">
              {t('title')} <span className="text-gold">{t('titleHighlight')}</span>
            </h1>
            <p className="font-serif text-xl text-ink/70 italic leading-relaxed mb-12">
              {t('subtitle')}
            </p>

            <div className="space-y-8 mt-12">
              <div className="border border-ink p-6 bg-vintage">
                <h3 className="font-sans text-xl font-bold uppercase mb-2 text-ink">{t('standardTitle')}</h3>
                <p className="font-serif text-ink/70">{t('standardDesc')}</p>
              </div>
              <div className="border border-ink p-6 bg-ink text-vintage">
                <h3 className="font-sans text-xl font-bold uppercase mb-2 text-gold">{t('lifetimeTitle')}</h3>
                <p className="font-serif text-vintage/70">{t('lifetimeDesc')}</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-vintage border border-ink p-8 md:p-12 relative shadow-[8px_8px_0_0_#0B0C10]">
            <h2 className="text-3xl font-sans font-black uppercase tracking-tight mb-8">{t('formTitle')}</h2>

            {status === 'success' ? (
              <div className="bg-green-50 border-2 border-green-800 text-green-900 p-8 font-sans space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-green-900">{t('successTitle')}</h3>
                <p className="text-lg font-bold text-green-800">{t('successWelcome')}</p>
                <p className="font-serif text-green-800 italic">{t('successBody')}</p>
                <p className="font-serif text-green-800 italic">{t('successBody2')}</p>
                <p className="font-serif text-green-800 italic">{t('successBody3')}</p>
                <p className="font-serif text-green-800 italic font-semibold">{t('successBody4')}</p>
                <div className="pt-4 border-t border-green-800/20">
                  <p className="font-sans text-sm font-bold uppercase text-green-800">{t('successSignoff')}</p>
                  <p className="font-sans text-sm font-bold text-green-800">{t('successFrom')}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="name" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">{t('nameLabel')}</label>
                  <input required type="text" id="name" name="name" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">{t('emailLabel')}</label>
                  <input required type="email" id="email" name="email" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">{t('phoneLabel')}</label>
                  <input type="tel" id="phone" name="phone" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                </div>
                <div>
                  <label htmlFor="address" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">{t('addressLabel')}</label>
                  <input required type="text" id="address" name="address" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                </div>
                <div>
                  <label htmlFor="level" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">{t('levelLabel')}</label>
                  <select required id="level" name="level" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors appearance-none rounded-none">
                    <option value="standard">{t('standardOption')}</option>
                    <option value="lifetime">{t('lifetimeOption')}</option>
                  </select>
                </div>
                <div className="pt-4">
                  <Button type="submit" variant="brutalist" size="lg" className="w-full text-lg" disabled={status === 'loading'}>
                    {status === 'loading' ? t('submitting') : t('submitButton')}
                  </Button>
                </div>

                {status === 'error' && (
                  <p className="text-red-600 font-sans text-sm font-bold text-center mt-2 uppercase">{t('error')}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
