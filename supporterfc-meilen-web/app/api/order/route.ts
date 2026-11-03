import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildEmailHtml, tableRow, dataTable } from '../_lib/emailTemplate';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productName, productPrice, name, email, phone, size, address } = body;

        if (!name || !email || !address) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'tertia.sui-inter.net',
            port: Number(process.env.EMAIL_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_PASS || '',
            },
        });

        // E-Mail an Admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
            to: process.env.EMAIL_USER || 'admin@supporterfc-meilen.ch',
            subject: `Neue Merchandise-Bestellung: ${productName} von ${name}`,
            text: `Neue Merchandise-Bestellanfrage eingegangen.\n\nProdukt: ${productName}\nGrösse: ${size}\nPreis: CHF ${productPrice}\n\nKundendaten:\nName: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\nAdresse: ${address}`,
            html: buildEmailHtml({
                title: 'Neue Merchandise-Bestellanfrage',
                body: `
                    <p>Eine neue Bestellanfrage ist über <a href="https://www.supporterfcmeilen.ch" style="color: #FF5A00; font-weight: bold;">www.supporterfcmeilen.ch</a> eingegangen.</p>
                    ${dataTable(
                    tableRow('Produkt', productName) +
                    tableRow('Grösse', size) +
                    tableRow('Preis', `CHF ${productPrice}`) +
                    tableRow('Name', name) +
                    tableRow('E-Mail', email) +
                    tableRow('Telefon', phone || 'Keine Angabe')
                )}
                    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 8px;">Lieferadresse:</p>
                    <div style="background-color: #F5F0E8; padding: 16px 20px; border-left: 4px solid #D4AF37; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${address}</div>
                `,
            }),
        };

        // Bestätigungs-E-Mail an den Benutzer
        const userMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
            to: email,
            subject: `Bestellbestätigung: ${productName} – Supporter FC Meilen`,
            text: `Hallo ${name},\n\nVielen Dank für Ihre Bestellanfrage für ${productName} (Grösse: ${size}).\n\nWir werden Ihre Anfrage prüfen und uns in Kürze mit den Zahlungsdetails bei Ihnen melden.\n\nLieferadresse:\n${address}\n\nFreundliche Grüsse,\nSupporter FC Meilen`,
            html: buildEmailHtml({
                title: 'Bestellbestätigung',
                body: `
                    <p>Hallo <strong>${name}</strong>,</p>
                    <p>Vielen Dank für Ihre Unterstützung des Vereins! Wir haben Ihre Bestellanfrage erhalten.</p>
                    ${dataTable(
                    tableRow('Produkt', productName) +
                    tableRow('Grösse', size) +
                    tableRow('Preis', `CHF ${productPrice}`)
                )}
                    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 8px;">Lieferadresse:</p>
                    <div style="background-color: #F5F0E8; padding: 16px 20px; border-left: 4px solid #D4AF37; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${address}</div>
                    <p style="margin-top: 24px;">Wir werden Ihre Anfrage prüfen und uns in Kürze mit den Zahlungsanweisungen bei Ihnen melden.</p>
                    <p style="color: #888; font-style: italic;">Gegen modernen Fussball.</p>
                `,
            }),
        };

        if (!process.env.EMAIL_USER) {
            console.warn('Simulating email send. Set EMAIL_USER to actually send.');
            return NextResponse.json({ message: 'Success (Simulated)' }, { status: 200 });
        }

        // Send admin email - this is critical
        try {
            await transporter.sendMail(adminMailOptions);
            console.log('Admin order notification sent successfully');
        } catch (error) {
            console.error('Failed to send admin order notification:', error);
            return NextResponse.json({ error: 'Failed to send admin notification' }, { status: 500 });
        }

        // Send user confirmation - this is secondary
        try {
            await transporter.sendMail(userMailOptions);
            console.log('User confirmation email sent successfully');
        } catch (error) {
            console.warn('Failed to send user confirmation email (order was still processed):', error);
            return NextResponse.json({
                message: 'Success',
                warning: 'Confirmation email failed to send'
            }, { status: 200 });
        }

        return NextResponse.json({ message: 'Success' }, { status: 200 });

    } catch (error) {
        console.error('API /order POST Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

