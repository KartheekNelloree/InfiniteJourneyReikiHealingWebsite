import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  const { title, subtitle, description, duration, mode, price, includes, badge } = course

  return (
    <div className="card flex flex-col h-full">
      {/* Header gradient */}
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #7A6BA3 0%, #9B8EC4 50%, #C9A84C 100%)',
        }}
      >
        {badge && (
          <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            {badge}
          </span>
        )}
        <p className="text-xs tracking-widest uppercase opacity-80 mb-1">{subtitle}</p>
        <h3 className="font-playfair text-xl font-semibold">{title}</h3>
        <p className="text-2xl font-bold mt-2">{price}</p>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex gap-4 mb-5 text-sm">
          <span className="flex items-center gap-1 text-gray-600">
            <svg className="w-4 h-4" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <svg className="w-4 h-4" style={{ color: 'var(--purple)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
            </svg>
            {mode}
          </span>
        </div>

        {includes && (
          <ul className="space-y-2 mb-6 flex-1">
            {includes.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        )}

        <Link to="/booking" className="btn-primary text-center text-sm mt-auto block">
          Enroll Now
        </Link>
      </div>
    </div>
  )
}
