'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function getCardStep(track) {
  const [first, second] = track.children;
  return second.offsetLeft - first.offsetLeft;
}

export default function ReviewsCarousel({ children, count }) {
  const trackId = useId();
  const trackRef = useRef(null);
  const [firstIndex, setFirstIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (count < 2) return;
    const track = trackRef.current;
    const observer = new ResizeObserver(() => {
      const step = getCardStep(track);
      setVisibleCount(count - Math.round((track.scrollWidth - track.clientWidth) / step));
      setFirstIndex(Math.round(track.scrollLeft / step));
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (count < 2 || isPaused) return;

    const interval = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      const step = getCardStep(track);
      if (!step) return;

      const lastIndex = Math.max(0, count - visibleCount);
      const nextIndex = firstIndex >= lastIndex ? 0 : firstIndex + 1;
      track.scrollTo({ left: nextIndex * step, behavior: 'smooth' });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [count, firstIndex, isPaused, visibleCount]);

  function moveTo(index) {
    if (index < 0 || index > count - visibleCount) return;
    const track = trackRef.current;
    track.scrollTo({ left: index * getCardStep(track) });
  }

  return (
    <>
      <ul
        className="customer-stories-track"
        id={trackId}
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer stories"
        style={{ '--story-count': count }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
        }}
        onScroll={count > 1 ? event => {
          const track = event.currentTarget;
          setFirstIndex(Math.round(track.scrollLeft / getCardStep(track)));
        } : undefined}
      >
        {children}
      </ul>
      {count > visibleCount && (
        <div className="customer-stories-controls">
          <button type="button" aria-label="Previous review" aria-controls={trackId} aria-disabled={firstIndex === 0} onClick={() => moveTo(firstIndex - 1)}>
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <span aria-live="polite" aria-atomic="true">
            {visibleCount === 1 ? firstIndex + 1 : `${firstIndex + 1}–${firstIndex + visibleCount}`} of {count}
          </span>
          <button type="button" aria-label="Next review" aria-controls={trackId} aria-disabled={firstIndex + visibleCount >= count} onClick={() => moveTo(firstIndex + 1)}>
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
