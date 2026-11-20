/**
 * The catalog defines public service routes,
 * service grouping and enquiry service labels.
 * All photographs and service descriptions remain SAMPLE CONTENT, not real jobs.
 */
import { site } from './site';

const story = site.serviceStories;

export const serviceGroups = [
  {
    id: 'construction',
    number: '01',
    title: 'Construction Services',
    shortTitle: 'Construction',
    description: 'Build a new home from the ground up, from planning and structural work through finishing and handover.',
  },
  {
    id: 'interiors',
    number: '02',
    title: 'Interior Services',
    shortTitle: 'Interiors',
    description: 'Build out or update interiors across the whole home, or focus on a kitchen, bathroom, wall finish or built-in storage.',
  },
];

export const services = [
  {
    slug: 'home-construction',
    title: 'New Home Construction',
    category: 'construction',
    inquiryLabel: 'Home construction',
    shortDescription: 'Build a new home from the ground up. See residential buildings take shape on site.',
    description: 'Start with your plot and plans, then work through the structural build, exterior work and finishing.',
    image: story.construction.steps[2].image,
    coverImage: '/images/projects/construction-before-after-villa.jpg',
    imageAlt: 'Before-and-after view of a modern villa construction project',
    feature: 'construction',
    includes: [
      { title: 'Planning and design', description: 'Start with the plot, your requirements and the layout you have in mind.' },
      { title: 'Site execution', description: 'Understand the main stages of site work and building progress.' },
      { title: 'Finishing and handover', description: 'Think about the final rooms, practical details and finishing priorities.' },
    ],
    projectQuestions: ['Where is the plot or site?', 'Is a design or plan already available?', 'When would you like to begin?'],
  },
  {
    slug: 'full-home-renovation',
    title: 'Full-Home Interiors',
    category: 'interiors',
    inquiryLabel: 'Full-home renovation',
    shortDescription: 'Build out or remodel rooms across your home, from layouts and built-in storage to lighting and finishes.',
    description: 'Plan the work room by room for a new or existing home. Coordinate layouts, built-ins, lighting and finishes across living areas, bedrooms and other spaces.',
    image: story.renovation.image,
    coverImage: '/images/projects/renovation-living-room.jpg',
    imageAlt: 'Finished modern living room with built-in television unit, lighting and soft furnishings',
    feature: 'renovation',
    includes: [
      { title: 'Room planning', description: 'Identify which rooms need work and how you want to use them.' },
      { title: 'Interior build-out', description: 'Plan room layouts, built-in storage and custom woodwork.' },
      { title: 'Lighting and finishes', description: 'Coordinate lighting, wall treatments and materials across rooms.' },
    ],
    projectQuestions: ['Is this a new or existing home?', 'Which rooms need work?', 'Can you share floor plans or photos of the rooms?'],
  },
  {
    slug: 'kitchen-design',
    title: 'Kitchen Design & Remodeling',
    category: 'interiors',
    inquiryLabel: 'Kitchen design',
    shortDescription: 'Explore kitchen layouts, cabinets, worktops and everyday storage solutions.',
    description: 'A well-planned kitchen balances cooking space, storage and movement. Compare styles and finishes to find ideas that suit your room and routine.',
    image: story.kitchens.gallery[0].image,
    imageAlt: story.kitchens.gallery[0].alt,
    feature: 'kitchens',
    includes: [
      { title: 'Kitchen layouts', description: 'Explore how the layout affects worktop space and easy movement.' },
      { title: 'Cabinets and storage', description: 'Consider drawers, tall units, cabinets and other storage needs.' },
      { title: 'Materials and finishes', description: 'Compare how cabinet colors and surface materials change the room.' },
    ],
    projectQuestions: ['Is this a new kitchen or a remodel?', 'What is the approximate kitchen size?', 'Do you have a preferred style?'],
  },
  {
    slug: 'bathroom-remodeling',
    title: 'Bathroom Remodeling',
    category: 'interiors',
    inquiryLabel: 'Bathroom remodeling',
    shortDescription: 'Explore finished bathroom layouts, shower fittings, ceiling lighting, tilework and toilet installations.',
    description: 'Plan where the shower, vanity and toilet will sit, then choose fittings, lighting and tile finishes that work together.',
    image: site.approvedMedia.bathrooms[0].src,
    imageAlt: site.approvedMedia.bathrooms[0].alt,
    feature: 'bathrooms',
    includes: [
      { title: 'Space planning', description: 'Review the existing layout and areas that feel cramped or awkward.' },
      { title: 'Fixtures and fittings', description: 'Choose overhead and handheld showers, washbasins and toilet fittings.' },
      { title: 'Tilework and lighting', description: 'Coordinate wall and floor tiles with lighting for the shower, vanity and the rest of the room.' },
    ],
    projectQuestions: ['Is the work a refresh or complete remodel?', 'What is the bathroom size?', 'Are plumbing/layout changes required?'],
  },
  {
    slug: 'painting-and-whitewashing',
    title: 'Painting & Whitewashing',
    category: 'interiors',
    inquiryLabel: 'Painting & whitewashing',
    shortDescription: 'Refresh walls with a new color, finish or surface treatment.',
    description: 'Wall color and texture affect how a room feels throughout the day. Explore a few color palettes to narrow down the look you prefer.',
    image: story.painting.image,
    imageAlt: story.painting.alt,
    feature: 'painting',
    includes: [
      { title: 'Wall preparation', description: 'Look at the current wall condition and required surface preparation.' },
      { title: 'Color direction', description: 'Compare warm neutrals, soft greens and bolder accent colors.' },
      { title: 'Finishing options', description: 'Discuss smooth, textured or other preferred wall treatments.' },
    ],
    projectQuestions: ['Which rooms need painting?', 'Is it an existing painted wall or new surface?', 'Do you have a preferred color or finish?'],
  },
  {
    slug: 'woodwork-and-carpentry',
    title: 'Woodwork & Carpentry',
    category: 'interiors',
    inquiryLabel: 'Woodwork & carpentry',
    shortDescription: 'Explore interior doors, fitted storage and wooden furniture for your home.',
    description: 'Compare door finishes, plan fitted cabinetry, and explore furniture details for bedrooms, dining rooms and living areas.',
    image: story.woodwork.cover.src,
    imageAlt: story.woodwork.cover.alt,
    feature: 'woodwork',
    includes: [
      { title: 'Interior doors', description: 'Discuss wooden doors for living areas and PVC doors for bathrooms and utility rooms.' },
      { title: 'Cabinets and cupboards', description: 'Plan fitted cupboards, cabinet layouts, drawer storage and hardware.' },
      { title: 'Wooden furniture', description: 'Explore timber details for tables, bed frames and sofas.' },
    ],
    projectQuestions: ['What type of woodwork do you need?', 'What are the approximate dimensions?', 'Do you have reference designs or photographs?'],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
export const groupServices = (groupId) => services.filter((service) => service.category === groupId);
export const serviceHref = (slug) => serviceBySlug[slug].category === 'construction' ? '/construction' : `/interior-work/${slug}`;
