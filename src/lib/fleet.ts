/**
 * Cheche Exotics — single source of truth for fleet inventory.
 *
 * Wired into:
 *   - <FleetShowroom> on the home page (bento grid)
 *   - /fleet listing page
 *   - /fleet/[slug] detail pages
 *
 * Replace these placeholder entries with the client's real fleet
 * once we have it. Keep image + video paths under /public/assets/.
 */

export type FleetCategory = "Hypercar" | "Supercar" | "GT" | "Luxury SUV" | "Saloon";

export type FleetSpan = "wide" | "tall" | "square" | "feature";

export type FleetVehicle = {
  /** URL slug — kebab-case, used in /fleet/[slug] */
  slug: string;
  brand: string;
  model: string;
  year?: number;
  category: FleetCategory;
  tagline: string;
  /** Short marketing description for the detail page */
  description: string;
  image: string;
  video?: string;
  /** Display priority on the home bento grid */
  span: FleetSpan;
  /** Headline spec values shown on the card */
  specs: { label: string; value: string }[];
  /** Daily rate floor — used for "From $X/day" pricing */
  baseDayRate?: number;
  /** HQ Rentals booking deep-link (filled in once we have it per vehicle) */
  reserveUrl?: string;
  /** Pull from "Members Privilege" hero benefits */
  memberRateNote?: string;
};

export const FLEET: FleetVehicle[] = [
  {
    slug: "aventador-svj",
    brand: "Lamborghini",
    model: "Aventador SVJ",
    year: 2024,
    category: "Hypercar",
    tagline: "The last analogue V12.",
    description:
      "A swan song to the naturally-aspirated V12 — 759 horses, active aero, and the unfiltered theatre Sant'Agata is retiring. Reserve for a weekend that will not happen again.",
    image: "/assets/fleet-aventador.png",
    video: "/assets/fleet-aventador.mp4",
    span: "feature",
    specs: [
      { label: "Power", value: "759 hp" },
      { label: "0-60", value: "2.8s" },
      { label: "Top", value: "217 mph" },
    ],
    baseDayRate: 2400,
  },
  {
    slug: "sf90-stradale",
    brand: "Ferrari",
    model: "SF90 Stradale",
    year: 2023,
    category: "Hypercar",
    tagline: "Maranello's first 1,000-horse hybrid.",
    description:
      "Three electric motors, one twin-turbo V8, all-wheel drive, and the most concentrated demonstration of Ferrari's grand prix DNA money can rent.",
    image: "/assets/fleet-sf90.png",
    video: "/assets/fleet-sf90.mp4",
    span: "tall",
    specs: [
      { label: "Power", value: "986 hp" },
      { label: "0-60", value: "2.5s" },
      { label: "Top", value: "211 mph" },
    ],
    baseDayRate: 2600,
  },
  {
    slug: "765lt",
    brand: "McLaren",
    model: "765LT",
    year: 2023,
    category: "Supercar",
    tagline: "Surgical. Weightless. Unhinged.",
    description:
      "Carbon tub, twin-turbo V8, eighty kilos lighter than the 720S it is built from. A scalpel for canyon roads, a missile on a runway.",
    image: "/assets/fleet-mclaren.png",
    video: "/assets/fleet-mclaren.mp4",
    span: "wide",
    specs: [
      { label: "Power", value: "755 hp" },
      { label: "0-60", value: "2.7s" },
      { label: "Top", value: "205 mph" },
    ],
    baseDayRate: 1900,
  },
  {
    slug: "cullinan-black-badge",
    brand: "Rolls-Royce",
    model: "Cullinan Black Badge",
    year: 2024,
    category: "Luxury SUV",
    tagline: "Magic carpet, midnight edition.",
    description:
      "The flagship Rolls SUV in its most defiant trim — twin-turbo V12, sound-deadened to a whisper, finished in obsidian on obsidian. Arrive in command.",
    image: "/assets/fleet-cullinan.png",
    video: "/assets/fleet-cullinan.mp4",
    span: "square",
    specs: [
      { label: "Power", value: "593 hp" },
      { label: "0-60", value: "4.9s" },
      { label: "Top", value: "155 mph" },
    ],
    baseDayRate: 2200,
  },
  {
    slug: "g63-brabus-800",
    brand: "Mercedes-AMG",
    model: "G 63 Brabus 800",
    year: 2024,
    category: "Luxury SUV",
    tagline: "Brutalist luxury. Tactical comfort.",
    description:
      "The Brabus-massaged G-Wagon — 789 horses, widebody carbon panels, hand-stitched cabin. Equal parts armored convoy and members' lounge.",
    image: "/assets/fleet-gwagon.png",
    video: "/assets/fleet-gwagon.mp4",
    span: "wide",
    specs: [
      { label: "Power", value: "789 hp" },
      { label: "0-60", value: "4.1s" },
      { label: "Top", value: "149 mph" },
    ],
    baseDayRate: 1700,
  },
];

export function getVehicleBySlug(slug: string): FleetVehicle | undefined {
  return FLEET.find((v) => v.slug === slug);
}

export function getFleetSlugs(): string[] {
  return FLEET.map((v) => v.slug);
}
