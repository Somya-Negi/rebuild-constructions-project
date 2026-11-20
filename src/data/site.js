/**
 * CONTENT CONFIGURATION — all business identity, location, claims and media below
 * are placeholders until the builder approves final assets and copy.
 * Keep website sections data-driven so replacing demo content does not
 * require changes to React layouts or styling.
 */
const woodworkPhotos = {
  woodenDoors: {
    title: 'Wooden apartment doors',
    src: '/images/projects/woodwork-indian-wooden-doors.webp',
    alt: 'Dark wooden doors with simple horizontal grooves in a Maharashtra apartment hallway',
    contain: true,
  },
  kitchenCabinets: {
    title: 'Panelled kitchen cabinets',
    src: '/images/projects/woodwork-indian-kitchen-cabinets.webp',
    alt: 'White panelled kitchen cabinets with glass-front upper cupboards in a Kashmir home',
  },
  displayCupboards: {
    title: 'Living room display cupboards',
    src: '/images/projects/woodwork-indian-living-room-cabinetry.webp',
    alt: 'Glazed display cupboards beside a living area with timber ceiling details in a Kashmir home',
  },
  drawers: {
    title: 'Fitted kitchen drawers',
    src: '/images/projects/woodwork-indian-kitchen-drawers.webp',
    alt: 'Detail of panelled kitchen drawers and cabinet doors with matching pulls',
  },
  table: {
    title: 'Wooden dining table',
    src: '/images/projects/woodwork-indian-dining-table.webp',
    alt: 'Solid wooden dining table and bench in a Kerala home with tall windows',
  },
  bed: {
    title: 'Bedroom furniture',
    src: '/images/projects/woodwork-kerala-bedroom.webp',
    alt: 'Low bed with bedside furniture beside full-height windows in a Kerala bedroom',
  },
  sofa: {
    title: 'Wooden sofa and coffee table',
    src: '/images/projects/woodwork-indian-wooden-sofa.webp',
    alt: 'Wooden seating and a timber coffee table against an exposed brick wall in a Kerala living room',
    contain: true,
  },
};

