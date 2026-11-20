'use client';

import { useState } from 'react';
import MediaImage from '@/components/MediaImage';
import { site } from '@/data/site';
import FeatureHeading from './FeatureHeading';

const story = site.serviceStories.painting;
const wheelKeys = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1, PageDown: -15, PageUp: 15 };

function paintTone({ hue, saturation, lightness }) {
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

export default function PaintingStudio() {
  const [color, setColor] = useState(story.colors[0]);
  const { hue, saturation, lightness } = color;
  const tone = paintTone(color);
  const angle = hue * Math.PI / 180;
  const label = color.id ? color.label : 'Custom color';

  function updateColor(values) {
    setColor(current => ({ ...current, ...values, id: null }));
  }

  function selectFromWheel(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const radius = bounds.width / 2;
    const x = event.clientX - bounds.left - radius;
    const y = event.clientY - bounds.top - radius;
    const distance = Math.hypot(x, y);
    const direction = Math.round(Math.atan2(x, -y) * 180 / Math.PI);
    updateColor({
      hue: distance > 0 ? (direction + 360) % 360 : hue,
      saturation: Math.min(100, Math.round(distance / radius * 100)),
    });
  }

  function handleWheelKey(event) {
    const step = wheelKeys[event.key];
    if (step === undefined && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    let nextHue = Math.min(359, Math.max(0, hue + step));
    if (event.key === 'Home') nextHue = 0;
    if (event.key === 'End') nextHue = 359;
    updateColor({ hue: nextHue });
  }

  return <section className="service-feature painting-feature section" id="painting" aria-labelledby="painting-title">
    <div className="container">
      <FeatureHeading story={story} id="painting-title" />
      <div className="painting-layout">
        <div className="painting-studio paint-controls">
          <h3 className="paint-panel-heading">Choose a wall color</h3>
          <p className="feature-sidenote">Drag on the wheel or start with a swatch.</p>
          <div
            className="paint-wheel"
            role="slider"
            tabIndex={0}
            aria-label="Paint hue"
            aria-valuemin={0}
            aria-valuemax={359}
            aria-valuenow={hue}
            aria-valuetext={`${hue} degrees`}
            style={{
              '--wheel-lightness': `${lightness}%`,
              '--wheel-x': `${50 + Math.sin(angle) * saturation / 2}%`,
              '--wheel-y': `${50 - Math.cos(angle) * saturation / 2}%`,
              '--paint-tone': tone,
            }}
            onPointerDown={event => {
              if (!event.isPrimary || event.button !== 0) return;
              event.currentTarget.focus({ preventScroll: true });
              event.currentTarget.setPointerCapture(event.pointerId);
              selectFromWheel(event);
            }}
            onPointerMove={event => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) selectFromWheel(event);
            }}
            onKeyDown={handleWheelKey}
          >
            <span className="paint-wheel-marker" aria-hidden="true" />
          </div>
          <div className="paint-sliders">
            <label>
              <span>Saturation</span>
              <input type="range" min="0" max="100" value={saturation} aria-valuetext={`${saturation}%`} onChange={event => updateColor({ saturation: event.target.valueAsNumber })} />
            </label>
            <label>
              <span>Lightness</span>
              <input type="range" min="0" max="100" value={lightness} aria-valuetext={`${lightness}%`} onChange={event => updateColor({ lightness: event.target.valueAsNumber })} />
            </label>
          </div>
          <div className="paint-swatches" role="group" aria-label="Preset wall colors">
            {story.colors.map(item => <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-pressed={color.id === item.id}
              onClick={() => setColor(item)}
              title={item.label}
            ><span style={{ background: paintTone(item) }} /></button>)}
          </div>
        </div>
        <figure className="painting-studio paint-preview">
          <h3 className="paint-panel-heading">Living room preview</h3>
          <div className="paint-room" style={{ '--paint-tone': tone }}>
            <MediaImage src={story.image} alt="Living room with cream seating, framed art and the selected color on the wall" sizes="(max-width: 800px) 100vw, 60vw" />
            <div className="paint-wall" aria-hidden="true" />
          </div>
          <figcaption className="paint-preview-caption">
            <div className="paint-selection">
              <span className="paint-selection-chip" style={{ background: tone }} aria-hidden="true" />
              <span>{label}</span>
            </div>
            <p className="feature-sidenote">Paint can look different under your room's lighting.</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>;
}
