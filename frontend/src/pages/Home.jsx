import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import SectionHeading from '../components/SectionHeading'
import CourseCard from '../components/CourseCard'
import TestimonialCard from '../components/TestimonialCard'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Reiki Healing Sessions',
    desc: 'One-on-one energy healing sessions to restore balance and promote deep relaxation.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Chakra Balancing',
    desc: 'Realign and activate your seven energy centers for holistic wellbeing.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Distance Healing',
    desc: 'Receive the powerful benefits of Reiki from anywhere in the world.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Reiki Attunements',
    desc: 'Sacred attunements that open your energy channels to channel Reiki energy.',
  },
]

const previewCourses = [
  {
    title: 'Reiki Level 1',
    subtitle: 'Shoden — Foundation',
    description: 'Begin your Reiki journey. Learn hand positions, self-healing techniques, and the fundamentals of energy work.',
    duration: '2 Days',
    mode: 'Online / Offline',
    price: '₹5,000',
    includes: ['Attunement ceremony', 'Manual & certificate', 'Self-healing techniques', 'Lifetime support'],
  },
  {
    title: 'Reiki Level 2',
    subtitle: 'Okuden — Practitioner',
    description: 'Deepen your practice with sacred symbols, distance healing, and emotional healing techniques.',
    duration: '2 Days',
    mode: 'Online / Offline',
    price: '₹8,000',
    includes: ['3 sacred Reiki symbols', 'Distance healing', 'Emotional healing', 'Practice sessions'],
    badge: 'Popular',
  },
  {
    title: 'Reiki Master',
    subtitle: 'Shinpiden — Mastery',
    description: 'Become a Reiki Master and Teacher. Learn the master symbol and how to pass attunements.',
    duration: '3 Days',
    mode: 'Online / Offline',
    price: '₹15,000',
    includes: ['Master symbol', 'Teaching attunements', 'Business guidance', 'Advanced techniques'],
  },
]

const testimonials = [
  { name: 'Priya Menon', course: 'Reiki Level 1', initial: 'P', text: 'This course completely transformed how I experience my body and energy. Dr. Sharma is a gifted teacher and healer.' },
  { name: 'Rahul Verma', course: 'Reiki Level 2', initial: 'R', text: 'The distance healing session was incredible. I felt warmth and peace throughout. Highly recommend Ananda Reiki.' },
  { name: 'Sneha Patel', course: 'Reiki Master', initial: 'S', text: 'Becoming a Reiki Master with Ananda changed my life. I now help others heal every day. Forever grateful.' },
]

const stats = [
  { number: 500, label: 'Students Trained', suffix: '+' },
  { number: 10, label: 'Years Experience', suffix: '+' },
  { number: 100, label: 'Satisfaction Rate', suffix: '%' },
]

function useCountUp(ref, target, duration = 2000) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = Date.now()
          const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const value = Math.floor(progress * target)
            if (ref.current) ref.current.textContent = value
            if (progress < 1) requestAnimationFrame(tick)
            else if (ref.current) ref.current.textContent = target
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, target, duration])
}

