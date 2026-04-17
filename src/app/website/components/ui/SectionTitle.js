export default function SectionTitle({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className={`w-20 h-1 bg-blue-600 ${centered ? 'mx-auto' : ''}`}></div>
      {subtitle && (
        <p className={`text-gray-600 mt-4 max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}