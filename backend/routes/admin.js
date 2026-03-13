const express     = require('express')
const jwt         = require('jsonwebtoken')
const router      = express.Router()
const authMiddleware = require('../middleware/auth')
const { getPool } = require('../config/db')

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '12h' }
  )

  return res.json({ success: true, token })
})

// GET /api/admin/bookings
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT * FROM bookings ORDER BY created_at DESC'
    )
    res.json({ success: true, data: rows })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/admin/contacts
router.get('/contacts', authMiddleware, async (req, res) => {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    )
    res.json({ success: true, data: rows })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/admin/bookings/:id/status
router.patch('/bookings/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body
  const { id } = req.params
  try {
    const db = getPool()
    await db.execute('UPDATE bookings SET status = ? WHERE id = ?', [status, id])
    res.json({ success: true, message: 'Status updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/admin/contacts/:id/status
router.patch('/contacts/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body
  const { id } = req.params
  try {
    const db = getPool()
    await db.execute('UPDATE contacts SET status = ? WHERE id = ?', [status, id])
    res.json({ success: true, message: 'Status updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/admin/stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const db = getPool()
    const [[{ total_bookings }]]  = await db.execute('SELECT COUNT(*) as total_bookings FROM bookings')
    const [[{ new_bookings }]]    = await db.execute("SELECT COUNT(*) as new_bookings FROM bookings WHERE status='new'")
    const [[{ total_contacts }]]  = await db.execute('SELECT COUNT(*) as total_contacts FROM contacts')
    const [[{ new_contacts }]]    = await db.execute("SELECT COUNT(*) as new_contacts FROM contacts WHERE status='new'")
    res.json({ success: true, data: { total_bookings, new_bookings, total_contacts, new_contacts } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