function StatCounter({ number, label, suffix }) {
  const ref = useRef(null)
  useCountUp(ref, number)
  return (
    <div className="text-center">
      <div className="font-playfair text-5xl font-bold mb-2" style={{ color: 'var(--gold)' }}>
        <span ref={ref}>0</span>{suffix}
      </div>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center fade-up">
          {/* Lotus icon */}
          <div className="flex justify-center mb-8">
            <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
              <ellipse cx="40" cy="55" rx="12" ry="20" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.08)" />
              <ellipse cx="22" cy="48" rx="10" ry="18" stroke="#9B8EC4" strokeWidth="1.5" fill="rgba(155,142,196,0.08)" transform="rotate(-25 22 48)" />
              <ellipse cx="58" cy="48" rx="10" ry="18" stroke="#9B8EC4" strokeWidth="1.5" fill="rgba(155,142,196,0.08)" transform="rotate(25 58 48)" />
              <ellipse cx="10" cy="42" rx="8" ry="14" stroke="#87CEEB" strokeWidth="1.2" fill="rgba(135,206,235,0.08)" transform="rotate(-45 10 42)" />
              <ellipse cx="70" cy="42" rx="8" ry="14" stroke="#87CEEB" strokeWidth="1.2" fill="rgba(135,206,235,0.08)" transform="rotate(45 70 42)" />
              <line x1="40" y1="70" x2="40" y2="78" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <p className="text-sm tracking-widest uppercase mb-4 font-medium" style={{ color: 'var(--purple)' }}>
            Welcome to Ananda Reiki Healing Center
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: 'var(--dark)' }}>
            Heal. <span style={{ color: 'var(--gold)' }}>Balance.</span>{' '}
            <span style={{ color: 'var(--purple)' }}>Transform.</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the ancient art of Reiki healing for mind, body & soul. Restore your energy. Find your peace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-primary text-base px-8 py-4">
              Book a Consultation
            </Link>
            <Link to="/courses" className="btn-outline text-base px-8 py-4">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* About Reiki */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>Ancient Wisdom</p>
            <h2 className="section-heading mb-4">What is Reiki Healing?</h2>
            <div className="gold-divider mx-0 mb-6" />
            <p className="text-gray-500 leading-relaxed mb-6">
              Reiki is a Japanese technique for stress reduction and relaxation that also promotes healing. It works by channeling universal life energy through the practitioner's hands to the recipient, stimulating the body's natural healing abilities.
            </p>
            <ul className="space-y-3">
              {['Reduces stress, anxiety & emotional blockages', 'Accelerates physical and spiritual healing', 'Restores energy flow and chakra balance'].map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 shrink-0" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {/* Mandala illustration */}
          <div className="flex justify-center">
            <div className="relative w-72 h-72">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <circle cx="100" cy="100" r="95" stroke="#E8D5A3" strokeWidth="1" />
                <circle cx="100" cy="100" r="80" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="60" stroke="#9B8EC4" strokeWidth="1" />
                <circle cx="100" cy="100" r="40" stroke="#C9A84C" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="20" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" strokeWidth="1.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180
                  const x1 = 100 + 25 * Math.cos(rad)
                  const y1 = 100 + 25 * Math.sin(rad)
                  const x2 = 100 + 58 * Math.cos(rad)
                  const y2 = 100 + 58 * Math.sin(rad)
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A84C" strokeWidth="0.8" />
                })}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180
                  const cx = 100 + 60 * Math.cos(rad)
                  const cy = 100 + 60 * Math.sin(rad)
                  return <circle key={i} cx={cx} cy={cy} r="6" fill="rgba(155,142,196,0.3)" stroke="#9B8EC4" strokeWidth="1" />
                })}
                <circle cx="100" cy="100" r="8" fill="#C9A84C" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #f5f0ff10, #faf8ff)' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Our Healing Services" subtitle="Comprehensive energy healing services designed to restore balance and harmony in every aspect of your life." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card p-6 text-center group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(155,142,196,0.15))', color: 'var(--gold)' }}>
                  {s.icon}
                </div>
                <h3 className="font-playfair text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #f8f5ff, #fff8ec)' }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8">
          {stats.map((s, i) => <StatCounter key={i} {...s} />)}
        </div>
      </section>

      {/* Courses preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Transform Your Life" subtitle="Our certified Reiki courses are designed for all levels — from beginners to those seeking mastery." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewCourses.map((c, i) => <CourseCard key={i} course={c} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/courses" className="btn-outline">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #f5f0ff20, #faf8ff)' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="What Our Students Say" subtitle="Real stories of healing, growth, and transformation from our community." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/testimonials" className="btn-outline">Read More Stories</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 cta-bg text-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm tracking-widest uppercase mb-3 opacity-80">Begin Today</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Begin Your Healing Journey</h2>
          <p className="text-lg opacity-90 mb-10 leading-relaxed">Take the first step toward balance, peace, and transformation. Your healing starts here.</p>
          <Link to="/booking" className="inline-block bg-white font-semibold px-10 py-4 rounded-lg transition-all hover:shadow-2xl hover:-translate-y-1" style={{ color: 'var(--gold-dark)' }}>
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
