import React from "react";
import { useParams } from "react-router-dom";
import ProjectDetails from "../components/Projects/ProjectDetails";

const publicUrl = import.meta.env.BASE_URL;

// Project data for different projects
const projectsData = {
  "luxury-villa-brighton": {
    id: "luxury-villa-brighton",
    title: "Luxury Villa in Brighton",
    subtitle: "Oceanfront Luxury Living",
    description:
      "This stunning modern villa in Brighton features panoramic ocean views, contemporary architecture, and premium finishes throughout. The design seamlessly blends indoor and outdoor living spaces, creating a luxurious retreat that captures the essence of coastal living.",
    heroImage: `${publicUrl}images/l1.jpg`,
    features: [
      {
        title: "Infinity Pool & Ocean Views",
        description:
          "Expansive infinity pool overlooking the ocean with integrated spa features and outdoor entertainment areas.",
        image: `${publicUrl}images/1.jpg`,
      },
      {
        title: "Open-Plan Living",
        description:
          "Spacious open-plan design connecting the living, dining, and kitchen areas with floor-to-ceiling glass windows.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        title: "Smart Home Technology",
        description:
          "Integrated smart home systems for lighting, climate control, security, and entertainment throughout the property.",
        image: `${publicUrl}images/6.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Site Analysis & Design",
        description:
          "Comprehensive site evaluation considering ocean views, coastal regulations, and environmental impact assessments.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        step: 2,
        title: "Construction Planning",
        description:
          "Detailed construction planning with local contractors, material sourcing, and timeline development.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        step: 3,
        title: "Quality Assurance",
        description:
          "Rigorous quality control throughout construction with regular inspections and final walkthrough before handover.",
        image: `${publicUrl}images/11.jpg`,
      },
    ],
    testimonial: {
      quote:
        "Our Brighton villa exceeded all expectations. The ocean views are breathtaking, and the modern design perfectly complements the coastal location. FORMA delivered a masterpiece.",
      author: "Sarah & Michael Chen",
      project: "Luxury Villa, Brighton",
    },
    gallery: [
      `${publicUrl}images/l2.jpg`,
      `${publicUrl}images/l3.jpg`,
      `${publicUrl}images/l4.jpg`,
      `${publicUrl}images/l5.jpg`,
    ],
    ctaTitle: "Experience Luxury Living",
    ctaDescription:
      "Discover how we can create your dream coastal retreat. Contact us to discuss your luxury villa project.",
    stats: [
      { number: "280%", label: "Property Value Increase" },
      { number: "4.9★", label: "Client Rating" },
      { number: "18mo", label: "Project Timeline" },
    ],
  },
  "contemporary-family-home": {
    id: "contemporary-family-home",
    title: "Contemporary Family Home",
    subtitle: "Modern Family Living Space",
    description:
      "This contemporary family home combines sleek modern design with practical family living. Featuring an open-plan layout, sustainable materials, and smart home integration, it provides the perfect environment for modern family life.",
    heroImage: `${publicUrl}images/l2.jpg`,
    features: [
      {
        title: "Open-Plan Layout",
        description:
          "Seamless flow between living spaces with high ceilings and abundant natural light.",
        image: `${publicUrl}images/16.jpg`,
      },
      {
        title: "Sustainable Materials",
        description:
          "Eco-friendly construction using recycled materials and energy-efficient systems.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        title: "Family-Oriented Design",
        description:
          "Thoughtful design elements including play areas, home office spaces, and flexible room configurations.",
        image: `${publicUrl}images/7.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Family Consultation",
        description:
          "Understanding family dynamics, lifestyle needs, and long-term requirements for the home design.",
        image: `${publicUrl}images/6.jpg`,
      },
      {
        step: 2,
        title: "Design & Planning",
        description:
          "Creating detailed plans that balance modern aesthetics with practical family functionality.",
        image: `${publicUrl}images/16.jpg`,
      },
      {
        step: 3,
        title: "Construction & Finishing",
        description:
          "Building with quality materials and attention to detail for a durable, beautiful family home.",
        image: `${publicUrl}images/5.jpg`,
      },
    ],
    testimonial: {
      quote:
        "Our contemporary family home is everything we dreamed of and more. The open spaces work perfectly for our growing family, and the sustainable features give us peace of mind.",
      author: "Jennifer & David Chen",
      project: "Contemporary Family Home, Brighton",
    },
    gallery: [
      `${publicUrl}images/l3.jpg`,
      `${publicUrl}images/l4.jpg`,
      `${publicUrl}images/l5.jpg`,
      `${publicUrl}images/l1.jpg`,
    ],
    ctaTitle: "Build Your Family Home",
    ctaDescription:
      "Create the perfect family sanctuary with our contemporary home design expertise.",
    stats: [
      { number: "92%", label: "Energy Efficiency" },
      { number: "5★", label: "Family Comfort Rating" },
      { number: "12mo", label: "Construction Time" },
    ],
  },
  "urban-penthouse-renovation": {
    id: "urban-penthouse-renovation",
    title: "Urban Penthouse Renovation",
    subtitle: "City Living Redefined",
    description:
      "Complete transformation of a city penthouse into a luxurious urban oasis. This renovation project combined modern design with premium finishes, creating a sophisticated space that maximizes city views and lifestyle.",
    heroImage: `${publicUrl}images/l3.jpg`,
    features: [
      {
        title: "City Skyline Views",
        description:
          "Floor-to-ceiling windows and open terraces providing unobstructed views of the city skyline.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        title: "Premium Finishes",
        description:
          "Luxury materials including marble countertops, custom cabinetry, and high-end appliances.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        title: "Smart Integration",
        description:
          "Seamless integration of technology for lighting, entertainment, and home automation systems.",
        image: `${publicUrl}images/10.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Assessment & Vision",
        description:
          "Evaluating the existing space and developing a vision that maximizes the penthouse's potential.",
        image: `${publicUrl}images/16.jpg`,
      },
      {
        step: 2,
        title: "Design Development",
        description:
          "Creating detailed renovation plans that respect the building's structure while introducing modern luxury.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        step: 3,
        title: "Renovation Execution",
        description:
          "Careful renovation work minimizing disruption while achieving the desired luxurious outcome.",
        image: `${publicUrl}images/7.jpg`,
      },
    ],
    testimonial: {
      quote:
        "The penthouse renovation transformed our space into a luxurious urban retreat. The attention to detail and quality of finishes exceeded our expectations.",
      author: "Emma & James Wilson",
      project: "Penthouse Renovation, South Yarra",
    },
    gallery: [
      `${publicUrl}images/l4.jpg`,
      `${publicUrl}images/l5.jpg`,
      `${publicUrl}images/l1.jpg`,
      `${publicUrl}images/l2.jpg`,
    ],
    ctaTitle: "Elevate Your Urban Living",
    ctaDescription:
      "Transform your city space into a luxurious penthouse sanctuary.",
    stats: [
      { number: "350%", label: "Property Value Growth" },
      { number: "180°", label: "City View Coverage" },
      { number: "8mo", label: "Renovation Period" },
    ],
  },
  "heritage-estate-restoration": {
    id: "heritage-estate-restoration",
    title: "Heritage Estate Restoration",
    subtitle: "Preserving History with Modern Luxury",
    description:
      "Careful restoration of a historic estate that preserves architectural heritage while introducing modern amenities and luxury. This project demonstrates our expertise in balancing tradition with contemporary comfort.",
    heroImage: `${publicUrl}images/l4.jpg`,
    features: [
      {
        title: "Heritage Preservation",
        description:
          "Maintaining original architectural features, period details, and historical integrity.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        title: "Modern Amenities",
        description:
          "Integration of contemporary systems including smart technology, modern kitchens, and luxury bathrooms.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        title: "Structural Integrity",
        description:
          "Reinforcement and modernization of structural elements while preserving the building's character.",
        image: `${publicUrl}images/6.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Historical Research",
        description:
          "Comprehensive research into the estate's history, architecture, and heritage significance.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        step: 2,
        title: "Restoration Planning",
        description:
          "Developing detailed plans that respect heritage guidelines while introducing modern functionality.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        step: 3,
        title: "Careful Restoration",
        description:
          "Meticulous restoration work using traditional techniques combined with modern construction methods.",
        image: `${publicUrl}images/10.jpg`,
      },
    ],
    testimonial: {
      quote:
        "The restoration of our heritage estate was masterful. FORMA preserved the historical character while creating a modern, comfortable home for our family.",
      author: "Robert & Catherine Miller",
      project: "Custom Estate, Hawthorn",
    },
    gallery: [
      `${publicUrl}images/l5.jpg`,
      `${publicUrl}images/l1.jpg`,
      `${publicUrl}images/l2.jpg`,
      `${publicUrl}images/l3.jpg`,
    ],
    ctaTitle: "Restore Your Heritage",
    ctaDescription:
      "Preserve architectural history while enjoying modern luxury living.",
    stats: [
      { number: "125yr", label: "Heritage Preserved" },
      { number: "A+", label: "Heritage Compliance" },
      { number: "24mo", label: "Restoration Timeline" },
    ],
  },
  "eco-friendly-townhouse": {
    id: "eco-friendly-townhouse",
    title: "Eco-Friendly Townhouse",
    subtitle: "Sustainable Urban Living",
    description:
      "A forward-thinking townhouse design that incorporates green technologies and sustainable practices. This project showcases our commitment to environmentally responsible architecture without compromising on style or comfort.",
    heroImage: `${publicUrl}images/l5.jpg`,
    features: [
      {
        title: "Solar Power Integration",
        description:
          "Solar panels and energy storage systems providing clean, renewable energy for the home.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        title: "Green Building Materials",
        description:
          "Sustainable materials including recycled timber, low-VOC paints, and energy-efficient insulation.",
        image: `${publicUrl}images/6.jpg`,
      },
      {
        title: "Water Conservation",
        description:
          "Rainwater harvesting, greywater recycling, and water-efficient fixtures reducing environmental impact.",
        image: `${publicUrl}images/16.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Sustainability Assessment",
        description:
          "Evaluating environmental impact and developing strategies for sustainable construction practices.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        step: 2,
        title: "Green Design",
        description:
          "Incorporating sustainable design principles while maintaining aesthetic appeal and functionality.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        step: 3,
        title: "Eco-Construction",
        description:
          "Building with environmentally responsible methods and materials for a truly sustainable home.",
        image: `${publicUrl}images/6.jpg`,
      },
    ],
    testimonial: {
      quote:
        "Our eco-friendly townhouse is not only beautiful but also environmentally responsible. The sustainable features give us confidence in our environmental impact.",
      author: "Andrew & Sarah Johnson",
      project: "Victorian Home Renovation, Prahran",
    },
    gallery: [
      `${publicUrl}images/l1.jpg`,
      `${publicUrl}images/l2.jpg`,
      `${publicUrl}images/l3.jpg`,
      `${publicUrl}images/l4.jpg`,
    ],
    ctaTitle: "Build Sustainably",
    ctaDescription:
      "Create an environmentally responsible home that contributes to a sustainable future.",
    stats: [
      { number: "85%", label: "Energy Reduction" },
      { number: "7★", label: "Green Rating" },
      { number: "15mo", label: "Build Duration" },
    ],
  },
  "seacliff-residence": {
    id: "seacliff-residence",
    title: "Seacliff Residence",
    subtitle: "Oceanfront Luxury Living",
    description:
      "Stunning ocean-facing luxury retreat featuring layered terraces that cascade down the cliffside, native landscaping that blends seamlessly with the coastal environment, and seamless indoor-outdoor living spaces that capture panoramic ocean views.",
    heroImage: `${publicUrl}images/sercard1.jpg`,
    features: [
      {
        title: "Layered Ocean Terraces",
        description:
          "Multi-level terraces following the natural cliff contours, each offering unique ocean perspectives and outdoor living spaces.",
        image: `${publicUrl}images/6.jpg`,
      },
      {
        title: "Native Coastal Landscaping",
        description:
          "Indigenous coastal plantings that require minimal maintenance while providing natural privacy and habitat for local wildlife.",
        image: `${publicUrl}images/16.jpg`,
      },
      {
        title: "Indoor-Outdoor Flow",
        description:
          "Floor-to-ceiling glass walls that retract completely, blurring the boundary between interior luxury and coastal nature.",
        image: `${publicUrl}images/5.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Cliff Analysis & Engineering",
        description:
          "Comprehensive geological survey and structural engineering to ensure safe construction on the challenging cliffside location.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        step: 2,
        title: "Terrace Design",
        description:
          "Careful design of multi-level terraces that maximize ocean views while ensuring structural integrity and drainage.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        step: 3,
        title: "Coastal Integration",
        description:
          "Seamless integration of architecture with the natural coastal environment using sustainable materials and native landscaping.",
        image: `${publicUrl}images/6.jpg`,
      },
    ],
    testimonial: {
      quote:
        "The Seacliff Residence is our dream home. The ocean views are breathtaking, and the indoor-outdoor living is perfect for our coastal lifestyle. FORMA understood exactly what we wanted.",
      author: "James & Patricia Williams",
      project: "Seacliff Residence",
    },
    gallery: [
      `${publicUrl}images/sercard1.jpg`,
      `${publicUrl}images/l2.jpg`,
      `${publicUrl}images/l3.jpg`,
      `${publicUrl}images/l4.jpg`,
    ],
    ctaTitle: "Coastal Luxury Living",
    ctaDescription:
      "Experience the ultimate oceanfront lifestyle with a residence designed to harmonize with the coastal environment.",
    stats: [
      { number: "240°", label: "Ocean View Coverage" },
      { number: "3", label: "Terrace Levels" },
      { number: "22mo", label: "Construction Time" },
    ],
  },
  "hinterland-pavilion": {
    id: "hinterland-pavilion",
    title: "Hinterland Pavilion",
    subtitle: "Sustainable Forest Living",
    description:
      "Elevated pavilion home nestled in the hinterland, featuring sophisticated timber screening systems, passive cooling design that works with the natural environment, and a warm minimalist interior palette that celebrates natural materials.",
    heroImage: `${publicUrl}images/sercard2.jpg`,
    features: [
      {
        title: "Timber Screening System",
        description:
          "Dynamic timber screens that provide privacy, sun control, and ventilation while creating beautiful light patterns throughout the day.",
        image: `${publicUrl}images/16.jpg`,
      },
      {
        title: "Passive Cooling Design",
        description:
          "Natural ventilation systems, thermal mass, and orientation that eliminate the need for mechanical cooling while maintaining year-round comfort.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        title: "Minimalist Interior",
        description:
          "Warm, minimalist interiors using natural timber, stone, and neutral colors that create a serene connection with the surrounding forest.",
        image: `${publicUrl}images/7.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Site Integration",
        description:
          "Careful analysis of the forest site to minimize environmental impact and maximize natural light and ventilation.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        step: 2,
        title: "Sustainable Design",
        description:
          "Design development focused on passive systems, local materials, and minimal environmental footprint.",
        image: `${publicUrl}images/6.jpg`,
      },
      {
        step: 3,
        title: "Craftsmanship",
        description:
          "Precision construction with attention to timber detailing and integration of sustainable systems.",
        image: `${publicUrl}images/16.jpg`,
      },
    ],
    testimonial: {
      quote:
        "Our Hinterland Pavilion is a sanctuary. The passive design keeps us comfortable year-round without any air conditioning, and the timber screens create the most beautiful light patterns.",
      author: "Robert & Sophie Chen",
      project: "Hinterland Pavilion",
    },
    gallery: [
      `${publicUrl}images/sercard2.jpg`,
      `${publicUrl}images/l3.jpg`,
      `${publicUrl}images/l4.jpg`,
      `${publicUrl}images/l5.jpg`,
    ],
    ctaTitle: "Sustainable Forest Living",
    ctaDescription:
      "Discover how we can create a home that lives in harmony with nature while providing modern comfort and style.",
    stats: [
      { number: "0$", label: "Cooling Costs" },
      { number: "95%", label: "Natural Materials" },
      { number: "16mo", label: "Build Time" },
    ],
  },
  "urban-courtyard-house": {
    id: "urban-courtyard-house",
    title: "Urban Courtyard House",
    subtitle: "Inner-City Sanctuary",
    description:
      "Innovative inner-city sanctuary built around a sculpted central courtyard that serves as the heart of the home, featuring clerestory lighting that floods the spaces with natural light, and bespoke joinery moments that showcase exceptional craftsmanship.",
    heroImage: `${publicUrl}images/sercard3.jpg`,
    features: [
      {
        title: "Sculpted Courtyard",
        description:
          "Central courtyard designed as a sculptural element that provides privacy, natural light, and a connection to nature in the urban context.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        title: "Clerestory Lighting",
        description:
          "Strategic high-level windows that flood interior spaces with natural light while maintaining privacy and creating dramatic shadow patterns.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        title: "Bespoke Joinery",
        description:
          "Custom-designed cabinetry and built-in elements that maximize storage and create seamless architectural integration.",
        image: `${publicUrl}images/10.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Urban Site Analysis",
        description:
          "Detailed analysis of the urban context, neighboring buildings, and solar access to optimize the courtyard design.",
        image: `${publicUrl}images/6.jpg`,
      },
      {
        step: 2,
        title: "Courtyard Design",
        description:
          "Development of the courtyard as the central organizing element that connects all living spaces.",
        image: `${publicUrl}images/16.jpg`,
      },
      {
        step: 3,
        title: "Craftsmanship Integration",
        description:
          "Execution of bespoke joinery and custom details that elevate the quality and functionality of every space.",
        image: `${publicUrl}images/5.jpg`,
      },
    ],
    testimonial: {
      quote:
        "The Urban Courtyard House transformed how we live in the city. The central courtyard brings nature into our home, and the attention to detail in the joinery is exceptional.",
      author: "Michael & Emma Thompson",
      project: "Urban Courtyard House",
    },
    gallery: [
      `${publicUrl}images/sercard3.jpg`,
      `${publicUrl}images/l4.jpg`,
      `${publicUrl}images/l5.jpg`,
      `${publicUrl}images/l1.jpg`,
    ],
    ctaTitle: "Urban Sanctuary Living",
    ctaDescription:
      "Create your own inner-city sanctuary with innovative design that brings nature and light into urban living.",
    stats: [
      { number: "200%", label: "Natural Light Increase" },
      { number: "4", label: "Courtyard Zones" },
      { number: "14mo", label: "Project Duration" },
    ],
  },
  "forest-ridge-lodge": {
    id: "forest-ridge-lodge",
    title: "Forest Ridge Lodge",
    subtitle: "Weekend Wilderness Retreat",
    description:
      "Exclusive weekend lodge positioned along the forest ridge, featuring natural stone construction that grounds the building in its environment, warm cedar cladding that weathers beautifully over time, and expansive glazing that frames breathtaking treetop views from every room.",
    heroImage: `${publicUrl}images/4.avif`,
    features: [
      {
        title: "Natural Stone Construction",
        description:
          "Locally sourced stone foundations and walls that connect the lodge to the earth and provide thermal mass for temperature regulation.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        title: "Cedar Cladding",
        description:
          "Western cedar exterior that will develop a beautiful silver patina over time, blending seamlessly with the forest environment.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        title: "Expansive Forest Views",
        description:
          "Floor-to-ceiling glazing strategically placed to capture panoramic treetop views and bring the forest into every room.",
        image: `${publicUrl}images/6.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Ridge Integration",
        description:
          "Careful site planning to position the lodge along the natural ridge while minimizing environmental impact.",
        image: `${publicUrl}images/16.jpg`,
      },
      {
        step: 2,
        title: "Material Selection",
        description:
          "Sourcing of local stone and cedar to ensure the lodge feels like it belongs in the forest environment.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        step: 3,
        title: "View Optimization",
        description:
          "Strategic placement of windows and glazing to maximize forest views while maintaining privacy and energy efficiency.",
        image: `${publicUrl}images/7.jpg`,
      },
    ],
    testimonial: {
      quote:
        "Forest Ridge Lodge is our perfect weekend escape. The stone construction makes it feel solid and permanent, while the cedar cladding connects it to the forest. The views are simply spectacular.",
      author: "David & Jennifer Mitchell",
      project: "Forest Ridge Lodge",
    },
    gallery: [
      `${publicUrl}images/4.avif`,
      `${publicUrl}images/l5.jpg`,
      `${publicUrl}images/l1.jpg`,
      `${publicUrl}images/l2.jpg`,
    ],
    ctaTitle: "Weekend Wilderness Living",
    ctaDescription:
      "Create your perfect weekend retreat with a lodge designed to harmonize with the natural forest environment.",
    stats: [
      { number: "100%", label: "Forest Integration" },
      { number: "50yr", label: "Material Lifespan" },
      { number: "18mo", label: "Build Period" },
    ],
  },
  "coastal-retreat-escape": {
    id: "coastal-retreat-escape",
    title: "Coastal Retreat Escape",
    subtitle: "Oceanfront Sanctuary",
    description:
      "Serene coastal retreat featuring layered decks that cascade toward the ocean, soft natural light filtering through expansive windows, and interiors designed to calm and rejuvenate with ocean-inspired colors and textures.",
    heroImage: `${publicUrl}images/l6.jpg`,
    features: [
      {
        title: "Layered Ocean Decks",
        description:
          "Multi-level deck system following the natural coastal slope, each level offering unique ocean perspectives and outdoor living spaces.",
        image: `${publicUrl}images/1.jpg`,
      },
      {
        title: "Soft Natural Lighting",
        description:
          "Strategic window placement and light-filtering treatments that create gentle, calming light patterns throughout the interior spaces.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        title: "Ocean-Calming Interiors",
        description:
          "Coastal-inspired color palette and natural materials that create a tranquil, rejuvenating environment connected to the seascape.",
        image: `${publicUrl}images/6.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Coastal Site Analysis",
        description:
          "Comprehensive study of coastal conditions, ocean views, and environmental factors to optimize retreat design.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        step: 2,
        title: "Deck Integration Design",
        description:
          "Careful planning of multi-level deck systems that maximize ocean access while maintaining structural integrity.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        step: 3,
        title: "Interior Atmosphere Creation",
        description:
          "Design of interior spaces that capture the calming essence of coastal living with natural materials and lighting.",
        image: `${publicUrl}images/11.jpg`,
      },
    ],
    testimonial: {
      quote:
        "Our Coastal Retreat Escape is exactly what we needed. The layered decks give us perfect ocean access, and the interior spaces feel so calming and connected to the sea.",
      author: "Thomas & Maria Rodriguez",
      project: "Coastal Retreat Escape",
    },
    gallery: [
      `${publicUrl}images/l6.jpg`,
      `${publicUrl}images/l8.jpg`,
      `${publicUrl}images/l11.jpg`,
      `${publicUrl}images/1.jpg`,
    ],
    ctaTitle: "Coastal Sanctuary Living",
    ctaDescription:
      "Create your own coastal retreat where ocean breezes and serene views become part of your daily life.",
    stats: [
      { number: "5", label: "Deck Levels" },
      { number: "270°", label: "Ocean Views" },
      { number: "20mo", label: "Project Timeline" },
    ],
  },
  "hillside-garden-home": {
    id: "hillside-garden-home",
    title: "Hillside Garden Home",
    subtitle: "Terraced Living Paradise",
    description:
      "Stunning hillside residence featuring terraced living spaces that follow the natural slope, lush courtyard gardens that bring nature into every level, and warm timber finishes complemented by sweeping panoramic views of the surrounding landscape.",
    heroImage: `${publicUrl}images/l8.jpg`,
    features: [
      {
        title: "Terraced Living Spaces",
        description:
          "Multi-level terraces that follow the natural hillside contour, creating distinct living areas connected by gardens and views.",
        image: `${publicUrl}images/5.jpg`,
      },
      {
        title: "Lush Courtyard Gardens",
        description:
          "Integrated garden spaces at each level that provide natural privacy, fresh herbs, and a connection to nature throughout the home.",
        image: `${publicUrl}images/6.jpg`,
      },
      {
        title: "Warm Timber Finishes",
        description:
          "Natural timber elements throughout the interior that create warmth and continuity with the surrounding hillside environment.",
        image: `${publicUrl}images/7.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Hillside Analysis",
        description:
          "Detailed topographical study and soil analysis to optimize terraced design and ensure structural stability.",
        image: `${publicUrl}images/10.jpg`,
      },
      {
        step: 2,
        title: "Terrace Planning",
        description:
          "Design of multi-level layout that maximizes views while creating functional living spaces integrated with gardens.",
        image: `${publicUrl}images/11.jpg`,
      },
      {
        step: 3,
        title: "Garden Integration",
        description:
          "Implementation of lush garden spaces that enhance privacy, provide fresh produce, and connect indoor-outdoor living.",
        image: `${publicUrl}images/16.jpg`,
      },
    ],
    testimonial: {
      quote:
        "The Hillside Garden Home exceeded our dreams. Every terrace has its own garden and view, and the timber finishes make it feel so warm and connected to nature.",
      author: "James & Patricia Chen",
      project: "Hillside Garden Home",
    },
    gallery: [
      `${publicUrl}images/l8.jpg`,
      `${publicUrl}images/l11.jpg`,
      `${publicUrl}images/1.jpg`,
      `${publicUrl}images/5.jpg`,
    ],
    ctaTitle: "Hillside Paradise Living",
    ctaDescription:
      "Create your own hillside sanctuary where terraced gardens and panoramic views become part of your daily experience.",
    stats: [
      { number: "6", label: "Terrace Levels" },
      { number: "180°", label: "Panoramic Views" },
      { number: "24mo", label: "Construction Time" },
    ],
  },
  "modern-courtyard-residence": {
    id: "modern-courtyard-residence",
    title: "Modern Courtyard Residence",
    subtitle: "Minimalist Design Haven",
    description:
      "Contemporary residence featuring clean minimalist lines, sculpted natural light that creates dramatic interior patterns, and a tranquil central courtyard that serves as the heart of the home with peaceful garden sanctuary.",
    heroImage: `${publicUrl}images/l11.jpg`,
    features: [
      {
        title: "Minimalist Lines",
        description:
          "Clean architectural lines and simple geometric forms that create a sophisticated, uncluttered aesthetic throughout the residence.",
        image: `${publicUrl}images/6.jpg`,
      },
      {
        title: "Sculpted Natural Light",
        description:
          "Strategic window placement and architectural elements that create dynamic light patterns and enhance the minimalist design.",
        image: `${publicUrl}images/7.jpg`,
      },
      {
        title: "Tranquil Courtyard Heart",
        description:
          "Central garden courtyard that provides natural light, ventilation, and a peaceful sanctuary visible from main living spaces.",
        image: `${publicUrl}images/10.jpg`,
      },
    ],
    process: [
      {
        step: 1,
        title: "Minimalist Design Concept",
        description:
          "Development of clean architectural language that emphasizes simplicity, functionality, and sophisticated spatial relationships.",
        image: `${publicUrl}images/11.jpg`,
      },
      {
        step: 2,
        title: "Light Planning",
        description:
          "Careful analysis of natural light patterns and window placement to optimize sculpted light effects throughout the day.",
        image: `${publicUrl}images/16.jpg`,
      },
      {
        step: 3,
        title: "Courtyard Integration",
        description:
          "Design and implementation of central courtyard that serves as the organizing element and peaceful heart of the residence.",
        image: `${publicUrl}images/1.jpg`,
      },
    ],
    testimonial: {
      quote:
        "Our Modern Courtyard Residence is perfect. The minimalist design creates such a sense of calm, and the courtyard brings beautiful light and nature into our home.",
      author: "Michael & Sarah Johnson",
      project: "Modern Courtyard Residence",
    },
    gallery: [
      `${publicUrl}images/l11.jpg`,
      `${publicUrl}images/5.jpg`,
      `${publicUrl}images/6.jpg`,
      `${publicUrl}images/7.jpg`,
    ],
    ctaTitle: "Modern Sanctuary Living",
    ctaDescription:
      "Create your own minimalist haven where clean lines and tranquil spaces provide the perfect backdrop for modern living.",
    stats: [
      { number: "300%", label: "Natural Light Increase" },
      { number: "1", label: "Central Courtyard" },
      { number: "16mo", label: "Build Duration" },
    ],
  },
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const projectData = projectId
    ? projectsData[projectId as keyof typeof projectsData]
    : projectsData["luxury-villa-brighton"];

  if (!projectData) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1>Project Not Found</h1>
        <p>The requested project could not be found.</p>
      </div>
    );
  }

  const processImages = projectData.process?.map((p) => p.image) || [];
  const galleryImages = projectData.gallery || [];
  const fullImage = galleryImages[0] || projectData.heroImage;

  return (
    <ProjectDetails
      heroImage={projectData.heroImage}
      title={projectData.title}
      subtitle={projectData.subtitle}
      category={projectData.subtitle}
      backLink="/projects"
      fullImage={fullImage}
      processImages={processImages}
      galleryImages={galleryImages}
      stats={projectData.stats}
    />
  );
};

export default ProjectDetailPage;
