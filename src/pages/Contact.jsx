import { useState } from 'react'
import axios from 'axios'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('loading')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pt-20">
      {/* Page Hero */}
      <div className="page-hero">
        <p className="text-sm tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>We'd Love to Hear From You</p>
        <h1 className="font-playfair text-5xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Get In Touch</h1>
        <div className="gold-divider" />
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">Have a question or want to learn more? Send us a message and we'll respond within 24 hours.</p>
      </div>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {status === 'success' ? (
              <div className="card p-10 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,168,76,0.15)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">Thank you for reaching out. We'll be in touch soon.</p>
                <button onClick={() => setStatus('idle')} className="btn-primary">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <h2 className="font-playfair text-2xl font-semibold mb-2" style={{ color: 'var(--dark)' }}>Send a Message</h2>
                <div className="gold-divider mx-0 mb-4" />

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="form-input" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Write your message here..." className="form-input resize-none" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair text-3xl font-semibold mb-3" style={{ color: 'var(--dark)' }}>Contact Details</h2>
              <div className="gold-divider mx-0 mb-6" />
            </div>

            {[
              { icon: '📍', label: 'Address', value: 'Marathahalli, Bangalore 560037' },
              { icon: '📞', label: 'Phone', value: '+91 9886777793' },
              { icon: '✉️', label: 'Email', value: 'infinitejourney.8886@gmail.com' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(155,142,196,0.15))' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--dark)' }}>{item.label}</p>
                  <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden h-48 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--purple-light), var(--blue-light))' }}>
              <div className="text-center">
                <div className="text-3xl mb-2">🗺️</div>
                <p className="text-sm text-gray-600 font-medium">Infinite Journey Reiki Healing Center</p>
                <p className="text-xs text-gray-400">Marathahalli, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
