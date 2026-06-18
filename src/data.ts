/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Testimonial, BlogPost, ServiceDetail } from './types';

// Images we generated beautifully
export const IMAGES = {
  heroRoom: '/images/hero_luxury_room_1781680604934.jpg',
  villaExterior: '/images/villa_exterior_1781680623104.jpg',
  studioWorkspace: '/images/studio_workspace_1781680646359.jpg',
  farmhouseExterior: '/images/farmhouse_exterior_1781680666730.jpg',
  
  // Stable ultra-high quality Unsplash URLs for other views
  statuarioLiving: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  cozyPenthouse: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  zenVastu: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
  constructionPerfect: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  farmPergola: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
};

export const SERVICES: ServiceDetail[] = [
  {
    id: 'architecture',
    num: '01',
    title: 'Architecture',
    subtitle: 'Concept to Creation',
    body: 'Great architecture doesn\'t just house life — it enhances it. From the very first sketch to the final structural detail, our architectural work is guided by one question: how will the people who live here feel? We design residential villas, luxury bungalows, and commercial spaces that balance bold contemporary vision with functional precision, local context, and lasting material choices.',
    subServices: [
      'Residential Architecture',
      'Commercial Architecture',
      'Villa Design',
      'Renovation & Restoration',
      'Structural Planning'
    ],
    image: IMAGES.villaExterior
  },
  {
    id: 'interior',
    num: '02',
    title: 'Interior Design',
    subtitle: 'Beauty in Every Detail',
    body: 'Luxury interior design is not about filling a room with expensive things — it\'s about curation, proportion, and intention. Our interiors are tailored to your lifestyle: how you move through a space, what textures calm you, what light invigorates you. We handle everything from concept boards and furniture selection to bespoke joinery and final styling, delivering interiors that feel completely, unmistakably yours.',
    subServices: [
      'Residential Interiors',
      'Bedroom Design',
      'Kitchen & Dining',
      'Living Spaces',
      'Office Interiors',
      'Hospitality Spaces'
    ],
    image: IMAGES.statuarioLiving
  },
  {
    id: 'vastu',
    num: '03',
    title: 'Vastu Consultancy',
    subtitle: 'Balance. Energy. Harmony.',
    body: 'Vastu Shastra is the ancient Indian science of space — a systematic approach to designing environments that support wellbeing, prosperity, and peace. At Living Home Design Studio, our Vastu consultation is not an add-on; it\'s woven into the design process from day one. We work with you to understand directional alignment, element balance, and energy flow, then translate these principles into stunning modern spaces that feel as good as they look.',
    subServices: [
      'Energy Mapping & Directional Analysis',
      'Residential & Plot Vastu Planning',
      'Modern Architectural Integration',
      'Practical Corrections Without Demolition',
      'Post-Occupancy Energy Review'
    ],
    image: IMAGES.zenVastu
  },
  {
    id: 'turnkey',
    num: '04',
    title: 'Turnkey Solutions',
    subtitle: 'Seamless Execution',
    body: 'Building a home is complex. Managing architects, contractors, vendors, and timelines simultaneously is overwhelming. Our turnkey service removes every friction point. We handle procurement, site supervision, vendor management, quality control, and scheduling — delivering your completed project on time and on budget, while you focus on what matters most.',
    subServices: [
      'Project Management',
      'Contractor Coordination',
      'Material Procurement',
      'Site Supervision',
      'Budget Tracking & Auditing',
      'Final Furnished Handover'
    ],
    image: IMAGES.constructionPerfect
  },
  {
    id: 'farm',
    num: '05',
    title: 'Farm Spaces',
    subtitle: 'Nature. Spaces. You.',
    body: 'The finest luxury is space, silence, and nature. Our farm space design service creates retreats that reconnect you with the land — farmhouses, weekend homes, and landscape environments that blend organic materials, natural light, and biophilic design principles with refined luxury. From mud-wall finishes to infinity pools overlooking paddy fields, we design farmhouses that nourish the soul.',
    subServices: [
      'Farmhouse Architecture',
      'Landscape Design',
      'Organic Material Interiors',
      'Swimming Pools & Water Features',
      'Outdoor Living Spaces'
    ],
    image: IMAGES.farmhouseExterior
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'oberoi-villa',
    title: 'The Oberoi Villa',
    category: 'architecture',
    categoryLabel: 'Architecture',
    location: 'Ahmedabad, India',
    image: IMAGES.villaExterior,
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80', // raw site
    afterImage: IMAGES.villaExterior,
    year: '2025',
    squareFt: '6,500 sq.ft',
    description: 'A striking contemporary villa combining floating concrete slabs, natural limestone claddings, and floor-to-ceiling glass paneling to frame lush landscaping.',
    challenge: 'The clients wanted a contemporary family home that would feel both grand and intimate — impressive enough to entertain 200 guests, warm enough to feel like home for a family of four.',
    approach: 'We designed a three-level residence with a dramatic double-height entrance, organic curved walls, and a material palette of Statuario marble, walnut wood, and handcrafted brass elements, fully Vastu-aligned.'
  },
  {
    id: 'mumbai-penthouse',
    title: 'Statuario Penthouse',
    category: 'interior',
    categoryLabel: 'Interior Design',
    location: 'Mumbai, India',
    image: IMAGES.cozyPenthouse,
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', // blank whitewash
    afterImage: IMAGES.cozyPenthouse,
    year: '2024',
    squareFt: '4,200 sq.ft',
    description: 'A warm luxury penthouse featuring custom double-layered marble coffee tables, curated Italian designer seating, and sleek automated drapery.',
    challenge: 'A corner penthouse overlooking the sea with challenging column layouts and a strict requirement to keep views panoramic while inserting smart acoustics.',
    approach: 'Curated sleek floating dividers, open ceiling coves with gold leafing, and customized joinery that neatly tucks away electrical elements while showcasing art.'
  },
  {
    id: 'lonavala-farm',
    title: 'Avanya Farmhouse',
    category: 'farm',
    categoryLabel: 'Farm Spaces',
    location: 'Lonavala, India',
    image: IMAGES.farmhouseExterior,
    beforeImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', // open land
    afterImage: IMAGES.farmhouseExterior,
    year: '2025',
    squareFt: '8,000 sq.ft (Built)',
    description: 'An expansive organic farmhouse estate inspired by traditional Indian courtyards, utilizing exposed local stone and terracotta shingles.',
    challenge: 'Constructing on highly sloped land with severe rainy season weathering, needing a structure that is entirely weather-proof while maintaining biophilic materials.',
    approach: 'Designed a wide cantilevered roof overhang, harvested local basalt stones for reinforcing plinths, and merged a scenic high-gabled timber ceiling.'
  },
  {
    id: 'gurugram-duplex',
    title: 'Metropolis Duplex',
    category: 'turnkey',
    categoryLabel: 'Turnkey Solutions',
    location: 'Gurugram, India',
    image: IMAGES.heroRoom,
    beforeImage: 'https://images.unsplash.com/photo-1590381105914-a7455b69af15?auto=format&fit=crop&w=1200&q=80', // raw brick
    afterImage: IMAGES.heroRoom,
    year: '2024',
    squareFt: '5,500 sq.ft',
    description: 'A completed turnkey private duplex. Everything from civil restructuring, Vastu corrections, structural columns, to velvet pillows and custom cutlery.',
    challenge: 'Tight 6-month timelines for detailed structural re-layouts. Client was residing out of country and required complete remote progress reports.',
    approach: 'Set up strict Gantt tracking, provided live HD camera feeds on construction site, finalized sample crates shipped directly to client, and executed flawless handovers on-time.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Living Home didn\'t just design our home — they understood our family\'s soul. Every single corner feels tailored, responsive, and filled with effortless warmth. The process was stress-free.',
    author: 'Priya & Rahul Mehta',
    projectTag: 'Villa Project',
    city: 'Ahmedabad',
    rating: 5
  },
  {
    id: 'test-2',
    quote: 'The Vastu integration is completely seamless. Our home feels peaceful and vibrant in a way we can\'t fully explain — but we feel it every single day we wake up here.',
    author: 'Anita Sharma',
    projectTag: 'Duplex Interior',
    city: 'Mumbai',
    rating: 5
  },
  {
    id: 'test-3',
    quote: 'From our first discovery call to final staging, the level of craftsmanship and meticulous execution is unlike any standard developer we\'ve worked with. True luxury firm.',
    author: 'Vikram Joshi',
    projectTag: 'Farmhouse Retreat',
    city: 'Lonavala',
    rating: 5
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'organic-modernism',
    title: 'The Rise of Organic Modern Architecture in India',
    category: 'Architecture Trends',
    date: 'June 10, 2026',
    image: IMAGES.villaExterior,
    excerpt: 'Explore how natural limestone, arches, and custom internal gardens are replacing rigid structures in premium Indian villas.',
    readTime: '6 min read',
    content: [
      'In the realm of luxury residential design, the rigid, clinical lines of ultra-minimalist concrete are giving way to something far more evocative and hospitable: Organic Modernism. Homeowners across major Indian metropolises and quiet retreats alike are looking to dwell in spaces that don\'t just express wealth, but evoke calm and feel grounded in their surroundings.',
      'We examine how natural materials like Jaisalmer stone, beige textured plasters, and solid teak ceilings are being combined with high-tech automation to achieve high-performance bioclimatic spaces.',
      'By integrating large arched openings and sliding structural slim-profiles, modern architecture can let the natural environment spill inward, fostering mental clarity.'
    ]
  },
  {
    id: 'vastu-energy-mapping',
    title: 'How Vastu Can Transform the Energy of Your Home',
    category: 'Vastu & Wellness',
    date: 'May 28, 2026',
    image: IMAGES.zenVastu,
    excerpt: 'An objective, scientific look at spatial Purusha Mandalas, magnetic vectors, and functional wind distributions inside modern luxury homes.',
    readTime: '8 min read',
    content: [
      'Vastu Shastra is often misunderstood as simple dogmatic beliefs, but at its heart, it represents a deep science of spatial ergonomics, wind currents, and solar exposure vectors cataloged over thousands of years to augment human wellness.',
      'This design guide outlines the scientific foundations of mapping the central Northeast source energy (Ishanya) and securing the heavy Southwest anchorage (Nairutya) for balanced family flow.',
      'With clear diagrams and modern examples, we share how we implement these parameters gracefully without ruining the visual purity of clean, editorial Italian interior layouts.'
    ]
  },
  {
    id: 'warm-neutral-interiors',
    title: 'Warm Neutral Interiors: Why Less Truly Is More',
    category: 'Interior Design',
    date: 'May 15, 2026',
    image: IMAGES.cozyPenthouse,
    excerpt: 'Discover why high-texture boucle, linen wraps, bronze accents, and travertine tables create a far more luxurious mood than high-gloss gold.',
    readTime: '5 min read',
    content: [
      'True luxury is quiet. Visual loudness — shiny marble floor finishes, aggressive mirror details, high-gloss gold plating — can easily look dated and feel tiring to live inside.',
      'Instead, we look toward raw tactile materials: travertine tables, heavy boucle fabrics, matte brass hardware, and plaster-based breathing walls representing the beauty of imperfection.',
      'Learn how to layer light ivory tones, sand-baskets, and deep cocoa highlights to create an environment that looks balanced in any season.'
    ]
  }
];

export const CLIENT_LOGOS = [
  'Godrej Properties',
  'DLF Ltd',
  'L&T Tech Builders',
  'Tata Housing',
  'Oberoi Realty',
  'Kalpataru Group',
  'Brigade Developers',
  'Lodha Group Homeowners'
];
