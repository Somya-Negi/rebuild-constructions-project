import Image from 'next/image';

/** Responsive, optimized Next image. Placeholder URLs are managed in src/data/site.js. */
export default function MediaImage({ src, alt, className = '', sizes = '100vw', priority = false }) {
  return <div className={`media-image ${className}`.trim()}>
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={75} className="media-image-content" />
  </div>;
}
