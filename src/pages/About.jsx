import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const journey = [
  { icon: '🌱', title: 'The Beginning', desc: 'Geetha\'s journey into Reiki began with a personal search for inner peace and holistic healing, discovering the transformative power of universal life energy.' },
  { icon: '🙏', title: 'Training at Kalpatharu', desc: 'She completed her Reiki training at the renowned Kalpatharu Training Center in Bengaluru, under the expert guidance of Master Gurudutt V Marathe.' },
  { icon: '✨', title: 'Growing Practice', desc: 'With 2+ years of dedicated healing practice, Geetha has guided 100+ students on their journey of healing, balance, and spiritual awakening.' },
]

const features = [
  { icon: '🌸', title: 'Dedicated Practice', desc: '2+ years of dedicated Reiki practice with 100+ students guided on their healing journey.' },
  { icon: '🔮', title: 'Personalized Approach', desc: 'Each session and course is tailored to your unique energy, intentions, and healing needs.' },
  { icon: '🙏', title: 'Expert Guidance', desc: 'Trained under Master Gurudutt V Marathe at Kalpatharu Training Center, Bengaluru.' },
  { icon: '✨', title: 'Holistic Healing', desc: 'Combining Reiki with chakra work and meditation for complete mind, body and soul wellbeing.' },
]

export default function About() {
  return (
    <div className="pt-20">
      {/* Page Hero */}
      <div className="page-hero">
        <p className="text-sm tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>Our Story</p>
        <h1 className="font-playfair text-5xl font-bold mb-4" style={{ color: 'var(--dark)' }}>About Our Healer</h1>
        <div className="gold-divider" />
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">Meet the heart and soul behind Infinite Journey Reiki Healing Center</p>
      </div>

      {/* Healer Bio */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(155,142,196,0.25))', filter: 'blur(12px)' }} />
              {/* Dashed ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed" style={{ borderColor: 'var(--gold)', opacity: 0.5 }} />
              {/* Inner ring */}
              <div className="absolute -inset-1 rounded-full border-2" style={{ borderColor: 'var(--purple-light)' }} />
              {/* Photo */}
              <img
                src="/geetha.jpg"
                alt="Geetha — Reiki Growth Coach"
                className="w-80 h-80 rounded-full object-cover relative z-10"
                style={{ objectPosition: 'center 15%', boxShadow: '0 20px 50px rgba(155,142,196,0.35)' }}
              />
              {/* Badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-wide whitespace-nowrap" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', boxShadow: '0 4px 15px rgba(201,168,76,0.4)' }}>
                Reiki Growth Coach
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm tracking-widest uppercase mb-2 font-medium" style={{ color: 'var(--gold)' }}>Your Healer</p>
            <h2 className="font-playfair text-4xl font-bold mb-1" style={{ color: 'var(--dark)' }}>Geetha</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--purple)' }}>Reiki Growth Coach</p>
            <div className="gold-divider mx-0 mb-6" />
            <p className="text-gray-500 leading-relaxed mb-4">
              Geetha's journey with Reiki began with a heartfelt search for inner peace and holistic wellness. What started as a personal exploration became a deep calling — to guide others on their path of healing, balance, and spiritual awakening.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Trained under the guidance of Master Gurudutt V Marathe at the Kalpatharu Training Center in Bengaluru, Geetha brings a compassionate and grounded approach to every healing session and Reiki course she offers. Her practice is rooted in authentic Reiki principles, mindfulness, and a genuine desire to help every student unlock their natural healing potential.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Reiki Growth Coach',
                '2+ years of dedicated healing practice',
                '100+ students guided on their Reiki journey',
                'Trained under Master Gurudutt V Marathe, Bengaluru',
                'Training completed at Kalpatharu Training Center',
                'Offers in-person & online healing sessions',
              ].map((item, i) => (
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

      {/* Journey Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="The Healing Journey" subtitle="A path of dedication, learning, and authentic practice." />
          <div className="grid md:grid-cols-3 gap-8">
            {journey.map((item, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-playfair text-xl font-semibold mb-3" style={{ color: 'var(--dark)' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 cta-bg text-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Why Choose Infinite Journey?" subtitle="What sets our healing center apart." />
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
