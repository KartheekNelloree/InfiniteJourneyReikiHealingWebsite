import { useState, useEffect } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: '/api/admin' })

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Login Screen ──────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await axios.post('/api/admin/login', form)
      localStorage.setItem('admin_token', res.data.token)
      onLogin()
    } catch {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#f5f0ff,#fdf8f0)' }}>
      <div className="card p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl font-bold" style={{ color: 'var(--gold)' }}>Ananda</h1>
          <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--purple)' }}>Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Username</label>
            <input className="form-input" value={form.username} onChange={e => setForm(f => ({...f, username: e.target.value}))} placeholder="Username" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
            <input type="password" className="form-input" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} placeholder="Password" required />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Status Badge ──────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    new:       'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    read:      'bg-gray-100 text-gray-600',
    replied:   'bg-purple-100 text-purple-700',
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  )
}

// ── Stats Cards ───────────────────────────────────────────────────
function StatsBar({ stats }) {
  const cards = [
    { label: 'Total Bookings',  value: stats.total_bookings, color: 'var(--gold)' },
    { label: 'New Bookings',    value: stats.new_bookings,   color: '#3B82F6' },
    { label: 'Total Messages',  value: stats.total_contacts, color: 'var(--purple)' },
    { label: 'Unread Messages', value: stats.new_contacts,   color: '#EF4444' },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((c, i) => (
        <div key={i} className="card p-5 text-center">
          <div className="text-3xl font-bold font-playfair" style={{ color: c.color }}>{c.value ?? '—'}</div>
          <div className="text-xs text-gray-500 mt-1">{c.label}</div>
        </div>
      ))}
    </div>
  )
}

// ── Bookings Table ────────────────────────────────────────────────
function BookingsTable({ bookings, onStatusChange }) {
  if (!bookings.length) return <p className="text-gray-400 text-center py-12">No bookings yet.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.1),rgba(155,142,196,0.1))' }}>
            {['#','Name','Email','Phone','Course','Date','Time','Message','Status','Action'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b.id} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
              <td className="px-4 py-3 text-gray-400">#{b.id}</td>
              <td className="px-4 py-3 font-medium">{b.name}</td>
              <td className="px-4 py-3"><a href={`mailto:${b.email}`} className="hover:underline" style={{color:'var(--purple)'}}>{b.email}</a></td>
              <td className="px-4 py-3">{b.phone}</td>
              <td className="px-4 py-3 whitespace-nowrap">{b.course}</td>
              <td className="px-4 py-3 whitespace-nowrap">{new Date(b.appointment_date).toLocaleDateString('en-IN')}</td>
              <td className="px-4 py-3 whitespace-nowrap">{b.preferred_time}</td>
              <td className="px-4 py-3 max-w-xs truncate text-gray-500">{b.message || '—'}</td>
              <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
              <td className="px-4 py-3">
                <select
                  value={b.status}
                  onChange={e => onStatusChange('bookings', b.id, e.target.value)}
                  className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
                >
                  <option value="new">New</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Contacts Table ────────────────────────────────────────────────
function ContactsTable({ contacts, onStatusChange }) {
  if (!contacts.length) return <p className="text-gray-400 text-center py-12">No messages yet.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'linear-gradient(135deg,rgba(155,142,196,0.1),rgba(201,168,76,0.1))' }}>
            {['#','Name','Email','Subject','Message','Status','Action'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr key={c.id} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
              <td className="px-4 py-3 text-gray-400">#{c.id}</td>
              <td className="px-4 py-3 font-medium">{c.name}</td>
              <td className="px-4 py-3"><a href={`mailto:${c.email}`} className="hover:underline" style={{color:'var(--purple)'}}>{c.email}</a></td>
              <td className="px-4 py-3">{c.subject}</td>
              <td className="px-4 py-3 max-w-xs truncate text-gray-500">{c.message}</td>
              <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
              <td className="px-4 py-3">
                <select
                  value={c.status}
                  onChange={e => onStatusChange('contacts', c.id, e.target.value)}
                  className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main Admin Dashboard ──────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [tab, setTab]           = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [contacts, setContacts] = useState([])
  const [stats, setStats]       = useState({})
  const [loading, setLoading]   = useState(true)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [b, c, s] = await Promise.all([
        api.get('/bookings'),
        api.get('/contacts'),
        api.get('/stats'),
      ])
      setBookings(b.data.data)
      setContacts(c.data.data)
      setStats(s.data.data)
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) onLogout()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleStatusChange = async (type, id, status) => {
    try {
      await api.patch(`/${type}/${id}/status`, { status })
      fetchAll()
    } catch {}
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--off-white)' }}>
      {/* Top bar */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-playfair text-xl font-bold" style={{ color: 'var(--gold)' }}>Ananda</span>
            <span className="text-xs tracking-widest uppercase hidden sm:block" style={{ color: 'var(--purple)' }}>Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchAll} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Refresh
            </button>
            <button onClick={onLogout} className="btn-outline text-sm px-4 py-2">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : (
          <>
            <StatsBar stats={stats} />

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab('bookings')}
                className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${tab === 'bookings' ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                style={tab === 'bookings' ? { background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' } : {}}
              >
                📅 Bookings {stats.new_bookings > 0 && <span className="ml-1 bg-white/30 text-xs px-1.5 py-0.5 rounded-full">{stats.new_bookings} new</span>}
              </button>
              <button
                onClick={() => setTab('contacts')}
                className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${tab === 'contacts' ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                style={tab === 'contacts' ? { background: 'linear-gradient(135deg,var(--purple),#7A6BA3)' } : {}}
              >
                ✉️ Messages {stats.new_contacts > 0 && <span className="ml-1 bg-white/30 text-xs px-1.5 py-0.5 rounded-full">{stats.new_contacts} new</span>}
              </button>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-playfair text-lg font-semibold" style={{ color: 'var(--dark)' }}>
                  {tab === 'bookings' ? `All Bookings (${bookings.length})` : `All Messages (${contacts.length})`}
                </h2>
              </div>
              {tab === 'bookings'
                ? <BookingsTable bookings={bookings} onStatusChange={handleStatusChange} />
                : <ContactsTable contacts={contacts} onStatusChange={handleStatusChange} />
              }
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Page Entry ────────────────────────────────────────────────────
export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('admin_token'))

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsLoggedIn(false)
  }

  return isLoggedIn
    ? <Dashboard onLogout={handleLogout} />
    : <LoginScreen onLogin={() => setIsLoggedIn(true)} />
}
