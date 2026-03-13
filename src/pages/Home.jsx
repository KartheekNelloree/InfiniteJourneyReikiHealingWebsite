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
  { name: 'Priya Menon', course: 'Reiki Level 1', initial: 'P', text: 'This course completely transformed how I experience my body and energy. Geetha is a gifted teacher and healer.' },
  { name: 'Rahul Verma', course: 'Reiki Level 2', initial: 'R', text: 'The distance healing session was incredible. I felt warmth and peace throughout. Highly recommend Infinite Journey.' },
  { name: 'Sneha Patel', course: 'Reiki Master', initial: 'S', text: 'Becoming a Reiki Master with Geetha changed my life. I now help others heal every day. Forever grateful.' },
]

const stats = [
  { number: 100, label: 'Students Trained', suffix: '+' },
  { number: 2, label: 'Years Practice', suffix: '+' },
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
    <div className="text-center px-8">
      <div
        className="font-playfair text-6xl font-bold mb-3"
        style={{
          background: 'linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.5))',
        }}
      >
        <span ref={ref}>0</span>{suffix}
      </div>
      <p className="text-sm tracking-widest uppercase font-medium" style={{ color: 'var(--purple)' }}>
        {label}
      </p>
    </div>
  )
}

/* ── Lotus SVG ── */
function LotusIcon({ size = 72, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="55" rx="12" ry="22" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.10)" />
      <ellipse cx="22" cy="50" rx="10" ry="19" stroke="#E8D5A3" strokeWidth="1.2" fill="rgba(232,213,163,0.07)" transform="rotate(-28 22 50)" />
      <ellipse cx="58" cy="50" rx="10" ry="19" stroke="#E8D5A3" strokeWidth="1.2" fill="rgba(232,213,163,0.07)" transform="rotate(28 58 50)" />
      <ellipse cx="9" cy="44" rx="8" ry="14" stroke="#9B8EC4" strokeWidth="1" fill="rgba(155,142,196,0.07)" transform="rotate(-50 9 44)" />
      <ellipse cx="71" cy="44" rx="8" ry="14" stroke="#9B8EC4" strokeWidth="1" fill="rgba(155,142,196,0.07)" transform="rotate(50 71 44)" />
      <line x1="40" y1="72" x2="40" y2="79" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="79" x2="28" y2="79" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="79" x2="52" y2="79" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Infinity SVG ── */
function InfinitySymbol() {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <path
        d="M160 80 C160 47 183 24 210 24 C237 24 260 47 260 80 C260 113 237 136 210 136 C183 136 160 113 160 80 Z"
        stroke="rgba(201,168,76,0.35)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M160 80 C160 113 137 136 110 136 C83 136 60 113 60 80 C60 47 83 24 110 24 C137 24 160 47 160 80 Z"
        stroke="rgba(201,168,76,0.35)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M160 80 C160 47 183 24 210 24 C237 24 260 47 260 80 C260 113 237 136 210 136 C183 136 160 113 160 80 Z"
        stroke="rgba(232,213,163,0.15)"
        strokeWidth="8"
        fill="rgba(201,168,76,0.04)"
      />
      <path
        d="M160 80 C160 113 137 136 110 136 C83 136 60 113 60 80 C60 47 83 24 110 24 C137 24 160 47 160 80 Z"
        stroke="rgba(232,213,163,0.15)"
        strokeWidth="8"
        fill="rgba(201,168,76,0.04)"
      />
      <circle cx="160" cy="80" r="5" fill="rgba(201,168,76,0.5)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 210 + 56 * Math.cos(rad)
        const cy = 80 + 56 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="2" fill="rgba(201,168,76,0.25)" />
      })}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 110 + 56 * Math.cos(rad)
        const cy = 80 + 56 * Math.sin(rad)
        return <circle key={`l${i}`} cx={cx} cy={cy} r="2" fill="rgba(201,168,76,0.25)" />
      })}
    </svg>
  )
}

/* ── Mandala SVG ── */
function MandalaSVG() {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="120" cy="120" r="114" stroke="#E8D5A3" strokeWidth="0.8" opacity="0.5" />
      <circle cx="120" cy="120" r="100" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="5 5" opacity="0.6" />
      <circle cx="120" cy="120" r="80" stroke="#9B8EC4" strokeWidth="1" opacity="0.5" />
      <circle cx="120" cy="120" r="60" stroke="#C9A84C" strokeWidth="1.2" opacity="0.7" />
      <circle cx="120" cy="120" r="40" stroke="#C9A84C" strokeWidth="1.5" opacity="0.8" />
      <circle cx="120" cy="120" r="20" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="120" cy="120" r="8" fill="rgba(201,168,76,0.5)" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 120 + 22 * Math.cos(rad)
        const y1 = 120 + 22 * Math.sin(rad)
        const x2 = 120 + 58 * Math.cos(rad)
        const y2 = 120 + 58 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A84C" strokeWidth="0.7" opacity="0.6" />
      })}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 120 + 60 * Math.cos(rad)
        const cy = 120 + 60 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="7" fill="rgba(155,142,196,0.3)" stroke="#9B8EC4" strokeWidth="1" />
      })}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 120 + 80 * Math.cos(rad)
        const cy = 120 + 80 * Math.sin(rad)
        return <circle key={`o${i}`} cx={cx} cy={cy} r="4" fill="rgba(201,168,76,0.25)" stroke="#C9A84C" strokeWidth="0.8" />
      })}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 120 + 100 * Math.cos(rad)
        const cy = 120 + 100 * Math.sin(rad)
        return <circle key={`rim${i}`} cx={cx} cy={cy} r="2.5" fill="rgba(232,213,163,0.4)" />
      })}
    </svg>
  )
}

