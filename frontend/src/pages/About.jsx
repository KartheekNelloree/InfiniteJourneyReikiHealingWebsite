import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const certifications = [
  { year: '2012', title: 'Usui Reiki Level 1 & 2', org: 'International Reiki Association' },
  { year: '2014', title: 'Reiki Master Teacher', org: 'Usui Shiki Ryoho Lineage' },
  { year: '2016', title: 'Karuna Reiki® Master', org: 'International Center for Reiki Training' },
  { year: '2018', title: 'Crystal Healing Certification', org: 'Himalayan Institute of Healing Arts' },
  { year: '2020', title: 'Theta Healing Practitioner', org: 'THInK — ThetaHealing Institute' },
  { year: '2023', title: 'Grand Master Certification', org: 'World Reiki Federation' },
]

const features = [
  { icon: '🌸', title: 'Certified & Experienced', desc: 'Over 10 years of certified practice with more than 500 students trained across India and globally.' },
  { icon: '🔮', title: 'Personalized Approach', desc: 'Each session and course is tailored to your unique energy, intentions, and healing needs.' },
  { icon: '🌍', title: 'Global Reach', desc: 'Distance healing and online courses allow us to serve clients and students worldwide.' },
  { icon: '✨', title: 'Holistic Healing', desc: 'Combining Reiki with crystal therapy, chakra work, and meditation for complete wellbeing.' },
]

export default function About() {
  return (
    <div className="pt-20">
      {/* Page Hero */}
      <div className="page-hero">
        <p className="text-sm tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>Our Story</p>
        <h1 className="font-playfair text-5xl font-bold mb-4" style={{ color: 'var(--dark)' }}>About Our Healer</h1>
        <div className="gold-divider" />
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">Meet the heart and soul behind Ananda Reiki Healing Center</p>
      </div>

      {/* Healer Bio */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--purple-light), var(--gold-light))' }}>
                <svg className="w-32 h-32 opacity-60" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="35" r="18" fill="#9B8EC4" />
                  <ellipse cx="50" cy="80" rx="28" ry="22" fill="#9B8EC4" />
                </svg>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed" style={{ borderColor: 'var(--gold)', opacity: 0.4 }} />
              <div className="absolute -inset-6 rounded-full border" style={{ borderColor: 'var(--purple)', opacity: 0.2 }} />
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm tracking-widest uppercase mb-2 font-medium" style={{ color: 'var(--gold)' }}>Your Healer</p>
            <h2 className="font-playfair text-4xl font-bold mb-1" style={{ color: 'var(--dark)' }}>Dr. Priya Sharma</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--purple)' }}>Reiki Grand Master | Energy Healer | Teacher</p>
            <div className="gold-divider mx-0 mb-6" />
            <p className="text-gray-500 leading-relaxed mb-4">
              Dr. Priya Sharma's journey with Reiki began over a decade ago during a period of personal healing. What started as a search for inner peace became a profound calling — to guide others on their path of healing and spiritual awakening.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              With certifications spanning Usui Reiki, Karuna Reiki®, Crystal Healing, and Theta Healing, Priya brings a holistic and deeply compassionate approach to every session and course she offers. She has trained over 500 students across India and internationally.
            </p>
            <ul className="space-y-2 mb-8">
              {['Reiki Grand Master — Usui Shiki Ryoho Lineage', '10+ years of professional healing practice', '500+ students trained globally', 'Specializes in trauma healing & chakra alignment'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/booking" className="btn-primary">Book a Session</Link>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #f8f5ff, #faf8ff)' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Our Philosophy" subtitle="Every soul deserves healing. Every life deserves balance." />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Our Philosophy', icon: '☯️', text: 'We believe that healing begins within. Reiki is not just a practice — it is a way of living with intention, compassion, and universal love.' },
              { title: 'Our Mission', icon: '🌱', text: 'To make authentic Reiki healing accessible to all, empowering individuals to heal themselves and others through certified training and dedicated practice.' },
              { title: 'Our Vision', icon: '🌟', text: 'A world where every person has access to holistic healing tools and the knowledge to support their physical, emotional, and spiritual wellbeing.' },
            ].map((item, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-playfair text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Training & Certifications" subtitle="A journey of continuous learning and growth." />
          <div className="space-y-6">
            {certifications.map((cert, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="shrink-0 w-16 text-right">
                  <span className="text-sm font-bold" style={{ color: 'var(--gold)' }}>{cert.year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full mt-1" style={{ background: 'var(--purple)' }} />
                  {i < certifications.length - 1 && <div className="w-0.5 h-12 mt-1" style={{ background: 'var(--purple-light)' }} />}
                </div>
                <div className="pb-4">
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{cert.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 cta-bg text-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Why Choose Ananda?" subtitle="What sets our healing center apart." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-playfair text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
