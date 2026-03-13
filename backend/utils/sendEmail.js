const nodemailer = require('nodemailer')

/**
 * Sends an email notification to the admin whenever
 * a booking or contact form is submitted.
 * Configure SMTP in .env — works with Gmail, Outlook, or any SMTP.
 */
async function sendAdminEmail(subject, htmlBody) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[📧 Email] SMTP not configured — skipping email notification')
    return
  }

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from:    `"Ananda Reiki Website" <${process.env.SMTP_USER}>`,
    to:      process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject,
    html:    htmlBody,
  })

  console.log(`[📧 Email] Notification sent to ${process.env.ADMIN_EMAIL || process.env.SMTP_USER}`)
}

module.exports = { sendAdminEmail }
