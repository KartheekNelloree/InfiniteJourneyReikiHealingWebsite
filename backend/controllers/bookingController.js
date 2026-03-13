const { getPool }       = require('../config/db')
const { sendAdminEmail } = require('../utils/sendEmail')

/**
 * POST /api/book-consultation
 * Saves booking to MySQL and emails the admin.
 */
const bookConsultation = async (req, res) => {
  const { name, email, phone, course, date, time, message } = req.body

  if (!name || !email || !phone || !course || !date) {
    return res.status(400).json({ error: 'Missing required fields: name, email, phone, course, date' })
  }

  try {
    const db = getPool()

    // Save to database
    const [result] = await db.execute(
      `INSERT INTO bookings (name, email, phone, course, appointment_date, preferred_time, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, course, date, time || 'Not specified', message || '']
    )

    console.log(`[DB ✅] Booking saved — ID: ${result.insertId} | ${name} (${email})`)

    // Email notification to admin
    await sendAdminEmail(
      `📅 New Booking: ${name} — ${course}`,
      `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#C9A84C,#A8873A);padding:24px;border-radius:8px 8px 0 0;">
            <h2 style="color:white;margin:0;">New Consultation Booking</h2>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;">Ananda Reiki Healing Center</p>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #eee;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr style="background:#faf8ff;"><td style="padding:10px 14px;font-weight:bold;width:140px;">Name</td><td style="padding:10px 14px;">${name}</td></tr>
              <tr><td style="padding:10px 14px;font-weight:bold;">Email</td><td style="padding:10px 14px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr style="background:#faf8ff;"><td style="padding:10px 14px;font-weight:bold;">Phone</td><td style="padding:10px 14px;">${phone}</td></tr>
              <tr><td style="padding:10px 14px;font-weight:bold;">Course</td><td style="padding:10px 14px;">${course}</td></tr>
              <tr style="background:#faf8ff;"><td style="padding:10px 14px;font-weight:bold;">Date</td><td style="padding:10px 14px;">${date}</td></tr>
              <tr><td style="padding:10px 14px;font-weight:bold;">Time</td><td style="padding:10px 14px;">${time || 'Not specified'}</td></tr>
              <tr style="background:#faf8ff;"><td style="padding:10px 14px;font-weight:bold;">Message</td><td style="padding:10px 14px;">${message || '—'}</td></tr>
            </table>
            <p style="margin-top:20px;padding:12px;background:#fff8ec;border-left:4px solid #C9A84C;font-size:13px;">
              View all bookings in your <a href="http://localhost:3000/admin">Admin Dashboard</a>
            </p>
            <p style="color:#aaa;font-size:12px;">Booking ID: #${result.insertId} | ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    )

    return res.status(200).json({ success: true, message: 'Consultation booked successfully. We will confirm within 24 hours.' })
  } catch (err) {
    console.error('[Booking Error]', err.message)
    return res.status(500).json({ error: 'Failed to save booking. Please try again.' })
  }
}

module.exports = { bookConsultation }
