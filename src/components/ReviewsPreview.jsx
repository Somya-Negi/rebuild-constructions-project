import './reviews.css';
import { MapPin, Quote } from 'lucide-react';
import MediaImage from '@/components/MediaImage';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import { site } from '@/data/site';

const sampleReviews = [
  {
    id: 'construction-example',
    customer: 'Aarav M.',
    location: 'Ayodhya, Uttar Pradesh',
    service: 'New Home Construction',
    quote: 'The site updates helped us understand each stage of the build. We knew when to visit and what decisions were coming up next.',
  },
  {
    id: 'interiors-example',
    customer: 'Meera S.',
    location: 'Delhi',
    service: 'Full-Home Interiors',
    quote: 'We wanted the living and dining rooms to feel connected. The lighting and wood finishes brought them together, and we finally have enough storage.',
  },
  {
    id: 'kitchen-example',
    customer: 'Nisha R.',
    location: 'Ghaziabad',
    service: 'Kitchen Design & Remodeling',
    quote: 'The new layout gave us more counter space. Deep drawers near the stove keep the pans we use every day within reach.',
  },
  {
    id: 'bathroom-example',
    customer: 'Kavya P.',
    location: 'Noida',
    service: 'Bathroom Remodeling',
    quote: 'Moving the vanity made room for a wider shower. The new lighting makes it easier to get ready in the morning, and the shelves keep everything off the counter.',
  },
  {
    id: 'renovation-example',
    customer: 'Rohan V.',
    location: 'Greater Noida',
    service: 'Full-Home Renovation',
    quote: 'We renovated in stages so we could keep using part of the house. Knowing which rooms would be out of use each week made it easier to plan around the work.',
  },
  {
    id: 'woodwork-example',
    customer: 'Ananya D.',
    location: 'Faridabad',
    service: 'Custom Woodwork',
    quote: 'The built-in cupboards fit around a column we thought would waste space. We now have room for the luggage up high and a drawer the kids can reach.',
  },
];

export default function ReviewsPreview() {
  const approvedReviews = site.clientReviews.filter(review => review.approved && review.quote && review.customer);
  const showSamples = approvedReviews.length === 0;
  const reviews = showSamples ? sampleReviews : approvedReviews;

  return (
    <section className="section customer-stories-section" id="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <header className="customer-stories-header">
          <h2 className="display-heading" id="reviews-heading">Customer Stories</h2>
          {showSamples && <p>Sample testimonials with fictional names, locations, and quotes.</p>}
        </header>
        <ReviewsCarousel count={reviews.length}>
          {reviews.map(review => {
            const initials = review.customer.trim().split(/\s+/).slice(0, 2).map(name => name[0]).join('');

            return (
              <li className="customer-story" key={review.id}>
                <figure>
                  <figcaption className="customer-story-person">
                    {review.avatar ? (
                      <MediaImage className="customer-story-avatar" src={review.avatar} alt="" sizes="56px" />
                    ) : (
                      <span className="customer-story-avatar" aria-hidden="true">{initials}</span>
                    )}
                    <div>
                      <strong>{review.customer}</strong>
                      {review.service && <p>{review.service}</p>}
                    </div>
                  </figcaption>
                  <blockquote><Quote size={23} aria-hidden="true" /><p>{review.quote}</p></blockquote>
                  {review.location && <p className="customer-story-location"><MapPin size={15} aria-hidden="true" />{review.location}</p>}
                </figure>
              </li>
            );
          })}
        </ReviewsCarousel>
      </div>
    </section>
  );
}
