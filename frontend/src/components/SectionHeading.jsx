export default function SectionHeading({ title, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="section-heading mb-4">{title}</h2>
      <div className={`gold-divider ${center ? '' : 'mx-0'}`} />
      {subtitle && (
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
