import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="text-white" style={{ background: '#1e1a2e' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo.png" alt="Infinite Journey" className="h-12 w-auto object-contain" />
              <div>
                <p className="font-playfair text-lg font-bold" style={{ color: 'var(--gold)' }}>Infinite Journey</p>
                <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--purple-light)' }}>Reiki Healing Center</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Guiding you on a journey of healing, balance, and spiritual awakening through the ancient art of Reiki.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-playfair text-lg mb-4" style={{ color: 'var(--gold-light)' }}>Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/courses', label: 'Courses' },
                { to: '/testimonials', label: 'Testimonials' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-playfair text-lg mb-4" style={{ color: 'var(--gold-light)' }}>Our Courses</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Reiki Level 1 – Shoden</li>
              <li>Reiki Level 2 – Okuden</li>
              <li>Reiki Level 3 – Shinpiden</li>
              <li>Reiki Grand Master</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg mb-4" style={{ color: 'var(--gold-light)' }}>Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Marathahalli, Bangalore 560037
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 9886777793
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                infinitejourney.8886@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-2">
          <p>© {new Date().getFullYear()} Infinite Journey Reiki Healing Center. All rights reserved.</p>
          <p>Made with ♡ for healing & transformation</p>
        </div>
      </div>
    </footer>
  )
}
