import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Booking from './pages/Booking'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

// Admin page has no Navbar/Footer
function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  if (isAdmin) return <Admin />

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  )
}

export default App
