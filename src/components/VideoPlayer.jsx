'use client';

import { RotateCcw, RotateCw } from 'lucide-react';
import { useRef } from 'react';

export default function VideoPlayer({ src, poster = '', title, autoplay = false, onLoadedMetadata }) {
  const videoRef = useRef(null);

  const seekBy = seconds => {
    const video = videoRef.current;
    if (!video) return;
    const duration = Number.isFinite(video.duration) ? video.duration : Infinity;
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), duration);
    video.focus({ preventScroll: true });
  };

  return <>
    <video ref={videoRef} controls muted defaultMuted autoPlay={autoplay} playsInline preload="none" poster={poster || undefined} aria-label={title} onLoadedMetadata={onLoadedMetadata}>
      <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
      Your browser does not support HTML video.
    </video>
    <div className="media-video-skip-v4" aria-label="Video seek controls">
      <button type="button" onClick={() => seekBy(-10)} aria-label="Go back 10 seconds" title="Back 10 seconds"><RotateCcw size={17} aria-hidden="true" /><span>10s</span></button>
      <button type="button" onClick={() => seekBy(10)} aria-label="Go forward 10 seconds" title="Forward 10 seconds"><RotateCw size={17} aria-hidden="true" /><span>10s</span></button>
    </div>
  </>;
}
