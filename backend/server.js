const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const { initDB }      = require('./config/db')
const bookingRoutes   = require('./routes/booking')
const contactRoutes   = require('./routes/contact')
const adminRoutes     = require('./routes/admin')

const app  = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(express.json())

// Routes
app.use('/api', bookingRoutes)
app.use('/api', contactRoutes)
app.use('/api/admin', adminRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use((req, res) => res.status(404).json({ error: 'Route not found' }))
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server after DB is ready
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✨ Ananda Reiki backend → http://localhost:${PORT}`)
      console.log(`📊 Admin dashboard  → http://localhost:3000/admin`)
    })
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message)
    console.error('👉 Check DB_HOST, DB_USER, DB_PASS, DB_NAME in .env')
    process.exit(1)
  })
