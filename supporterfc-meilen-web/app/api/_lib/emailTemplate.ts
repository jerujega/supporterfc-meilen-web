/**
 * Shared branded email template for Supporter FC Meilen.
 * All emails sent from the website use this wrapper for visual consistency.
 */

interface EmailTemplateOptions {
    /** The main heading/title of the email */
    title: string;
    /** The body HTML content (tables, paragraphs, etc.) */
    body: string;
    /** Optional footer note override */
    footerNote?: string;
}

export function buildEmailHtml({ title, body, footerNote }: EmailTemplateOptions): string {
    const year = new Date().getFullYear();
    const defaultFooter = footerNote || 'Diese E-Mail wurde automatisch über www.supporterfcmeilen.ch versendet.';

    return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F0E8; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F0E8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; color: #F5F0E8;">
                Supporter FC Meilen
              </h1>
              <div style="width: 60px; height: 3px; background-color: #FF5A00; margin: 12px auto 0;"></div>
            </td>
          </tr>

          <!-- ORANGE ACCENT BAR -->
          <tr>
            <td style="background-color: #FF5A00; height: 5px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- TITLE BAR -->
          <tr>
            <td style="background-color: #D4AF37; padding: 20px 40px;">
              <h2 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #1A1A1A;">
                ${title}
              </h2>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 32px 40px; color: #1A1A1A; font-size: 15px; line-height: 1.7;">
              ${body}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 24px 40px; text-align: center;">
              <p style="margin: 0 0 8px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #F5F0E8; opacity: 0.7; letter-spacing: 1px; text-transform: uppercase;">
                ${defaultFooter}
              </p>
              <a href="https://www.supporterfcmeilen.ch" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #FF5A00; text-decoration: none; font-weight: bold; letter-spacing: 0.5px;">
                www.supporterfcmeilen.ch
              </a>
              <p style="margin: 12px 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #F5F0E8; opacity: 0.4;">
                &copy; ${year} Supporter Vereinigung FC Meilen &middot; Sportzentrum Allmend, Burgstrasse 160, 8706 Meilen
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Helper to build a styled data table row for email templates.
 */
export function tableRow(label: string, value: string): string {
    return `
    <tr>
      <td style="padding: 10px 16px; border-bottom: 1px solid #E8E3D9; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #888; width: 140px; vertical-align: top;">
        ${label}
      </td>
      <td style="padding: 10px 16px; border-bottom: 1px solid #E8E3D9; font-size: 15px; color: #1A1A1A;">
        ${value}
      </td>
    </tr>`;
}

/**
 * Wraps rows in a styled table container.
 */
export function dataTable(rows: string): string {
    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 2px solid #1A1A1A; margin: 16px 0 24px;">
      ${rows}
    </table>`;
}