export default function Home() {
  return (
    <div>

      {/* ── Hero ── */}
      <section
        className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #fdf8ef 60%, #f0f4ff 100%)' }}
      >
        {/* Background texture overlay */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='80' viewBox='0 0 160 80'%3E%3Cpath d='M80,40 C80,20 100,10 116,20 C132,30 140,47 127,59 C114,71 93,64 80,50 C67,64 46,71 33,59 C20,47 28,30 44,20 C60,10 80,20 80,40Z' fill='none' stroke='rgba(201,168,76,0.15)' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat', backgroundSize: '160px 80px',
          }}
        />

        {/* Gold glow orb — top right */}
        <div
          style={{
            position: 'absolute', top: '-120px', right: '-80px',
            width: '520px', height: '520px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.06) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Purple glow orb — bottom left */}
        <div
          style={{
            position: 'absolute', bottom: '-100px', left: '-100px',
            width: '480px', height: '480px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(155,142,196,0.2) 0%, rgba(155,142,196,0.06) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Subtle gold orb — center bottom */}
        <div
          style={{
            position: 'absolute', bottom: '10%', right: '15%',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Infinity symbol — large decorative, right side */}
        <div
          style={{
            position: 'absolute', right: '-60px', top: '50%',
            transform: 'translateY(-50%)',
            width: '480px', height: '240px',
            opacity: 0.45,
            pointerEvents: 'none',
          }}
        >
          <InfinitySymbol />
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-6 text-center relative fade-up" style={{ zIndex: 10 }}>

          {/* Floating lotus */}
          <div className="flex justify-center mb-8 float">
            <LotusIcon size={80} />
          </div>

          {/* Eyebrow label */}
          <p
            className="text-xs tracking-widest uppercase mb-5 font-medium"
            style={{ color: 'var(--gold)', letterSpacing: '0.25em' }}
          >
            Infinite Journey Reiki Healing Center
          </p>

          {/* Hero headline */}
          <h1
            className="font-playfair font-bold mb-6 leading-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: 'var(--dark)' }}
          >
            Heal.{' '}
            <span className="text-gradient">Balance.</span>
            <br />
            Transform.
          </h1>

          {/* Tagline */}
          <p
            className="text-lg mb-4 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--gold-dark)' }}
          >
            Geetha — Reiki Growth Coach &amp; Master Healer
          </p>
          <p
            className="text-base mb-10 max-w-xl mx-auto"
            style={{ color: 'rgba(60,40,80,0.55)', letterSpacing: '0.04em' }}
          >
            Marathahalli, Bangalore &nbsp;&bull;&nbsp; Online &amp; In-Person Sessions
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-primary text-base px-9 py-4">
              Book a Consultation
            </Link>
            <Link
              to="/courses"
              className="text-base px-9 py-4 rounded-lg font-bold uppercase tracking-widest transition-all inline-block"
              style={{
                border: '2px solid rgba(201,168,76,0.6)',
                color: 'var(--gold)',
                background: 'transparent',
                fontSize: '0.88rem',
                letterSpacing: '0.06em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(201,168,76,0.15)'
                e.currentTarget.style.borderColor = 'var(--gold)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Explore Courses
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2" style={{ color: 'rgba(60,40,80,0.35)' }}>
            <span className="text-xs tracking-widest uppercase" style={{ letterSpacing: '0.2em' }}>Scroll</span>
            <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 16 24">
              <rect x="2" y="2" width="12" height="20" rx="6" strokeWidth="1.2" />
              <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── About Reiki ── */}
      <section className="py-28 px-6" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* Text side */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-4 font-bold"
              style={{ color: 'var(--gold)', letterSpacing: '0.22em' }}
            >
              Ancient Wisdom
            </p>
            <h2 className="section-heading mb-2">What is Reiki Healing?</h2>
            <div className="gold-divider-left mb-7" />
            <p className="leading-relaxed mb-6" style={{ color: 'var(--text)', opacity: 0.8 }}>
              Reiki is a Japanese technique for stress reduction and relaxation that also promotes healing. It works by channeling universal life energy through the practitioner's hands to the recipient, stimulating the body's natural healing abilities.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--text)', opacity: 0.7 }}>
              Developed by Mikao Usui in early 20th century Japan, Reiki addresses the whole person — body, mind, and spirit — creating harmony and inner peace that forms the foundation of lasting wellbeing.
            </p>
            <ul className="space-y-4">
              {[
                'Reduces stress, anxiety & emotional blockages',
                'Accelerates physical and spiritual healing',
                'Restores energy flow and chakra balance',
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(155,142,196,0.2))', border: '1px solid rgba(201,168,76,0.3)' }}
                  >
                    <svg className="w-3.5 h-3.5" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span style={{ color: 'var(--text)' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandala side */}
          <div className="flex justify-center">
            <div
              className="relative"
              style={{ width: '340px', height: '340px' }}
            >
              {/* Outer glow ring */}
              <div
                style={{
                  position: 'absolute', inset: '-20px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(155,142,196,0.06) 50%, transparent 70%)',
                }}
              />
              {/* Spinning wrapper */}
              <div
                style={{
                  width: '100%', height: '100%',
                  animation: 'spin 40s linear infinite',
                }}
              >
                <MandalaSVG />
              </div>
              {/* Center label (counter-rotating so it stays upright) */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <div className="text-center">
                  <p
                    className="font-playfair font-bold text-xl"
                    style={{ color: 'var(--gold)' }}
                  >
                    Universal
                  </p>
                  <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--purple)', letterSpacing: '0.18em' }}>
                    Life Energy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline keyframe for spin — injected via style tag */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </section>

      {/* ── Services ── */}
      <section className="py-28 px-6 band-light">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Our Healing Services"
            subtitle="Comprehensive energy healing services designed to restore balance and harmony in every aspect of your life."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-4">
            {services.map((s, i) => (
              <div
                key={i}
                className="card p-8 text-center group"
                style={{
                  background: 'white',
                  borderTop: '3px solid transparent',
                  backgroundClip: 'padding-box',
                  position: 'relative',
                }}
              >
                {/* Gradient top border via pseudo simulation */}
                <div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: 'linear-gradient(90deg, var(--gold), var(--purple), var(--gold-light))',
                    borderRadius: '1.25rem 1.25rem 0 0',
                  }}
                />
                <div className="service-icon" style={{ width: '68px', height: '68px' }}>
                  {s.icon}
                </div>
                <h3 className="font-playfair text-lg font-semibold mb-3" style={{ color: 'var(--dark)' }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text)', opacity: 0.75 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #fdf8ef 50%, #f0f4ff 100%)' }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
          <p
            className="text-center text-xs tracking-widest uppercase mb-12 font-medium"
            style={{ color: 'var(--gold)', letterSpacing: '0.25em' }}
          >
            Our Journey In Numbers
          </p>
          <div className="grid grid-cols-3 gap-0">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center">
                <StatCounter {...s} />
                {i < stats.length - 1 && (
                  <div
                    style={{
                      width: '1px', height: '80px',
                      background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)',
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses Preview ── */}
      <section className="py-28 px-6" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Transform Your Life"
            subtitle="Our certified Reiki courses are designed for all levels — from beginners to those seeking mastery."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {previewCourses.map((c, i) => (
              <CourseCard key={i} course={c} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses" className="btn-outline text-base px-10 py-4">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-28 px-6 band-light">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="What Our Students Say"
            subtitle="Real stories of healing, growth, and transformation from our community."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-4">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-8 relative" style={{ background: 'white' }}>
                {/* Large gold quote mark */}
                <div
                  className="font-playfair font-bold leading-none mb-4 select-none"
                  style={{
                    fontSize: '5rem',
                    lineHeight: '0.8',
                    color: 'var(--gold)',
                    opacity: 0.25,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  &ldquo;
                </div>
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/testimonials" className="btn-outline text-base px-10 py-4">
              Read More Stories
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 cta-bg text-white text-center relative">
        {/* Extra radial gold glow */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)',
          }}
        />
        <div className="max-w-2xl mx-auto relative" style={{ zIndex: 1 }}>
          {/* Floating lotus decoration */}
          <div className="flex justify-center mb-6 float">
            <LotusIcon size={52} />
          </div>

          <p
            className="text-xs tracking-widest uppercase mb-4 font-medium"
            style={{ color: 'rgba(201,168,76,0.7)', letterSpacing: '0.25em' }}
          >
            Begin Today
          </p>
          <h2
            className="font-playfair font-bold mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Begin Your{' '}
            <span className="text-gradient">Healing Journey</span>
          </h2>
          <p
            className="text-lg mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 2.5rem' }}
          >
            Take the first step toward balance, peace, and transformation. Your healing starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/booking" className="btn-white text-base px-10 py-4">
              Book a Consultation
            </Link>
            <Link
              to="/courses"
              className="text-base px-10 py-4 rounded-lg font-bold uppercase tracking-widest transition-all inline-block"
              style={{
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.85)',
                background: 'transparent',
                fontSize: '0.88rem',
                letterSpacing: '0.06em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