export const site = {
  brand: 'Rebuild Constructions',
  descriptor: 'HOME CONSTRUCTION & INTERIORS',
  logo: '/images/rebuild-constructions-logo.png',
  tagline: 'Spaces designed for living.',
  whatsappNumber: '919810680755',
  phone: '8750002245',
  location: '13 Dwarka, Enclave Rajbagh Ext., Sahibabad, Ghaziabad, 201005',
  locationMapUrl: 'https://www.google.com/maps?cid=5309729299151862171',
  email: 'rebuildconstructions2@gmail.com',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Construction', href: '/construction' },
    { label: 'Interior Work', href: '/interior-work' },
    { label: 'How We Work', href: '/#approach' }
  ],
  hero: {
    eyebrow: 'HOME CONSTRUCTION  /  INTERIOR WORK',
    heading: ['Beautiful homes.', 'Thoughtfully built.'],
    description: 'New home construction and full-home interiors, plus kitchen and bathroom remodeling, painting and custom carpentry.',
    image: '/images/hero-modern-residence.png',
    imageAlt: 'Contemporary residential architecture with warm stone, timber and landscaped outdoor space',
    imageCredit: 'Architectural visualization for the Rebuild Constructions hero.'
  },
  /* Phase 2 service experiences. All entries are editable demo content. The
   * images are NOT client projects. Replace with permissioned media before launch.
   * For bathroom, provide two matched-angle, client-owned before/after images. */
  serviceStories: {
    construction: {
      number: '01', eyebrow: 'CONSTRUCTION STAGES',
      title: ['Construction', 'project stages.'],
      intro: 'Explore three important stages of a home build: planning, work on site and the finished space.',
      steps: [
        { label: 'Structure', title: 'The structure takes shape', description: 'See the building progress, scaffolding and exterior work on a live construction site.', image: '/images/projects/construction-site-exterior-01.jpeg', alt: 'Multi-storey building under construction with scaffolding' },
        { label: 'On site', title: 'Progress made visible', description: 'Follow the work on site as the building moves through major construction stages.', image: '/images/projects/construction-site-exterior-02.jpeg', alt: 'White building facade under construction with bamboo scaffolding' },
        { label: 'Exterior', title: 'Ready for the next stage', description: 'A wider view of the project shows the scale of the build, site access and surrounding work.', image: '/images/projects/construction-site-exterior-03.jpeg', alt: 'Large residential building project under construction' }
      ]
    },
    kitchens: {
      number: '02', eyebrow: 'KITCHEN DESIGN GALLERY',
      title: ['Kitchen design', 'and lighting.'],
      intro: 'Explore a finished kitchen concept and see how lighting works in the ceiling, drawers and glass-front cabinets.',
      gallery: [
        {
          label: 'Finished kitchen',
          title: 'Modern kitchen layout',
          detail: 'Oak drawers, quartz worktops and graphite cabinets frame the L-shaped layout. Task lighting brightens the worktop.',
          image: '/images/projects/kitchen-modern-finished.webp',
          alt: 'Design visualization of a modern L-shaped kitchen with oak drawers, quartz worktops and illuminated glass cabinets',
        },
        {
          label: 'Ceiling lighting',
          title: 'Recessed ceiling lighting',
          detail: 'A concealed LED strip lights the edge of the false ceiling, while recessed downlights spread light across the room.',
          image: '/images/projects/kitchen-ceiling-lighting.webp',
          alt: 'Rectangular cove lighting and recessed downlights above a modern kitchen',
        },
        {
          label: 'Drawer lighting',
          title: 'Integrated drawer lighting',
          detail: 'A slim LED strip at the drawer opening lights the cutlery organizer so the contents are easy to see.',
          image: '/images/projects/kitchen-drawer-lighting.webp',
          alt: 'Open oak kitchen drawer with a warm LED strip illuminating the cutlery compartments',
        },
        {
          label: 'Glass-front cabinets',
          title: 'Lit glass-front cabinets',
          detail: 'A warm vertical LED strip lights dishes and glassware behind slim black-framed glass doors.',
          image: '/images/projects/kitchen-glass-cabinet-lighting.webp',
          alt: 'Black-framed glass kitchen cabinet doors with warm vertical LED lighting behind the shelves',
        },
      ]
    },
    painting: {
      number: '04', eyebrow: 'PAINTING & FINISHES',
      title: ['Wall colors', 'and finishes.'],
      intro: 'Try paint colors on a living room wall, then browse real rooms for ideas on painted walls, moulding and textured finishes.',
      image: '/images/projects/painting-green-living-room.webp',
      alt: 'Olive green painted living room wall with framed art and cream seating',
      colors: [
        { id: 'ivory', label: 'Warm ivory', hue: 41, saturation: 39, lightness: 85 },
        { id: 'sage', label: 'Sage green', hue: 91, saturation: 12, lightness: 65 },
        { id: 'clay', label: 'Terracotta', hue: 17, saturation: 37, lightness: 60 },
        { id: 'blue', label: 'Slate blue', hue: 211, saturation: 24, lightness: 52 },
        { id: 'stone', label: 'Mineral grey', hue: 66, saturation: 6, lightness: 67 }
      ]
    },
    woodwork: {
      cover: woodworkPhotos.table,
    },
    renovation: {
      number: '06', eyebrow: 'FULL-HOME RENOVATION',
      title: ['Full-home', 'renovation ideas.'],
      intro: 'A home renovation brings together room layouts, lighting, wall finishes, joinery and the details that make a space feel complete.',
      image: '/images/projects/renovation-living-room.jpg',
      imageAlt: 'Finished modern living room with built-in television unit, lighting and soft furnishings',
      detailImage: '/images/projects/woodwork-arch-detail-01.jpeg',
      detailAlt: 'Curved timber arch and display shelving in a completed interior',
      videoSrc: '/videos/stock-indian-living-room-furnishing.mp4',
      videoPoster: '/images/projects/stock-indian-living-room-furnishing-poster.jpeg',
      highlights: ['Reconsider the layout', 'Refine the materials', 'Bring the rooms together']
    }
  },
  process: [
    { step: '01', title: 'Share Your Requirements', text: 'Tell us what you need, where the project is and the changes you have in mind.' },
    { step: '02', title: 'Plan the Work', text: 'Discuss layouts, materials, scope and the approach that fits your project.' },
    { step: '03', title: 'Complete the Work', text: 'Construction or interior work moves forward based on the agreed plan and project needs.' },
    { step: '04', title: 'Finishing & Handover', text: 'Review the finishing details and prepare the completed space for use.' }
  ],
  // Replace empty paths with approved assets in public/images and public/videos.
  // This is the only configuration needed to fill the dedicated media placeholders.
  approvedMedia: {
    construction: [
      { id: 'construction-image-01', type: 'photo', title: 'Foundation and plinth', note: 'Brick plinth walls and concrete columns', src: '/images/projects/home-construction-foundation.webp', alt: 'Workers build low brick plinth walls around the footprint of a new home' },
      { id: 'construction-image-02', type: 'photo', title: 'Brick walls and frame', note: 'Brickwork within a concrete frame', src: '/images/projects/home-construction-brickwork.webp', alt: 'Workers lay bricks between concrete columns on a two-storey home' },
      { id: 'construction-image-03', type: 'photo', title: 'Roof slab preparation', note: 'Formwork and steel reinforcement', src: '/images/projects/home-construction-roof-slab.webp', alt: 'Workers arrange steel reinforcement on temporary formwork for a home’s roof slab' },
      { id: 'construction-image-04', type: 'photo', title: 'Ayodhya site visit', note: 'Construction progress and site view', src: '/images/projects/ayodhya-construction-site-04.jpeg', alt: 'Construction site visit with a multi-storey brick building under construction in Ayodhya' },
      { id: 'construction-image-05', type: 'photo', title: 'Ayodhya construction progress', note: 'Multi-storey brick building under construction', src: '/images/projects/ayodhya-construction-site-05.jpeg', alt: 'Multi-storey brick building under construction in Ayodhya' }
    ],
    renovation: [
      { id: 'renovation-room-01', type: 'photo', title: 'Modern living room', note: 'Stock photography by Max Vakhtbovych', src: '/images/projects/renovation-living-room-inspiration.jpg', alt: 'Living room with a soft sofa, round wooden coffee table and wall-mounted television', sourceUrl: 'https://www.pexels.com/photo/modern-living-room-with-cozy-couch-and-wooden-furniture-6636311/' },
      { id: 'renovation-room-02', type: 'photo', title: 'Open-plan kitchen and dining', note: 'Stock photography by Image Hunter', src: '/images/projects/renovation-kitchen-dining-inspiration.jpg', alt: 'Naturally lit open-plan kitchen and dining room with contemporary furnishings', sourceUrl: 'https://www.pexels.com/photo/modern-open-concept-dining-and-kitchen-interior-36411034/' },
      {
        id: 'renovation-lit-shelving',
        type: 'photo',
        title: 'Built-in shelving with lighting',
        src: '/images/projects/stock-interior-lit-shelving.jpg',
        alt: 'Built-in oak cupboards and open display shelves with warm lighting',
        credit: 'DOAN THANH BINH',
        sourceUrl: 'https://www.pexels.com/photo/modern-minimalist-home-interior-with-wooden-shelving-36908235/',
      },
      {
        id: 'renovation-pendant-lighting',
        type: 'video',
        title: 'Warm pendant lighting',
        src: '/videos/stock-interior-pendant-lighting.mp4',
        poster: '/images/projects/stock-interior-pendant-lighting-poster.jpg',
        credit: 'Alef Morais',
        sourceUrl: 'https://www.pexels.com/video/elegant-indoor-lighting-in-modern-home-40807469/',
      },
      { id: 'renovation-video-01', type: 'video', title: 'Sunlit interior tour', note: 'Stock footage by Alef Morais', src: '/videos/renovation-living-room-tour.mp4', poster: '/images/projects/renovation-living-room-tour-poster.jpg', sourceUrl: 'https://www.pexels.com/video/spacious-modern-living-room-with-large-windows-40807450/' },
      { id: 'renovation-video-02', type: 'video', title: 'Open-plan living room', note: 'Free stock interior footage · Pexels', src: '/videos/stock-open-plan-living-room.mp4', poster: '/images/projects/stock-open-plan-living-room-poster.jpeg', sourceUrl: 'https://www.pexels.com/video/video-of-the-inside-of-a-house-7578545/' },
      { id: 'renovation-video-03', type: 'video', title: 'Furnished hallway', note: 'Free stock interior footage · Pexels', src: '/videos/stock-furnished-hallway.mp4', poster: '/images/projects/stock-furnished-hallway-poster.jpeg', sourceUrl: 'https://www.pexels.com/video/home-interior-10240699/' }
    ],
    // Phase 4: every service uses the same accessible gallery. Empty paths are intentional.
    // Add client-approved local files to public/images or public/videos, then update src/alt/poster.
    kitchens: [
      {
        id: 'kitchen-photo-01',
        type: 'photo',
        title: 'Completed modern kitchen',
        src: '/images/projects/kitchen-completed-reference.jpg',
        alt: 'Completed modern kitchen with wood cabinetry, a built-in cooktop and a stone peninsula',
        credit: 'Max Vakhtbovych',
        sourceUrl: 'https://www.pexels.com/photo/interior-of-modern-kitchen-with-counter-6489113/',
      },
      {
        id: 'kitchen-photo-02',
        type: 'photo',
        title: 'Kitchen ceiling lighting',
        src: '/images/projects/kitchen-ceiling-reference.jpg',
        alt: 'Recessed ceiling lights above white cabinetry with under-cabinet lighting and a lit glass-front cabinet',
        credit: 'Max Vakhtbovych',
        sourceUrl: 'https://www.pexels.com/photo/interior-of-modern-minimalist-kitchen-with-glossy-cabinets-7061668/',
      },
      {
        id: 'kitchen-utensil-drawer',
        type: 'photo',
        title: 'Pull-out utensil organizer',
        src: '/images/projects/stock-kitchen-utensil-drawer.jpg',
        alt: 'Open kitchen drawers with a divided cutlery organizer in the shallow top drawer',
        contain: true,
        credit: 'Hakim Santoso',
        sourceUrl: 'https://www.pexels.com/photo/gray-utensils-organizer-inside-the-kitchen-drawer-9646744/',
      },
      {
        id: 'kitchen-cookware-drawers',
        type: 'video',
        title: 'Cookware drawers in use',
        src: '/videos/stock-kitchen-cookware-drawers.mp4',
        poster: '/images/projects/stock-kitchen-cookware-drawers-poster.jpg',
        credit: 'Osman Battal',
        sourceUrl: 'https://www.pexels.com/video/modern-kitchen-interior-with-open-drawer-40817860/',
      },
    ],
    bathrooms: [
      {
        id: 'bathroom-finished-interior',
        type: 'photo',
        title: 'Finished bathroom interior',
        src: '/images/projects/bathroom-finished-interior-reference.webp',
        alt: 'Finished grey tiled bathroom with a glass shower enclosure, floating vanity and wall-hung toilet',
        contain: true,
        credit: 'Max Vakhtbovych',
        sourceUrl: 'https://www.pexels.com/photo/modern-bathroom-interior-with-shower-cabin-and-washbasin-at-home-7018255/',
      },
      {
        id: 'bathroom-overhead-shower',
        type: 'photo',
        title: 'Overhead shower and glass enclosure',
        src: '/images/projects/bathroom-overhead-shower-reference.webp',
        alt: 'Round overhead shower head and handheld attachment inside a curved glass enclosure',
        contain: true,
        credit: 'Max Vakhtbovych',
        sourceUrl: 'https://www.pexels.com/photo/bathroom-with-glass-shower-cabin-6436789/',
      },
      {
        id: 'bathroom-handheld-shower',
        type: 'photo',
        title: 'Handheld shower fittings',
        src: '/images/projects/bathroom-handheld-shower-reference.webp',
        alt: 'Chrome handheld shower on a slide rail with a flexible hose and wall-mounted mixer',
        contain: true,
        credit: 'Sarah Chai',
        sourceUrl: 'https://www.pexels.com/photo/bottles-of-shower-supplies-in-bathroom-7262767/',
      },
      {
        id: 'bathroom-ceiling-downlight',
        type: 'photo',
        title: 'Recessed ceiling lighting',
        src: '/images/projects/bathroom-ceiling-downlight-reference.webp',
        alt: 'Recessed ceiling downlight illuminating a bathroom with stone-finish wall tiles',
        contain: true,
        credit: 'Max Vakhtbovych',
        sourceUrl: 'https://www.pexels.com/photo/7746644/',
      },
      {
        id: 'bathroom-patterned-tilework',
        type: 'photo',
        title: 'Wall and floor tilework',
        src: '/images/projects/bathroom-patterned-tilework-reference.webp',
        alt: 'Patterned bathroom floor tiles and a dark horizontal accent band beside a glass shower',
        contain: true,
        credit: 'UMUT RAW',
        sourceUrl: 'https://www.pexels.com/photo/modern-bathroom-interior-with-shower-and-toilet-37460688/',
      },
      {
        id: 'bathroom-wall-hung-toilet',
        type: 'photo',
        title: 'Wall-hung toilet and bidet spray',
        src: '/images/projects/bathroom-wall-hung-toilet-reference.webp',
        alt: 'White wall-hung toilet with a closed seat and a handheld bidet spray against grey tile',
        contain: true,
        credit: 'AJ Ahamad',
        sourceUrl: 'https://www.pexels.com/photo/modern-bathroom-with-bidet-and-toilet-paper-holder-29080580/',
      },
    ],
    painting: [
      {
        id: 'painting-photo-olive', type: 'photo', title: 'Olive green living room',
        src: '/images/projects/painting-green-living-room.webp',
        alt: 'Olive green painted living room wall with framed art and cream seating',
        credit: 'Martin Lang', sourceUrl: 'https://www.pexels.com/photo/a-living-room-with-green-walls-and-a-black-framed-picture-27460916/',
      },
      {
        id: 'painting-photo-moulding', type: 'photo', title: 'Painted wall moulding',
        src: '/images/projects/painting-colored-molding.webp',
        alt: 'Warm ochre wall moulding and built-in cabinetry in a sitting room with a pink sofa',
        credit: 'Max Vakhtbovych', sourceUrl: 'https://www.pexels.com/photo/stylish-sitting-room-with-colored-walls-7166625/',
      },
      {
        id: 'painting-photo-pink', type: 'photo', title: 'Pale pink bedroom',
        src: '/images/projects/painting-pink-bedroom.webp', contain: true,
        alt: 'Sunlight on a pale pink bedroom wall above a wooden headboard',
        credit: 'Tuğçe Arslan Güney', sourceUrl: 'https://www.pexels.com/photo/wooden-bed-in-and-sunlight-on-a-pastel-pink-wall-13832454/',
      },
      {
        id: 'painting-photo-blue', type: 'photo', title: 'Blue media accent wall',
        src: '/images/projects/painting-blue-accent-wall.webp', contain: true,
        alt: 'Blue living room accent wall behind a television and floor lamp',
        credit: 'AJ Ahamad', sourceUrl: 'https://www.pexels.com/photo/a-living-room-with-a-blue-wall-and-a-tv-28319154/',
      },
      {
        id: 'painting-photo-brick', type: 'photo', title: 'White painted brick',
        src: '/images/projects/painting-white-brick-wall.webp',
        alt: 'White painted brick wall behind a sofa in a modern apartment',
        credit: 'Max Vakhtbovych', sourceUrl: 'https://www.pexels.com/photo/interior-of-modern-living-room-with-sofa-and-coffee-table-7512039/',
      },
      {
        id: 'painting-photo-white', type: 'photo', title: 'Soft white living room',
        src: '/images/projects/painting-neutral-living-room.webp',
        alt: 'Soft white painted living room walls with framed pictures and natural daylight',
        credit: 'Max Vakhtbovych', sourceUrl: 'https://www.pexels.com/photo/white-couch-in-decorated-room-6890390/',
      },
      { id: 'painting-photo-02', type: 'photo', title: 'Ceiling finish', note: 'False ceiling and lighting detail', src: '/images/projects/ceiling-finish-01.jpeg', alt: 'Decorative false ceiling with recessed lighting' },
      { id: 'painting-photo-03', type: 'photo', title: 'Lighting ceiling detail', note: 'Cove lighting and ceiling design', src: '/images/projects/ceiling-lighting-finish-01.jpeg', alt: 'Cove-lit ceiling design in a completed interior' }
    ],
    woodwork: Object.entries(woodworkPhotos).map(([id, photo]) => ({ id, type: 'photo', ...photo })),
  },
  // Approved review fields: id, customer, quote, location, service, avatar and approved.
  clientReviews: [],
  areas: [] // Add only approved service areas when they are verified.
};
