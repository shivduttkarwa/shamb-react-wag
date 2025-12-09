const publicUrl = import.meta.env.BASE_URL || "/";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  heroImage: string;
  heroAlt: string;
  videoSrc?: string; // Add video source
  featuredImage?: string;
  swiperImages?: string[];
  sections: {
    heading?: string;
    body: string[];
    image?: {
      src: string;
      alt: string;
    };
  }[];
  gallery: {
    src: string;
    alt: string;
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "sustainable-havens",
    title: "Sustainable Living",
    category: "Sustainability",
    date: "15 Nov 2025",
    readTime: "5 min read",
    excerpt:
      "How we weave low-impact materials, passive design and crafted details into homes that feel effortlessly luxurious. Each decision is measured against longevity, comfort, and the quiet drama of daily rituals. We consider the whole lifecycle, so your space grows more soulful with every season. Our approach balances environmental responsibility with refined aesthetics, creating spaces that nurture both planet and people through thoughtful design.",
    heroImage: `${publicUrl}images/port1.jpg`,
    heroAlt: "Soft sunlight across timber and stone living room",
    videoSrc: `${publicUrl}videos/architecture-showcase.mp4`, // Add video source
    swiperImages: [
      `${publicUrl}images/port1.jpg`,
      `${publicUrl}images/sercard1.jpg`,
      `${publicUrl}images/port3.jpg`,
      `${publicUrl}images/net3.jpg`,
    ],
    sections: [
      {
        heading: "Designing for climate and comfort",
        body: [
          "Our passive-first approach places orientation, ventilation, and thermal mass at the heart of every floor plan. Glazing is tuned to seasons; deep overhangs invite winter sun while diffusing summer glare.",
          "We pair robust envelopes with tactile finishes so efficiency never feels austere. Textured renders, softly brushed metals, and warm joinery keep each room grounded and inviting.",
          "Mechanical systems are hidden within crafted joinery to keep sightlines calm, while cross-breezes and stack ventilation handle most of the work year-round.",
          "We prototype shading and airflow on every site to validate decisions, ensuring the final experience feels serene in summer and effortless in winter without overengineering.",
          "Every threshold is choreographed: cooling breezeways, thermal breaks at entries, and layered screens that create a sense of arrival before you even step inside.",
        ],
        image: {
          src: `${publicUrl}images/blog2.jpg`,
          alt: "Shaded facade with generous glazing",
        },
      },
      {
        heading: "Material honesty as a luxury",
        body: [
          "Locally sourced stone, FSC timber, and lime-based paints reduce embodied carbon while aging beautifully. Every junction is detailed to celebrate the material, not hide it.",
          "By simplifying palettes and elevating craft, we create calm interiors that remain timeless as technologies evolve.",
          "Maintenance is designed in: replaceable panels, serviceable fixtures, and durable finishes that patinate with grace, not wear with regret.",
          "We audit supply chains for ethical sourcing and pair them with artisan fabrication, so the story of each home is as honest as its textures.",
          "Joinery is conceived as furniture—movable, repairable, and tailored—so rooms can evolve while the architecture remains steady.",
        ],
        image: {
          src: `${publicUrl}images/l11.jpg`,
          alt: "Minimal living space with timber ceiling",
        },
      },
      {
        heading: "Habitability that endures",
        body: [
          "Air, light, and acoustic quality are measured alongside aesthetics. Mechanical systems are discreet, intuitive, and serviceable for decades.",
          "Landscape is woven through courtyards and thresholds so biophilia becomes part of daily rituals.",
          "We script daily journeys—morning light in the kitchen, quiet corners for reading, breezeways for summer evenings—so the home performs for the people inside it.",
          "Clients receive living guides that outline seasonal adjustments, ensuring the architecture keeps adapting as family rhythms shift over time.",
          "We tune acoustics and scent—soft closures, silent ventilation paths, and curated planting—to make every space feel restorative from the first step.",
        ],
      },
    ],
    gallery: [
      { src: `${publicUrl}images/l8.jpg`, alt: "Lounge opening to garden" },
      { src: `${publicUrl}images/l5.jpg`, alt: "Stone and timber kitchen" },
      { src: `${publicUrl}images/l6.jpg`, alt: "Evening exterior with glow" },
      { src: `${publicUrl}images/pexels-asphotography-94818.jpg`, alt: "Courtyard planting" },
    ],
  },
  {
    id: 2,
    slug: "landscapes-that-rise-in-value",
    title: "Landscapes That Rise in Value",
    category: "Design",
    date: "12 Nov 2025",
    readTime: "4 min read",
    excerpt:
      "How layered planting, water stewardship, and crafted thresholds elevate both experience and equity. These landscapes perform economically while remaining sensory and generous. Each gesture is intentional, from soil biology to night lighting.",
    heroImage: `${publicUrl}images/blog2.jpg`,
    heroAlt: "Garden terrace with native planting",
    videoSrc: `${publicUrl}images/services-hero-vid.mp4`, // Use existing video file
    sections: [
      {
        heading: "Planting as architecture",
        body: [
          "We choreograph planting heights and densities to frame views and soften massing. Native species anchor biodiversity while accent specimens add seasonal theatre.",
          "Every path is drawn for both movement and pause, with textures that stay beautiful when wet or sunlit.",
          "Outdoor rooms take on microclimates through layered shade, scent, and sound, ensuring the landscape matures into a richer experience each season.",
          "We integrate subtle lighting and low-water irrigation so the garden feels curated after dusk while staying responsible through dry seasons.",
          "Stepping stones, timber decks, and crushed granite courts are detailed to stay tactile underfoot, inviting barefoot mornings and relaxed gatherings.",
        ],
        image: {
          src: `${publicUrl}images/pexels-fotoaibe-1571460.jpg`,
          alt: "Pathway through structured garden",
        },
      },
      {
        heading: "Water as a feature, not a cost",
        body: [
          "Swales, permeable paving, and discreet rain gardens keep sites resilient. Collected water feeds irrigation while sculptural spouts become sensory details.",
          "We detail thresholds and decks to manage runoff elegantly, so the landscape thrives without compromising the architecture.",
          "Native groundcovers stabilize soil while reducing maintenance, keeping long-term ownership predictable and delightful.",
          "We calibrate drainage to the architecture—concealing services, celebrating rills—so water becomes choreography rather than an afterthought.",
        ],
        image: {
          src: `${publicUrl}images/l4.jpg`,
          alt: "Reflective pool beside timber deck",
        },
      },
    ],
    gallery: [
      { src: `${publicUrl}images/l3.jpg`, alt: "Night-lit landscape" },
      { src: `${publicUrl}images/l2.jpg`, alt: "Garden steps with lighting" },
      { src: `${publicUrl}images/l1.jpg`, alt: "Entry framed by greenery" },
    ],
  },
  {
    id: 3,
    slug: "living-with-the-land",
    title: "Living With the Land",
    category: "Architecture",
    date: "10 Nov 2025",
    readTime: "6 min read",
    excerpt:
      "Design moves that let architecture breathe with its site, from coastal breezeways to bushland courtyards. Each gesture is tuned to climate, culture, and the cadence of everyday life. We design homes that feel inevitable on their sites.",
    heroImage: `${publicUrl}images/blog3.jpg`,
    heroAlt: "Home nestled in bushland",
    videoSrc: `${publicUrl}images/services-hero-vid.mp4`, // Use existing video file
    sections: [
      {
        heading: "Rooms arranged for seasons",
        body: [
          "We balance cross-ventilation with pockets of retreat. Sliding walls create breezeways, while deep thresholds stage the transition from wild landscape to calm interiors.",
          "Circulation doubles as gallery and lookout, so moving through the home feels like a curated walk through the site itself.",
          "We map prevailing winds and sun paths early, aligning rooms so comfort feels inherent—not an afterthought solved by mechanical systems.",
          "Outdoor living is framed as a series of moments—porches, decks, fire courts—so the landscape becomes part of daily rituals in every season.",
        ],
        image: {
          src: `${publicUrl}images/pexels-jvdm-1457842.jpg`,
          alt: "Open living connected to outdoors",
        },
      },
      {
        heading: "Crafting light as a material",
        body: [
          "High-level glazing funnels sky tones onto textured surfaces. Screens filter harsh sun into patterned shadows, shifting through the day.",
          "We balance glare control with glow, using layered sheers, fins, and deep jambs so daylight always feels soft and dimensional.",
          "At night, concealed washes and warm lantern points keep the home legible without overpowering the landscape’s quiet drama.",
          "Reflective pools, pale terraces, and matte interiors are composed together to paint with light, letting sky color and foliage tint each room.",
        ],
        image: {
          src: `${publicUrl}images/pexels-asphotography-94818.jpg`,
          alt: "Filtered light through slatted facade",
        },
      },
    ],
    gallery: [
      { src: `${publicUrl}images/l11.jpg`, alt: "Interior with timber slats" },
      { src: `${publicUrl}images/l5.jpg`, alt: "Kitchen with sculpted island" },
      { src: `${publicUrl}images/l6.jpg`, alt: "Alfresco dining at dusk" },
      { src: `${publicUrl}images/pexels-jvdm-1457842.jpg`, alt: "Bushland retreat exterior" },
    ],
  },
  {
    id: 4,
    slug: "crafted-proportions",
    title: "Crafted Proportions, Quiet Luxury",
    category: "Interiors",
    date: "02 Nov 2025",
    readTime: "5 min read",
    excerpt:
      "A study in balance: sculpted volumes, tactile finishes, and layers of light that make rooms feel effortlessly generous yet intimate.",
    heroImage: `${publicUrl}images/l4.jpg`,
    heroAlt: "Minimal living space with layered lighting",
    sections: [
      {
        heading: "Volumes that breathe",
        body: [
          "Ceiling steps, datum lines, and subtle reveals let light travel while keeping proportions calm. We choreograph sightlines so every turn reveals a framed vignette.",
          "Built-ins float off walls to keep edges light, while shadow gaps and soft radii make the architecture feel tailored rather than heavy.",
          "We test clearances and circulation in 1:1 mockups, ensuring furniture and joinery complement the architecture instead of competing with it.",
          "Storage is integrated into thresholds and plinths to keep surfaces calm, so the room feels generous even when lived in fully.",
        ],
        image: {
          src: `${publicUrl}images/l5.jpg`,
          alt: "Living room with floating joinery",
        },
      },
      {
        heading: "Texture as a signature",
        body: [
          "Plasters, brushed metals, and honed stone are balanced with woven textiles and timber grains for a palette that reads rich yet restrained.",
          "Lighting washes amplify texture rather than spotlighting objects, so spaces glow softly and feel lived-in from day one.",
          "Hardware, pulls, and hinges are chosen for tactility; every touchpoint reinforces the quiet luxury of the room.",
          "We balance cool and warm materials so the palette feels grounded across seasons, avoiding the fatigue of overly singular schemes.",
        ],
        image: {
          src: `${publicUrl}images/l6.jpg`,
          alt: "Textured wall with warm lighting",
        },
      },
      {
        heading: "Light that shapes mood",
        body: [
          "Layered scenes move from dawn to dusk without fuss: cove softness, task accents, and focused art lights that never glare.",
          "We tune color temperature to materiality—warmer near timber and textiles, neutral near stone—so each zone feels intentional.",
          "Controls stay intuitive with tactile dimmers and simple scenes; tech serves atmosphere rather than becoming the focus.",
        ],
        image: {
          src: `${publicUrl}images/port3.jpg`,
          alt: "Ambient lighting in a refined interior",
        },
      },
    ],
    gallery: [
      { src: `${publicUrl}images/port3.jpg`, alt: "Curated living vignette" },
      { src: `${publicUrl}images/net3.jpg`, alt: "Dining with sculpted pendant" },
      { src: `${publicUrl}images/sercard1.jpg`, alt: "Minimal staircase detail" },
      { src: `${publicUrl}images/l8.jpg`, alt: "Lounge opening to terrace" },
    ],
  },
  {
    id: 5,
    slug: "hospitality-at-home",
    title: "Hospitality at Home",
    category: "Lifestyle",
    date: "25 Oct 2025",
    readTime: "4 min read",
    excerpt:
      "Design moves that make entertaining effortless: layered seating, intuitive service paths, and lighting that shifts from lively to intimate.",
    heroImage: `${publicUrl}images/l3.jpg`,
    heroAlt: "Dining space ready for entertaining",
    sections: [
      {
        heading: "Flow that feels natural",
        body: [
          "We align kitchens, bars, and terraces so hosts can move between prep and guests without losing connection. Circulation doubles as staging.",
          "Thresholds are widened at key pinch points; hidden storage keeps surfaces calm while supporting lively gatherings.",
          "Acoustics and soft finishes temper noise, keeping conversations warm and effortless even in open plans.",
          "Service paths are planned alongside lighting and power so caterers or family helpers can move gracefully without disrupting the mood.",
        ],
        image: {
          src: `${publicUrl}images/l2.jpg`,
          alt: "Open kitchen connected to dining",
        },
      },
      {
        heading: "Light that leads the mood",
        body: [
          "Layered scenes—glow at the banquette, washes on art, candle-level accents at the table—shift easily from brunch to late-night.",
          "Dimmable, warm-white sources and concealed tracks avoid glare, while daylight is softened with sheers and fins.",
          "Exterior lighting extends the room outward, pulling the terrace into the experience and keeping silhouettes flattering for guests.",
        ],
        image: {
          src: `${publicUrl}images/l1.jpg`,
          alt: "Evening dining ambience",
        },
      },
      {
        heading: "Details that host with ease",
        body: [
          "Bar niches, concealed ice, and hidden AV keep tools close without visual clutter, so the stage stays elegant even mid-service.",
          "Surfaces are selected for resilience—stain-resistant, tactile, easy to reset—so the space feels luxurious without becoming precious.",
          "We choreograph seating heights and softness so guests can linger comfortably, from casual cocktails to long dinners.",
        ],
        image: {
          src: `${publicUrl}images/port1.jpg`,
          alt: "Entertaining setup with bar and lounge",
        },
      },
    ],
    gallery: [
      { src: `${publicUrl}images/l4.jpg`, alt: "Terrace dining setup" },
      { src: `${publicUrl}images/l5.jpg`, alt: "Bar with warm lighting" },
      { src: `${publicUrl}images/l6.jpg`, alt: "Lounge for guests" },
      { src: `${publicUrl}images/port1.jpg`, alt: "Open plan entertaining" },
    ],
  },
  {
    id: 6,
    slug: "future-ready-homes",
    title: "Future-Ready Homes",
    category: "Technology",
    date: "18 Oct 2025",
    readTime: "5 min read",
    excerpt:
      "Infrastructure-first thinking: service spines, smart layers, and resilient envelopes that keep homes adaptable for decades.",
    heroImage: `${publicUrl}images/port3.jpg`,
    heroAlt: "Modern home exterior with clean lines",
    sections: [
      {
        heading: "Infrastructure as backbone",
        body: [
          "We centralize services in discreet spines so upgrades and maintenance happen without disrupting finishes or family life.",
          "Low-voltage pathways, EV readiness, and ventilation routes are planned early, keeping ceilings clean and future options open.",
          "We design access points thoughtfully—panels, chases, and risers are hidden yet reachable—so maintenance stays simple for decades.",
        ],
        image: {
          src: `${publicUrl}images/port1.jpg`,
          alt: "Facade with integrated lighting",
        },
      },
      {
        heading: "Smart, but human",
        body: [
          "Control layers remain intuitive: tactile switches for everyday use, scenes for convenience, and discreet sensors for efficiency.",
          "We prioritize reliability and serviceability over novelty, choosing ecosystems that age gracefully with minimal friction.",
          "Envelope performance—insulation, air-sealing, shading—does the heavy lifting so tech enhances rather than compensates.",
          "We document networks, power, and device maps so future upgrades are predictable, keeping your home adaptable without rewiring.",
        ],
        image: {
          src: `${publicUrl}images/net3.jpg`,
          alt: "Interior with integrated tech",
        },
      },
      {
        heading: "Resilience by design",
        body: [
          "Materials are chosen for durability and reuse; surfaces can be refinished rather than replaced, keeping the home both timeless and sustainable.",
          "We pair backup strategies—battery readiness, shading redundancy, natural ventilation—with clear user guidance for extreme weather days.",
          "Infrastructure planning includes discrete storage, flexible rooms, and adaptable joinery so your home can evolve with changing needs.",
        ],
        image: {
          src: `${publicUrl}images/sercard1.jpg`,
          alt: "Robust detailing in a modern home",
        },
      },
    ],
    gallery: [
      { src: `${publicUrl}images/l8.jpg`, alt: "Evening exterior glow" },
      { src: `${publicUrl}images/l11.jpg`, alt: "Entry with clean detailing" },
      { src: `${publicUrl}images/sercard1.jpg`, alt: "Minimal interior tech" },
      { src: `${publicUrl}images/pexels-asphotography-94818.jpg`, alt: "Facade texture close-up" },
    ],
  },
];

export const getBlogBySlug = (slug: string | undefined) =>
  blogPosts.find((post) => post.slug === slug);
