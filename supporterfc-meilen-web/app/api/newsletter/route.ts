import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildEmailHtml, tableRow, dataTable } from '../_lib/emailTemplate';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
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
            subject: `Neue Newsletter-Anmeldung`,
            text: `Ein neuer Benutzer hat den Newsletter abonniert.\n\nE-Mail: ${email}`,
            html: buildEmailHtml({
                title: 'Neue Newsletter-Anmeldung',
                body: `
                    <p>Ein neuer Benutzer hat sich über <a href="https://www.supporterfcmeilen.ch" style="color: #FF5A00; font-weight: bold;">www.supporterfcmeilen.ch</a> für den Newsletter angemeldet.</p>
                    ${dataTable(tableRow('E-Mail', email))}
                `,
            }),
        };

        // E-Mail an Benutzer
        const userMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
            to: email,
            subject: `Anmeldung bestätigt – Supporter FC Meilen`,
            text: `Vielen Dank für Ihre Anmeldung zu unserem Newsletter! Sie erhalten ab sofort unsere neuesten Updates.`,
            html: buildEmailHtml({
                title: 'Anmeldung bestätigt',
                body: `
                    <p>Vielen Dank für Ihre Anmeldung zum Newsletter der <strong>Supporter Vereinigung FC Meilen</strong>!</p>
                    <p>Sie erhalten ab sofort unsere neuesten Nachrichten und Veranstaltungen direkt in Ihr Postfach.</p>
                    <div style="text-align: center; margin: 28px 0;">
                        <a href="https://www.supporterfcmeilen.ch" style="display: inline-block; background-color: #FF5A00; color: #FFFFFF; padding: 14px 32px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-decoration: none;">
                            Webseite besuchen
                        </a>
                    </div>
                    <p style="color: #888; font-size: 14px;">Freundliche Grüsse,<br><strong>Supporter FC Meilen Team</strong></p>
                `,
            }),
        };

        if (!process.env.EMAIL_USER) {
            console.warn('Simulating newsletter email send. Set EMAIL_USER to actually send.');
            return NextResponse.json({ message: 'Success (Simulated)' }, { status: 200 });
        }

        // Send to the user FIRST
        try {
            await transporter.sendMail(userMailOptions);
        } catch (userMailError) {
            console.error('Failed to send mail to user:', userMailError);
            return NextResponse.json({ error: 'Failed to deliver to the provided email address.' }, { status: 400 });
        }

        // If user delivery succeeded, send the notification to the admin
        await transporter.sendMail(adminMailOptions);

        return NextResponse.json({ message: 'Success' }, { status: 200 });

    } catch (error) {
        console.error('API /newsletter POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

