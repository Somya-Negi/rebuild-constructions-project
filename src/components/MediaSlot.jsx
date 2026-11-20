import MediaImage from '@/components/MediaImage';
import VideoPlayer from '@/components/VideoPlayer';

/** Render genuine media when configured, otherwise an intentionally empty slot. */
export default function MediaSlot({ type = 'photo', title, note = '', featured = false, index = 1, src = '', alt = '', poster = '', autoplay = false, contain = false }) {
  const classes = `media-slot-v4 ${type === 'video' ? 'media-slot-video-v4' : 'media-slot-photo-v4'} ${featured ? 'media-slot-featured-v4' : ''}`;
  if (src && type === 'video') return <figure className={`${classes} media-slot-loaded-v4`}>
    <VideoPlayer src={src} poster={poster} title={title} autoplay={autoplay} />
    <figcaption>{title}</figcaption>
  </figure>;
  if (src) return <figure className={`${classes} media-slot-loaded-v4`}>
    <MediaImage src={src} alt={alt || title} className={`media-slot-photo-loaded-v4${contain ? ' media-slot-photo-contain' : ''}`} sizes="(max-width: 640px) 100vw, 50vw" />
    <figcaption>{title}</figcaption>
  </figure>;
  return <div className={classes} role="img" aria-label={`${title} image or video space`}>
    <span className="media-slot-top">{type === 'video' ? 'VIDEO' : 'PHOTO'} / {String(index).padStart(2, '0')}</span>
    <div className="media-slot-center"><span className="media-slot-outline" aria-hidden="true">{type === 'video' ? '▶' : '▧'}</span><strong>{title}</strong>{note && <small>{note}</small>}</div>
    <span className="media-slot-bottom">{type === 'video' ? 'WALKTHROUGH SPACE' : 'PROJECT PHOTO SPACE'}</span>
  </div>;
}
