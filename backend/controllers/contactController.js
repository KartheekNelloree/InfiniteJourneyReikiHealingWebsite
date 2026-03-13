const { getPool }       = require('../config/db')
const { sendAdminEmail } = require('../utils/sendEmail')

/**
 * POST /api/contact
 * Saves contact message to MySQL and emails the admin.
 */
const sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' })
  }

  try {
    const db = getPool()

    const [result] = await db.execute(
      `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`,
      [name, email, subject || 'General Enquiry', message]
    )

    console.log(`[DB ✅] Contact saved — ID: ${result.insertId} | ${name} (${email})`)

    await sendAdminEmail(
      `✉️ New Message: ${name} — ${subject || 'General Enquiry'}`,
      `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#9B8EC4,#7A6BA3);padding:24px;border-radius:8px 8px 0 0;">
            <h2 style="color:white;margin:0;">New Contact Message</h2>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;">Ananda Reiki Healing Center</p>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #eee;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr style="background:#faf8ff;"><td style="padding:10px 14px;font-weight:bold;width:140px;">Name</td><td style="padding:10px 14px;">${name}</td></tr>
              <tr><td style="padding:10px 14px;font-weight:bold;">Email</td><td style="padding:10px 14px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr style="background:#faf8ff;"><td style="padding:10px 14px;font-weight:bold;">Subject</td><td style="padding:10px 14px;">${subject || 'General Enquiry'}</td></tr>
              <tr><td style="padding:10px 14px;font-weight:bold;">Message</td><td style="padding:10px 14px;">${message}</td></tr>
            </table>
            <p style="color:#aaa;font-size:12px;margin-top:16px;">Message ID: #${result.insertId} | ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    )

    return res.status(200).json({ success: true, message: 'Message sent successfully. We will get back to you within 24 hours.' })
  } catch (err) {
    console.error('[Contact Error]', err.message)
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
}

module.exports = { sendContactMessage }
