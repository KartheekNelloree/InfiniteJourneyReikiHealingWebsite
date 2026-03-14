import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import CourseCard from '../components/CourseCard'

const courses = [
  {
    title: 'Reiki Level 1',
    subtitle: 'Foundation',
    description: 'Begin your Reiki journey. Learn hand positions, self-healing techniques, the history of Reiki, and the five Reiki principles. This level opens your energy channels through attunement.',
    duration: '2 Days',
    mode: 'Online / Offline',
    price: '₹5,000',
    includes: ['Reiki Level 1 Attunement', 'Printed Manual & Certificate', 'Self-healing hand positions', '21-day cleanse guidance', 'Lifetime email support'],
  },
  {
    title: 'Reiki Level 2',
    subtitle: 'Practitioner',
    description: 'Deepen your practice with three sacred Reiki symbols for mental, emotional, and distance healing. Begin offering healing to others with confidence and integrity.',
    duration: '2 Days',
    mode: 'Online / Offline',
    price: '₹8,000',
    includes: ['Level 2 Attunement', '3 sacred Reiki symbols', 'Distance healing techniques', 'Practice sessions', 'Business setup guide'],
    badge: 'Most Popular',
  },
  {
    title: 'Reiki Level 3',
    subtitle: 'Advanced Practitioner',
    description: 'Advance your healing abilities with deeper symbols and techniques. Strengthen your energy field and expand your capacity to heal others at a profound level.',
    duration: '2 Days',
    mode: 'Online / Offline',
    price: '₹12,000',
    includes: ['Level 3 Attunement', 'Advanced symbols', 'Deep healing techniques', 'Practice sessions', 'Certificate'],
  },
  {
    title: 'Reiki Master Level',
    subtitle: 'Mastery & Teaching',
    description: 'Achieve mastery and become a Reiki Teacher. Learn the Usui master symbol, master attunement, and how to pass attunements to others. Start teaching Reiki.',
    duration: '3 Days',
    mode: 'Online / Offline',
    price: '₹15,000',
    includes: ['Master Teacher Attunement', 'Master Symbol training', 'How to pass attunements', 'Teaching curriculum', 'Advanced self-healing'],
  },
  {
    title: 'Karuna Reiki',
    subtitle: 'Compassion Healing',
    description: 'A powerful system of healing developed by William Rand. Karuna Reiki uses compassion-based symbols to work on a deeper soul level for profound transformation.',
    duration: '2 Days',
    mode: 'Online / Offline',
    price: '₹10,000',
    includes: ['Karuna Reiki Attunement', 'Karuna symbols', 'Compassion healing techniques', 'Manual & Certificate', 'Practice sessions'],
  },
  {
    title: 'Money Reiki',
    subtitle: 'Abundance & Prosperity',
    description: 'Remove money blockages and invite abundance into your life. Money Reiki works on your relationship with wealth, clearing limiting beliefs and opening channels of prosperity.',
    duration: '1 Day',
    mode: 'Online / Offline',
    price: '₹6,000',
    includes: ['Money Reiki Attunement', 'Abundance symbols', 'Prosperity techniques', 'Affirmation practices', 'Certificate'],
  },
  {
    title: 'Chakra Balancing Reiki',
    subtitle: 'Energy Center Healing',
    description: 'Learn to identify, assess, and balance all 7 major chakras using Reiki energy. Restore harmony to your physical, emotional, and spiritual wellbeing.',
    duration: '1 Day',
    mode: 'Online / Offline',
    price: '₹5,000',
    includes: ['Chakra attunement', '7 chakra healing techniques', 'Pendulum dowsing basics', 'Chakra charts', 'Certificate'],
  },
  {
    title: 'Distance Reiki Healing',
    subtitle: 'Remote Healing Mastery',
    description: 'Master the art of sending healing energy across time and space. Learn distance healing symbols, techniques, and protocols to heal anyone anywhere in the world.',
    duration: '1 Day',
    mode: 'Online / Offline',
    price: '₹5,000',
    includes: ['Distance healing symbols', 'Remote session protocols', 'Practice sessions', 'Record-keeping guidance', 'Certificate'],
  },
  {
    title: 'Aura Cleansing Reiki',
    subtitle: 'Energetic Purification',
    description: 'Learn to see, sense, and cleanse the human aura. Remove negative energies, cords, and attachments to restore your energetic boundaries and vitality.',
    duration: '1 Day',
    mode: 'Online / Offline',
    price: '₹5,000',
    includes: ['Aura scanning techniques', 'Cleansing protocols', 'Protection practices', 'Cord cutting methods', 'Certificate'],
  },
  {
    title: 'Crystal Reiki Healing',
    subtitle: 'Crystal & Energy Fusion',
    description: 'Combine the power of crystals with Reiki energy for amplified healing. Learn crystal grids, placement techniques, and how to programme crystals with Reiki.',
    duration: '1 Day',
    mode: 'Online / Offline',
    price: '₹6,000',
    includes: ['Crystal Reiki attunement', 'Crystal grid layouts', 'Crystal programming', 'Healing placement guide', 'Certificate'],
  },
  {
    title: 'Emotional Healing Reiki',
    subtitle: 'Inner Peace & Release',
    description: 'Release stored emotional trauma, grief, anger, and fear using specialised Reiki techniques. Achieve lasting emotional balance, inner peace, and mental clarity.',
    duration: '1 Day',
    mode: 'Online / Offline',
    price: '₹5,000',
    includes: ['Emotional healing symbols', 'Trauma release techniques', 'Inner child healing', 'Journaling practices', 'Certificate'],
  },
  {
    title: 'Meditation & Reiki Healing ✨',
    subtitle: 'Mind, Body & Spirit',
    description: 'A beautiful fusion of guided meditation and Reiki healing. Cultivate deep stillness, connect with your higher self, and experience profound relaxation and spiritual growth.',
    duration: '1 Day',
    mode: 'Online / Offline',
    price: '₹5,000',
    includes: ['Guided meditation practices', 'Reiki-infused meditations', 'Breathwork techniques', 'Daily practice routines', 'Certificate'],
    badge: 'New',
  },
]

