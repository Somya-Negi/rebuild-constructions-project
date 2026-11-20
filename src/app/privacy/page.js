import './privacy.css';
import Link from 'next/link';

export const metadata = { title: 'Privacy Information', robots: { index: false, follow: false } };

/** The business must replace this interim information with an approved policy before launch. */
export default function PrivacyPage() {
  return <main id="main-content" className="privacy-demo-page"><div className="container">
    <span className="simple-kicker-v3">PRIVACY & CONTACT</span>
    <h1>Privacy Information</h1>
    <p className="privacy-intro">This page explains how project enquiries will be handled. The full business-specific privacy policy will be published before online requests are activated.</p>
    <h2>Project enquiries</h2>
    <p>When online enquiries are enabled, the form requests your name, phone number, service category, project location and any additional information you choose to share. These details are intended to help the business respond to your request.</p>
    <p>If the form displays an unavailable message, it will not submit or store your details.</p>
    <h2>WhatsApp</h2>
    <p>When WhatsApp contact is available, selecting it opens a separate WhatsApp conversation. You decide whether to send the message. WhatsApp's own privacy terms apply.</p>
    <h2>Contact and data questions</h2>
    <p>Final controller identity, business contact, service providers, retention period, individual rights, and any analytics or cookie choices must be confirmed before public launch.</p>
    <Link href="/#contact" className="button button-dark">Return to contact</Link>
  </div></main>;
}
