import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildEmailHtml, tableRow, dataTable } from '../_lib/emailTemplate';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, level } = body;

    if (!name || !email || !level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const senderEmail = process.env.EMAIL_USER || 'supporter@fcmeilen.ch';
    const associationEmail = 'supporter@fcmeilen.ch';

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'tertia.sui-inter.net',
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: process.env.EMAIL_PASS || '',
      },
    });

    // 1. Notification email to the association (supporter@fcmeilen.ch)
    const adminMailOptions = {
      from: `"Supporter FC Meilen" <${senderEmail}>`,
      to: associationEmail,
      replyTo: email,
      subject: `Neue Mitgliedschaftsanmeldung: ${name}`,
      text: `Eine neue Mitgliedschaftsanmeldung ist eingegangen.\n\nName: ${name}\nE-Mail: ${email}\nTelefon: ${phone || 'Keine Angabe'}\nAdresse: ${address || 'Keine Angabe'}\nMitgliedschaft: ${level}`,
      html: buildEmailHtml({
        title: 'Neue Mitgliedschaftsanmeldung',
        body: `
          <p>Eine neue Mitgliedschaftsanmeldung ist über <a href="https://www.supporterfcmeilen.ch" style="color: #FF5A00; font-weight: bold;">www.supporterfcmeilen.ch</a> eingegangen.</p>
          ${dataTable(
          tableRow('Name', name) +
          tableRow('E-Mail', email) +
          tableRow('Telefon', phone || 'Keine Angabe') +
          tableRow('Adresse', address || 'Keine Angabe') +
          tableRow('Mitgliedschaft', level)
        )}
        `,
      }),
    };

    // 2. Automatic confirmation email to the new member
    const memberMailOptions = {
      from: `"Supporter-Vereinigung FC Meilen" <${senderEmail}>`,
      to: email,
      replyTo: associationEmail,
      subject: 'Herzlich willkommen bei der Supporter-Vereinigung FC Meilen!',
      text: `Grüezi\n\nHerzlichen Dank für Ihre Anmeldung und Ihr Vertrauen!\n\nWir freuen uns sehr, Sie als neues Mitglied der Supporter-Vereinigung des FC Meilen willkommen zu heissen.\n\nMit Ihrer Mitgliedschaft leisten Sie einen wichtigen Beitrag zur Förderung unserer Juniorinnen und Junioren. Dank Ihrer Unterstützung können wir den Nachwuchsfussball nachhaltig stärken.\n\nDer jährliche Mitgliederbeitrag beträgt CHF 100.–. Weitere Informationen zur Beitragszahlung erhalten Sie separat.\n\nWir danken Ihnen herzlich für Ihre wertvolle Unterstützung und freuen uns, Sie bei unseren zukünftigen Vereinsanlässen persönlich begrüssen zu dürfen.\n\nSportliche Grüsse\n\nSanji Lingam\nPräsident\nSupporter-Vereinigung FC Meilen\n\nsupporter@fcmeilen.ch\nwww.supporterfcmeilen.ch`,
      html: buildEmailHtml({
        title: 'Herzlich Willkommen!',
        body: `
          <p style="margin-top: 0;">Grüezi,</p>
          <p>Herzlichen Dank für Ihre Anmeldung und Ihr Vertrauen!</p>
          <p>Wir freuen uns sehr, Sie als neues Mitglied der Supporter-Vereinigung des FC Meilen willkommen zu heissen.</p>
          <p>Mit Ihrer Mitgliedschaft leisten Sie einen wichtigen Beitrag zur Förderung unserer Juniorinnen und Junioren. Dank Ihrer Unterstützung können wir den Nachwuchsfussball nachhaltig stärken.</p>
          <p>Der jährliche Mitgliederbeitrag beträgt CHF 100.–. Weitere Informationen zur Beitragszahlung erhalten Sie separat.</p>
          <p>Wir danken Ihnen herzlich für Ihre wertvolle Unterstützung und freuen uns, Sie bei unseren zukünftigen Vereinsanlässen persönlich begrüssen zu dürfen.</p>
          <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #E8E3D9;">
            <p style="margin: 0 0 4px; font-weight: bold; color: #1A1A1A;">Sportliche Grüsse</p>
            <p style="margin: 0 0 2px; font-weight: bold; color: #1A1A1A;">Sanji Lingam</p>
            <p style="margin: 0 0 12px; color: #555; font-size: 14px;">Präsident<br/>Supporter-Vereinigung FC Meilen</p>
            <p style="margin: 0; font-size: 14px;">
              <a href="mailto:supporter@fcmeilen.ch" style="color: #FF5A00; text-decoration: none; font-weight: bold;">supporter@fcmeilen.ch</a><br/>
              <a href="https://www.supporterfcmeilen.ch" style="color: #FF5A00; text-decoration: none; font-weight: bold;">www.supporterfcmeilen.ch</a>
            </p>
          </div>
        `,
      }),
    };

    if (!process.env.EMAIL_USER) {
      console.warn('Simulating email send. Set EMAIL_USER to actually send.');
      return NextResponse.json({ message: 'Success (Simulated)' }, { status: 200 });
    }

    // Send notification to association and confirmation to member in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(memberMailOptions),
    ]);

    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    console.error('API /join POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

