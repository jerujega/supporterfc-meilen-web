'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from './Button';

interface OrderFormProps {
    productName: string;
    productPrice: number;
}

export function OrderForm({ productName, productPrice }: OrderFormProps) {
    const t = useTranslations('MerchDetail');
    const [showForm, setShowForm] = React.useState(false);
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            productName,
            productPrice,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            size: formData.get('size'),
            address: formData.get('address'),
        };

        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to submit order');

            setStatus('success');
            form.reset();
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (!showForm) {
        return (
            <Button
                onClick={() => setShowForm(true)}
                variant="brutalist"
                size="lg"
                className="w-full text-lg h-16 shadow-[8px_8px_0_0_#0B0C10] group uppercase"
            >
                {t('buyNow')}
            </Button>
        );
    }

    return (
        <div className="bg-white border-2 border-ink p-6 md:p-8 shadow-[8px_8px_0_0_#0B0C10]">
            <h3 className="font-sans font-black text-2xl uppercase mb-6">{t('orderFormTitle')}</h3>

            {status === 'success' ? (
                <div className="bg-green-100 border border-green-500 text-green-800 p-4 font-sans mb-4">
                    <p className="font-bold">{t('success')}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {status === 'error' && (
                        <div className="bg-red-100 border border-red-500 text-red-800 p-4 font-sans">
                            <p className="font-bold">{t('error')}</p>
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block font-sans font-bold text-sm uppercase mb-2">{t('nameLabel')}</label>
                        <input required type="text" id="name" name="name" className="w-full border-2 border-ink/20 p-3 bg-vintage focus:border-orange focus:outline-none transition-colors" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-sans font-bold text-sm uppercase mb-2">{t('emailLabel')}</label>
                        <input required type="email" id="email" name="email" className="w-full border-2 border-ink/20 p-3 bg-vintage focus:border-orange focus:outline-none transition-colors" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="phone" className="block font-sans font-bold text-sm uppercase mb-2">{t('phoneLabel')}</label>
                            <input type="tel" id="phone" name="phone" className="w-full border-2 border-ink/20 p-3 bg-vintage focus:border-orange focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="size" className="block font-sans font-bold text-sm uppercase mb-2">{t('sizeLabel')}</label>
                            <select id="size" name="size" className="w-full border-2 border-ink/20 p-3 bg-vintage focus:border-orange focus:outline-none transition-colors appearance-none cursor-pointer">
                                <option value="One Size">{t('sizeOneSize')}</option>
                                <option value="S">{t('sizeS')}</option>
                                <option value="M">{t('sizeM')}</option>
                                <option value="L">{t('sizeL')}</option>
                                <option value="XL">{t('sizeXL')}</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block font-sans font-bold text-sm uppercase mb-2">{t('addressLabel')}</label>
                        <textarea required id="address" name="address" rows={3} className="w-full border-2 border-ink/20 p-3 bg-vintage focus:border-orange focus:outline-none transition-colors resize-none"></textarea>
                    </div>

                    <Button
                        type="submit"
                        variant="brutalist"
                        className="w-full h-14 mt-4 bg-orange text-white hover:bg-ink shadow-[4px_4px_0_0_#0B0C10]"
                        disabled={status === 'submitting'}
                    >
                        {status === 'submitting' ? t('submitting') : t('submitOrder')}
                    </Button>

                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="text-sm font-sans font-bold uppercase text-ink/60 hover:text-ink transition-colors mt-2 underline underline-offset-4"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}
