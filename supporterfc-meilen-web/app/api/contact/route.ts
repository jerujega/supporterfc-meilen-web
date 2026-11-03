import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildEmailHtml, tableRow, dataTable } from '../_lib/emailTemplate';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
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

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
      to: process.env.EMAIL_USER || 'admin@supporterfc-meilen.ch',
      subject: `Kontaktformular: ${subject} von ${name}`,
      text: `Neue Nachricht über das Kontaktformular.\n\nName: ${name}\nE-Mail: ${email}\nBetreff: ${subject}\n\nNachricht:\n${message}`,
      html: buildEmailHtml({
        title: 'Neue Kontaktformular-Nachricht',
        body: `
          ${dataTable(
          tableRow('Name', name) +
          tableRow('E-Mail', email) +
          tableRow('Betreff', subject)
        )}
          <p style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 8px;">Nachricht:</p>
          <div style="background-color: #F5F0E8; padding: 16px 20px; border-left: 4px solid #FF5A00; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
        `,
      }),
    };

    if (!process.env.EMAIL_USER) {
      console.warn('Simulating email send. Set EMAIL_USER to actually send.');
      return NextResponse.json({ message: 'Success (Simulated)' }, { status: 200 });
    }

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    console.error('API /contact POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