const faqs = [
  { q: 'Do I need any prior experience to join Reiki Level 1?', a: 'No prior experience is needed. Reiki Level 1 is perfect for complete beginners. All you need is an open mind and the willingness to learn.' },
  { q: 'Can I take Reiki courses online?', a: 'Yes! Levels 1, 2, and 3 are available both online and offline. Distance learning has been proven equally effective for Reiki training and attunements.' },
  { q: 'How long does it take to become a Reiki Master?', a: 'There is no fixed timeline. Most students complete Levels 1 and 2 within a few months, with Level 3/Master following after sufficient practice. We recommend at least 3 months between levels.' },
  { q: 'What certificate will I receive after completing the course?', a: 'You will receive a course completion certificate upon finishing each level. This certifies your attunement and training under your Reiki Growth Coach.' },
]

export default function Courses() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="pt-20">
      {/* Page Hero */}
      <div className="page-hero">
        <p className="text-sm tracking-widest uppercase mb-3 font-bold" style={{ color: '#6b4c00' }}>Learn & Grow</p>
        <h1 className="font-playfair text-5xl font-bold mb-4" style={{ color: '#0d0b1a' }}>Reiki Courses & Training</h1>
        <div className="gold-divider" />
        <p className="mt-4 max-w-xl mx-auto font-medium" style={{ color: '#3d3a50' }}>
          Programs for every level — from curious beginners to aspiring Reiki Masters.
        </p>
      </div>

      {/* Intro */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 leading-relaxed text-base">
            Our Reiki courses are structured along the traditional Usui Shiki Ryoho system. Each level builds on the previous, deepening your connection to universal life energy. All courses include attunement, printed materials, and a course completion certificate.
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {courses.map((c, i) => <CourseCard key={i} course={c} />)}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #f8f5ff, #faf8ff)' }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know before enrolling." />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: 'var(--dark)' }}>{faq.q}</span>
                  <span className="text-xl shrink-0 transition-transform duration-300" style={{ color: 'var(--gold)', transform: openFaq === i ? 'rotate(45deg)' : '' }}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 cta-bg text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold mb-4">Ready to Begin?</h2>
          <p className="opacity-90 mb-8 leading-relaxed">Book a free consultation to find the right course for your healing journey.</p>
          <Link to="/booking" className="inline-block bg-white font-semibold px-8 py-4 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all" style={{ color: 'var(--gold-dark)' }}>
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
