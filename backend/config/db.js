const mysql = require('mysql2/promise')

let pool

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host:     process.env.DB_HOST     || 'localhost',
      port:     parseInt(process.env.DB_PORT || '3306'),
      user:     process.env.DB_USER     || 'root',
      password: process.env.DB_PASS     || '',
      database: process.env.DB_NAME     || 'ananda_reiki',
      waitForConnections: true,
      connectionLimit: 10,
    })
  }
  return pool
}

/**
 * Creates all required tables if they don't exist yet.
 * Called once on server startup.
 */
const initDB = async () => {
  const db = getPool()

  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id               INT AUTO_INCREMENT PRIMARY KEY,
      name             VARCHAR(255)  NOT NULL,
      email            VARCHAR(255)  NOT NULL,
      phone            VARCHAR(50)   NOT NULL,
      course           VARCHAR(255)  NOT NULL,
      appointment_date DATE          NOT NULL,
      preferred_time   VARCHAR(50)   DEFAULT 'Not specified',
      message          TEXT,
      status           ENUM('new','confirmed','cancelled') DEFAULT 'new',
      created_at       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      name       VARCHAR(255) NOT NULL,
      email      VARCHAR(255) NOT NULL,
      subject    VARCHAR(255) DEFAULT 'General Enquiry',
      message    TEXT         NOT NULL,
      status     ENUM('new','read','replied') DEFAULT 'new',
      created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log('✅ Database tables ready')
}

module.exports = { getPool, initDB }
