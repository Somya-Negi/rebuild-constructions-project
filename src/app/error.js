'use client';
import Link from 'next/link';
/** Friendly recovery without exposing internal errors or private information. */
export default function Error({ reset }) {
  return <main id="main-content" className="missing-page-v3" role="main"><div className="container">
    <span className="simple-kicker-v3">PAGE UNAVAILABLE</span>
    <h1>We couldn't load this page.</h1>
    <p>Please try again or return to the homepage.</p>
    <div><button className="button button-dark" type="button" onClick={() => reset()}>Try again</button><Link className="text-link" href="/">Back to home</Link></div>
  </div></main>;
}
