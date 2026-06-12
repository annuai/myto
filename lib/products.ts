export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  features: { title: string; description: string }[];
  specs: Record<string, string>;
  compatibility: string[];
  whatsInBox: string[];
  installTime: string;
  materials: string;
  ecosystemNote: string;
  reviewCount?: number;
  rating?: number;
  inStock?: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "trail-beam",
    name: "Trail Beam",
    tagline: "Light that cuts through every condition.",
    description:
      "A pair of auxiliary LED fog lamps engineered from scratch for adventure riders. CFD-optimised housing reduces drag, IP67 sealing handles submersion, and 1800 lumens per lamp genuinely changes what's visible at night.",
    longDescription:
      "Stock headlights are designed for road approval, not for the conditions adventure riders actually encounter. The Trail Beam was built to solve that gap — starting with the housing shape. Multiple CFD iterations shaped the aerodynamic profile until turbulent drag at 120 km/h was minimised. The electronics use a constant-current driver with thermal regulation so output stays consistent regardless of temperature. The IP67-rated housing has a conformal-coated PCB and full gasket sealing throughout.",
    price: 7000,
    category: "Lighting",
    features: [
      {
        title: "CFD-optimised housing",
        description:
          "The lamp body was iterated through computational fluid dynamics simulation to minimise turbulent wake and buffeting at speed.",
      },
      {
        title: "IP67 weatherproofing",
        description:
          "Full submersion-rated gasket sealing, conformal-coated PCB, and stainless fasteners throughout. Rain, mud, and pressure washing handled.",
      },
      {
        title: "Wide beam pattern",
        description:
          "Engineered for peripheral illumination rather than forward throw — fills the gaps your main beam misses, especially on unlit roads and bends.",
      },
      {
        title: "Constant-current driver",
        description:
          "Temperature-regulated electronics maintain consistent lumen output whether it's 5°C in the mountains or 42°C on a summer motorway.",
      },
      {
        title: "Plug-and-play harness",
        description:
          "Includes relay, in-line fuse, and handlebar toggle switch. Protects your bike's original wiring and installs in under 90 minutes.",
      },
      {
        title: "Universal mounting",
        description:
          "Crash bar clamps and tube clamps (16–22mm) included. Specific brackets available for BMW GS, Triumph Tiger, and Honda Africa Twin.",
      },
    ],
    specs: {
      "Light Output": "1,800 lumens per lamp",
      "Beam Pattern": "Wide / fog optimised",
      "LED Driver": "Constant-current, thermally regulated",
      "Housing Material": "Die-cast aluminium",
      "IP Rating": "IP67",
      "Lens Material": "Polycarbonate with UV hard coat",
      "Colour Temperature": "5,000K white / 3,000K selective yellow",
      "Wire Harness": "Relay, fuse, handlebar switch included",
      "Input Voltage": "10–15V DC",
      "Weight": "210g per lamp",
    },
    compatibility: [
      "Universal 12V systems",
      "16–22mm tube clamps included",
      "Crash bar clamps included",
      "BMW R/F/GS series (specific bracket available)",
      "Triumph Tiger / Explorer series",
      "Honda Africa Twin CRF1100",
      "KTM Adventure 390 / 790 / 890 / 1090 / 1290",
      "Royal Enfield Himalayan 450",
    ],
    whatsInBox: [
      "Trail Beam lamps × 2",
      "Die-cast aluminium mounting brackets × 2",
      "16–22mm tube clamps × 2",
      "Crash bar clamps (25mm / 32mm) × 2",
      "Wire harness with relay and inline fuse",
      "Handlebar toggle switch",
      "M6 stainless hardware pack",
      "Installation guide",
    ],
    installTime: "60–90 minutes",
    materials: "Die-cast aluminium housing, polycarbonate lens, stainless steel hardware, silicone gaskets",
    ecosystemNote:
      "Pairs directly with Navi for integrated lighting triggers. The Trail Beam harness includes a signal output compatible with the navi's accessory port.",
  },
  {
    id: "p2",
    slug: "trail-kit",
    name: "Trail Kit",
    tagline: "Everything you need. Organised where you need it.",
    description:
      "A modular adventure utility system built around a magnetic tank bag that expands from 8L to 12L, a waxed canvas tool roll, and a comprehensive strapping kit. Designed for riders who travel far from easy.",
    longDescription:
      "Most adventure luggage is designed by people who photograph riding rather than do it. The Trail Kit came from a clear brief: carry the things you'll actually reach for, organise them so you can find them wearing gloves, and survive conditions that would ruin lesser kit. The magnetic tank bag uses rare-earth magnets strong enough to hold through mountain passes but releases cleanly with one hand. The waxed canvas tool roll uses precision-cut pockets sized to specific tools, not generic slots.",
    price: 5000,
    category: "Utility",
    features: [
      {
        title: "Magnetic tank bag",
        description:
          "N52 rare-earth magnets hold securely on any steel tank. Foam-padded base protects your paint. Expands from 8L to 12L via side zip.",
      },
      {
        title: "Weatherproof construction",
        description:
          "Polyester 600D outer with PU-coated interior lining. All zips are YKK water-resistant. Survives sustained rain without a rain cover.",
      },
      {
        title: "Waxed canvas tool roll",
        description:
          "British waxed cotton canvas with Mil-Spec webbing and a brass press-stud closure. Pockets are sized to specific tool sizes, not generic.",
      },
      {
        title: "Modular strapping system",
        description:
          "PALS/MOLLE-compatible external webbing lets you attach the tool roll or additional pouches externally when you need more volume.",
      },
      {
        title: "Glove-friendly operation",
        description:
          "Every closure, zipper, and buckle is operable with gloved hands. Tested with winter gauntlets at -5°C.",
      },
      {
        title: "Anti-scratch phone window",
        description:
          "Top-zip map pocket with optically clear anti-scratch window — fits phones up to 88mm wide, readable with gloves.",
      },
    ],
    specs: {
      "Volume": "8L standard / 12L expanded",
      "Outer Material": "600D polyester with PU coating",
      "Inner Lining": "PU-coated ripstop",
      "Magnets": "N52 rare-earth, foam-padded",
      "Zippers": "YKK water-resistant throughout",
      "Tool Roll Material": "Waxed cotton canvas",
      "Tool Roll Capacity": "18 tool pockets",
      "Strapping": "25mm polypropylene with aluminium buckles",
      "Weight (bag only)": "420g",
      "Weight (complete kit)": "680g",
    },
    compatibility: [
      "All steel fuel tanks (magnetic mounting)",
      "PALS/MOLLE mounting points for tool roll",
      "Phones up to 88mm wide in map pocket",
      "Most 600cc+ adventure motorcycles",
    ],
    whatsInBox: [
      "Magnetic tank bag × 1",
      "Waxed canvas tool roll × 1",
      "25mm strapping kit (2× 1.5m straps, 4× buckles)",
      "Shoulder strap for off-bike carry",
      "Microfibre tank protector pad",
      "Care instructions for waxed canvas",
    ],
    installTime: "5 minutes (magnetic mount)",
    materials: "600D polyester, PU-coated ripstop, waxed cotton canvas, N52 rare-earth magnets, YKK zippers, aluminium hardware",
    ecosystemNote:
      "Designed to carry the Trail Beam harness cleanly and route cables through the base grommet. The map pocket aligns with Navi's mount position on most handlebars.",
  },
  {
    id: "p3",
    slug: "navi",
    name: "Navi",
    tagline: "Navigate. Nothing else.",
    description:
      "A dedicated motorcycle navigation unit that does one thing right: turn-by-turn navigation with a sunlight-readable 3.5\" display, 12-hour battery, and vibration-isolated mount. No social features. No distractions.",
    longDescription:
      "Phones fail as navigation devices on motorcycles for specific, solvable reasons: heat management failures, display glare, vibration damage to OIS cameras, and notification interruptions. The Navi was designed to solve each problem without compromise. The 3.5\" IPS display runs at 800 nits — readable in direct Rajasthani sunlight. The vibration-isolated mount uses dual-axis dampening so the unit absorbs handlebar input rather than transmitting it to the screen. Offline maps mean you navigate in areas with no signal as naturally as in cities.",
    price: 11000,
    category: "Navigation",
    features: [
      {
        title: "Sunlight-readable display",
        description:
          "3.5\" IPS panel at 800 nits brightness with anti-reflective coating. Readable in direct sun without shade or squinting.",
      },
      {
        title: "Offline maps",
        description:
          "Full India map pre-loaded with OpenStreetMap data. Download additional regions before travel. No data required in the field.",
      },
      {
        title: "12-hour battery",
        description:
          "4,400mAh internal battery provides 12 hours of active navigation. Charges via USB-C while riding. No power anxiety on long days.",
      },
      {
        title: "Vibration-isolated mount",
        description:
          "Dual-axis silicone damper mount absorbs handlebar vibration before it reaches the unit. Protects internals and keeps the display steady.",
      },
      {
        title: "Turn-by-turn only",
        description:
          "No apps, no notifications, no social integration. The interface shows your route, your next turn, and your ETA. That is all.",
      },
      {
        title: "Glove-operable controls",
        description:
          "Four oversized physical buttons and a capacitive touchscreen that works with standard motorcycle gloves.",
      },
    ],
    specs: {
      "Display": "3.5\" IPS, 480×320",
      "Brightness": "800 nits",
      "Battery": "4,400mAh Li-Ion",
      "Battery Life": "12 hours navigation",
      "Charging": "USB-C, 18W",
      "Maps": "Offline (India pre-loaded)",
      "Mount Type": "Vibration-isolated RAM-compatible",
      "Mount Bar Diameter": "22mm / 28.6mm",
      "GPS": "Multi-constellation (GPS + GLONASS)",
      "IP Rating": "IPX5",
      "Operating Temperature": "-10°C to +65°C",
      "Weight (unit)": "185g",
      "Weight (with mount)": "260g",
    },
    compatibility: [
      "22mm (7/8\") handlebars — universal",
      "28.6mm (1-1/8\") handlebars — universal",
      "RAM Mount B-ball compatible",
      "All motorcycles with 12V USB-C or standard socket",
    ],
    whatsInBox: [
      "Navi unit × 1",
      "Vibration-isolated handlebar mount × 1",
      "22mm + 28.6mm bar clamps × 2",
      "USB-C charging cable (1.5m) × 1",
      "Screen protector (pre-applied + 1 spare)",
      "Microfibre cleaning cloth",
      "Quick start guide",
    ],
    installTime: "20 minutes",
    materials: "Polycarbonate housing with aluminium reinforcement, IPS display, silicone vibration dampers, stainless hardware",
    ecosystemNote:
      "The Navi accessory port connects to the Trail Beam harness signal output for automatic light control. Works with Trail Kit for integrated handlebar-area organisation.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, count = 2) {
  return products.filter((p) => p.slug !== slug).slice(0, count);
}

export function getFeaturedProducts() {
  return products;
}
