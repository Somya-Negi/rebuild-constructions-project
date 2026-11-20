import { site } from '@/data/site';
import SectionLabel from '@/components/SectionLabel';

/** A real timeline: clear sequence, no decorative icons, easy to scan on a phone. */
export default function WorkingProcess() {
  return <section className="section workflow-section-v3 workflow-v4" id="approach" aria-labelledby="process-heading"><div className="container">
    <div className="section-title-row-v3"><div><SectionLabel>FOUR SIMPLE STEPS</SectionLabel><h2 id="process-heading" className="display-heading">How We Work</h2></div><p>A simple outline of how planning, execution and finishing can come together.</p></div>
    <ol className="process-timeline">{site.process.map(item => <li key={item.step} className="process-timeline-item"><span className="process-timeline-marker" aria-hidden="true">{item.step}</span><div className="process-timeline-content"><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol>
  </div></section>;
}
