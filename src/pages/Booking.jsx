import { useState } from 'react'
import axios from 'axios'

const initialForm = {
  name: '', email: '', phone: '', course: '', date: '', time: '', message: '',
}

const courseOptions = [
  'Reiki Level 1 – Shoden (₹5,000)',
  'Reiki Level 2 – Okuden (₹8,000)',
  'Reiki Level 3 / Master – Shinpiden (₹15,000)',
  'Reiki Grand Master (₹25,000)',
  'Individual Healing Session',
  'Chakra Balancing Session',
  'Distance Healing Session',
  'Free Consultation',
]

export default function Booking() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.phone.trim() || !/^\+?[\d\s\-]{8,}$/.test(form.phone)) e.phone = 'Valid phone number is required'
    if (!form.course) e.course = 'Please select a service'
    if (!form.date) e.date = 'Appointment date is required'
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
      await axios.post('/api/book-consultation', form)
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
        <p className="text-sm tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>Schedule Your Session</p>
        <h1 className="font-playfair text-5xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Book a Consultation</h1>
        <div className="gold-divider" />
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">Fill in the form below and we'll get back to you within 24 hours.</p>
      </div>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Form */}
          <div className="md:col-span-2">
            {status === 'success' ? (
              <div className="card p-10 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,168,76,0.15)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2" style={{ color: 'var(--dark)' }}>Booking Received!</h3>
                <p className="text-gray-500 mb-6">Thank you for reaching out. We'll confirm your appointment within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="btn-primary">Book Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <h2 className="font-playfair text-2xl font-semibold mb-2" style={{ color: 'var(--dark)' }}>Your Details</h2>
                <div className="gold-divider mx-0 mb-4" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="form-input" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Phone Number *</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="form-input" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Course / Service *</label>
                    <select name="course" value={form.course} onChange={handleChange} className="form-input">
                      <option value="">Select a service...</option>
                      {courseOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Preferred Date *</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="form-input" />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">Preferred Time</label>
                    <select name="time" value={form.time} onChange={handleChange} className="form-input">
                      <option value="">Select a time slot...</option>
                      <option>Morning (9am – 12pm)</option>
                      <option>Afternoon (12pm – 4pm)</option>
                      <option>Evening (4pm – 7pm)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Message / Intentions</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Share your healing intentions or any questions..." className="form-input resize-none" />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again or contact us directly.</p>
                )}

                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full text-center">
                  {status === 'loading' ? 'Sending...' : 'Book Now'}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact card */}
            <div className="card p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4" style={{ color: 'var(--dark)' }}>Contact Info</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex gap-3"><span style={{ color: 'var(--gold)' }}>📍</span> 123 Serenity Lane, Mumbai, India</li>
                <li className="flex gap-3"><span style={{ color: 'var(--gold)' }}>📞</span> +91 98765 43210</li>
                <li className="flex gap-3"><span style={{ color: 'var(--gold)' }}>✉️</span> hello@anandareiki.com</li>
              </ul>
            </div>

            {/* What to expect */}
            <div className="card p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4" style={{ color: 'var(--dark)' }}>What to Expect</h3>
              <ul className="space-y-3">
                {['A confirmation email within 24 hours', 'A brief intake form for new clients', 'A 15-min pre-session call', 'Personalised healing session', 'Follow-up guidance & support'].map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--purple)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div className="card p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4" style={{ color: 'var(--dark)' }}>Working Hours</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex justify-between"><span>Mon – Fri</span><span className="font-medium">9am – 7pm</span></li>
                <li className="flex justify-between"><span>Saturday</span><span className="font-medium">10am – 5pm</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="font-medium">By Appointment</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
