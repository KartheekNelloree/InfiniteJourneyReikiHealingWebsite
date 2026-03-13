import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import CourseCard from '../components/CourseCard'

const courses = [
  {
    title: 'Reiki Level 1',
    subtitle: 'Shoden — Foundation',
    description: 'Begin your Reiki journey. Learn hand positions, self-healing techniques, the history of Reiki, and the five Reiki principles. This level opens your energy channels through attunement.',
    duration: '2 Days',
    mode: 'Online / Offline',
    price: '₹5,000',
    includes: ['Reiki Level 1 Attunement', 'Printed Manual & Certificate', 'Self-healing hand positions', '21-day cleanse guidance', 'Lifetime email support'],
  },
  {
    title: 'Reiki Level 2',
    subtitle: 'Okuden — Practitioner',
    description: 'Deepen your practice with three sacred Reiki symbols for mental, emotional, and distance healing. Begin offering healing to others with confidence and integrity.',
    duration: '2 Days',
    mode: 'Online / Offline',
    price: '₹8,000',
    includes: ['Level 2 Attunement', '3 sacred Reiki symbols', 'Distance healing techniques', 'Practice sessions', 'Business setup guide'],
    badge: 'Most Popular',
  },
  {
    title: 'Reiki Level 3 / Master',
    subtitle: 'Shinpiden — Mastery',
    description: 'Achieve mastery and become a Reiki Teacher. Learn the Usui master symbol, master attunement, and how to pass attunements to others. Start teaching Reiki.',
    duration: '3 Days',
    mode: 'Online / Offline',
    price: '₹15,000',
    includes: ['Master Teacher Attunement', 'Master Symbol training', 'How to pass attunements', 'Teaching curriculum', 'Advanced self-healing'],
  },
  {
    title: 'Reiki Grand Master',
    subtitle: 'Advanced Mastery',
    description: 'The highest level of Reiki mastery. Receive grand master attunements, advanced symbols, and become part of a lineage of grand masters. Includes business mentoring.',
    duration: '4 Days',
    mode: 'In-Person Only',
    price: '₹25,000',
    includes: ['Grand Master Attunement', 'Advanced symbols', 'Lineage certification', 'Business mentoring', 'Ongoing mentorship'],
    badge: 'Advanced',
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
        <p className="text-sm tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>Learn & Grow</p>
        <h1 className="font-playfair text-5xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Reiki Courses & Training</h1>
        <div className="gold-divider" />
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
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
