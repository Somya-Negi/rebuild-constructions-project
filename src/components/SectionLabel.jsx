export default function SectionLabel({ children, light = false, className = '' }) {
  return <span className={`section-label ${light ? 'section-label-light' : ''} ${className}`.trim()}>
    <span className="section-label-line" aria-hidden="true" />{children}
  </span>;
}
