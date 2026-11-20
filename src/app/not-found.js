import Link from 'next/link';

export default function NotFound() {
  return <main id="main-content" className="missing-page-v3"><div className="container"><span className="simple-kicker-v3">PAGE NOT FOUND</span><h1>We could not find that page.</h1><p>Browse the available services or return to the homepage.</p><div><Link className="button button-dark" href="/services">Browse services</Link><Link className="text-link" href="/">Back to home</Link></div></div></main>;
}
