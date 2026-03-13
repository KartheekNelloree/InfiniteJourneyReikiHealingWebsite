import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import TestimonialCard from '../components/TestimonialCard'

const testimonials = [
  { name: 'Priya Menon', course: 'Reiki Level 1', initial: 'P', text: 'This course completely transformed how I experience my body and energy. Dr. Sharma is a gifted teacher and healer. I feel lighter and more centred every single day.' },
  { name: 'Rahul Verma', course: 'Reiki Level 2', initial: 'R', text: 'The distance healing session was incredible. I felt warmth and a wave of peace throughout my body. I had been struggling with anxiety for years — this changed everything.' },
  { name: 'Sneha Patel', course: 'Reiki Master', initial: 'S', text: 'Becoming a Reiki Master with Ananda changed my life. I now help others heal every single day. Dr. Priya is an exceptional mentor and I am forever grateful.' },
  { name: 'Amit Singh', course: 'Chakra Balancing', initial: 'A', text: 'After my chakra balancing session, I felt a renewed sense of clarity and purpose. The session was deeply relaxing and I slept better than I had in months.' },
  { name: 'Divya Nair', course: 'Reiki Level 1', initial: 'D', text: 'I was sceptical at first but after just one session I was completely convinced. The energy shift was real and profound. Highly recommend to anyone on a healing journey.' },
  { name: 'Karthik Rao', course: 'Reiki Level 2', initial: 'K', text: 'Learning Reiki Level 2 opened a whole new dimension for me. The symbols are powerful and the teaching was so clear and compassionate. Thank you, Ananda.' },
]

const videoTestimonials = [
  { name: 'Meera Iyer', title: 'My Reiki Master Journey', duration: '4:32' },
  { name: 'Arjun Sharma', title: 'How Reiki Healed My Chronic Pain', duration: '6:15' },
  { name: 'Lalitha Devi', title: 'Distance Healing Experience', duration: '3:48' },
]

export default function Testimonials() {
  return (
    <div className="pt-20">
      {/* Page Hero */}
      <div className="page-hero">
        <p className="text-sm tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>Real Transformations</p>
        <h1 className="font-playfair text-5xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Student Testimonials</h1>
        <div className="gold-divider" />
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">Hear from those whose lives have been transformed through Reiki healing and training.</p>
      </div>

      {/* Testimonials Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="What Our Students Say" subtitle="Authentic stories of healing, growth, and spiritual awakening." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #f8f5ff, #faf8ff)' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Video Stories" subtitle="Watch our students share their healing journeys." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTestimonials.map((v, i) => (
              <div key={i} className="card overflow-hidden cursor-pointer group">
                {/* Video placeholder */}
                <div
                  className="relative h-48 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #D4CCE8, #E8D5A3)' }}
                >
                  <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 ml-1" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="absolute bottom-3 right-3 text-xs bg-black/40 text-white px-2 py-1 rounded">{v.duration}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--dark)' }}>{v.title}</h3>
                  <p className="text-xs text-gray-400">{v.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { number: '500+', label: 'Students Trained' },
            { number: '4.9★', label: 'Average Rating' },
            { number: '100%', label: 'Recommended Us' },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-playfair text-4xl font-bold mb-1" style={{ color: 'var(--gold)' }}>{s.number}</div>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 cta-bg text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold mb-4">Your Story Begins Here</h2>
          <p className="opacity-90 mb-8">Join hundreds of students who have transformed their lives through Reiki.</p>
          <Link to="/booking" className="inline-block bg-white font-semibold px-8 py-4 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all" style={{ color: 'var(--gold-dark)' }}>
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  )
}
