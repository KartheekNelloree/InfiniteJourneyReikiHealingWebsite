import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/98 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(to right, var(--gold), var(--purple), var(--gold))' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-3 leading-tight">
            <img src="/logo.png" alt="Infinite Journey Logo" className="h-14 w-auto object-contain drop-shadow-sm" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl font-bold tracking-wide" style={{ color: 'var(--gold)' }}>
                Geetha
              </span>
              <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--purple)' }}>
                Reiki Growth Coach
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-sm font-medium ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/booking" className="btn-primary text-sm px-5 py-2.5">
              Book Consultation
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 transition-all duration-300" style={{ background: 'var(--gold)', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : '' }} />
              <span className="block h-0.5 w-6 transition-all duration-300" style={{ background: 'var(--gold)', opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-0.5 w-6 transition-all duration-300" style={{ background: 'var(--gold)', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : '' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} bg-white/98 backdrop-blur-md border-t border-gray-100`}>
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`nav-link text-base font-medium py-1 ${location.pathname === link.to ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
          <Link to="/booking" className="btn-primary text-center text-sm mt-2">Book Consultation</Link>
        </div>
      </div>
    </nav>
  )
}
