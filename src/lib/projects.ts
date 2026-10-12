import type { ImageKey } from "@/lib/images";

export const projectCategories = [
  "Residential",
  "Commercial",
  "Hybrid Systems",
  "Backup Power",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/**
 * Portfolio concept projects. These are fictional scenarios written to show
 * how Sunpeak would approach a brief. They are not real installations, and
 * all capacities are illustrative.
 */
export type Project = {
  slug: string;
  title: string;
  propertyType: string;
  location: string;
  categories: ProjectCategory[];
  systemType: string;
  summary: string;
  image: ImageKey;
  gallery: ImageKey[];
  overview: string;
  challenge: string;
  configuration: string;
  components: { label: string; value: string }[];
  installation: string[];
  outcome: string[];
  solutions: string[];
};

export const projects: Project[] = [
  {
    slug: "residential-hybrid-system",
    title: "Family Home, Karen",
    propertyType: "Detached family home",
    location: "Karen, Nairobi",
    categories: ["Residential", "Hybrid Systems"],
    systemType: "Hybrid solar + battery",
    summary:
      "A hybrid system design for a family home with a home office, designed to use daytime solar and keep essential circuits running through short outages.",
    image: "residentialRoof",
    gallery: ["residentialRoof", "heroRooftopInstall", "panelTexture", "electricianPanel"],
    overview:
      "This project explores a hybrid solar system for a four-bedroom family home where two adults work from home. The design brief focuses on using solar power during the day, carrying some of it into the evening, and keeping a defined set of essential circuits running during short grid interruptions.",
    challenge:
      "In this fictional scenario, the household experiences occasional short outages that disrupt video calls and reset the gate motor and Wi-Fi. Electricity use peaks in the evening when cooking, lighting and entertainment overlap. The family wants to reduce grid dependence without paying to back up the entire house, including the electric shower and oven.",
    configuration:
      "A rooftop array feeding a hybrid inverter, with a lithium iron phosphate battery supplying a dedicated essential-loads board. High-draw appliances remain on the grid-supplied board. The inverter is configured to prioritise solar, then battery, then grid.",
    components: [
      { label: "Solar array", value: "≈ 8 kWp rooftop array (illustrative)" },
      { label: "Inverter", value: "Hybrid inverter, ≈ 8 kW rating (illustrative)" },
      { label: "Battery", value: "≈ 10 kWh LiFePO₄ (illustrative)" },
      { label: "Backed-up loads", value: "Lighting, Wi-Fi, home office, fridge, TV, gate motor" },
      { label: "Not backed up", value: "Electric shower, oven, kettle" },
      { label: "Monitoring", value: "App-based generation and battery monitoring" },
    ],
    installation: [
      "Roof survey to confirm structural condition, orientation and shading from mature trees on the plot.",
      "Separation of essential circuits onto a new sub-board, so backed-up loads are clearly defined.",
      "Battery located in a ventilated, shaded utility area with clearance for maintenance.",
      "Commissioning includes setting battery reserve levels so some capacity is kept for outages.",
    ],
    outcome: [
      "Daytime household and home-office loads are designed to run primarily on solar when sunlight is available.",
      "Essential circuits are intended to stay powered through typical short outages, within the limits of the battery's usable capacity.",
      "The family has a clear view of which appliances are and are not covered during an outage.",
    ],
    solutions: ["hybrid-solar-systems", "residential-solar", "battery-storage"],
  },
  {
    slug: "retail-rooftop-solar",
    title: "Retail Business, Nairobi",
    propertyType: "Single-storey retail premises",
    location: "Nairobi",
    categories: ["Commercial"],
    systemType: "Grid-tied rooftop solar",
    summary:
      "A rooftop solar design for a retail business with refrigeration and lighting loads that closely follow daylight trading hours.",
    image: "commercialRooftop",
    gallery: ["commercialRooftop", "rooftopSurveyTeam", "wiringHands", "arrayClouds"],
    overview:
      "This project looks at a grid-tied rooftop system for a retail business open six days a week. Most of the electricity is used during trading hours for refrigeration, lighting and air conditioning, which aligns well with when solar generates.",
    challenge:
      "In this fictional scenario, the business's electricity costs have become a significant overhead. The owner wants to understand whether solar can reduce daytime grid consumption, without the added cost of batteries, and how a system would work around Sunday closures.",
    configuration:
      "A flat-roof array sized to the shop's daytime baseload so that most solar output is used on site. The inverter is configured not to export to the grid. A monitoring platform tracks generation against consumption.",
    components: [
      { label: "Solar array", value: "≈ 30 kWp flat-roof array (illustrative)" },
      { label: "Inverter", value: "Three-phase grid-tied inverter(s) (illustrative)" },
      { label: "Battery", value: "None in initial phase" },
      { label: "Export", value: "Zero-export configuration" },
      { label: "Mounting", value: "Ballasted or fixed tilt, subject to roof assessment" },
      { label: "Monitoring", value: "Generation and site consumption metering" },
    ],
    installation: [
      "Structural and waterproofing assessment of the flat roof before finalising the mounting method.",
      "Review of metering data to size the array to weekday baseload rather than peak demand.",
      "Installation scheduled around trading hours, with a short planned shutdown for final connection.",
      "Inverter sized and configured with the Sunday closure in mind to limit unused generation.",
    ],
    outcome: [
      "A share of weekday daytime consumption is intended to be met by solar, with the exact figure depending on actual load and weather.",
      "The owner can track generation and consumption to judge performance against the proposal's assumptions.",
      "The design leaves room to add battery storage later if outage support becomes a priority.",
    ],
    solutions: ["commercial-solar", "battery-storage"],
  },
  {
    slug: "rural-home-solar-backup",
    title: "Rural Home, Rift Valley",
    propertyType: "Rural farmhouse",
    location: "Rift Valley region",
    categories: ["Residential", "Backup Power"],
    systemType: "Solar backup with battery",
    summary:
      "A solar and battery design for a rural farmhouse with an intermittent grid connection, focused on lighting, refrigeration and water pumping.",
    image: "ruralHillsideArray",
    gallery: ["ruralHillsideArray", "groundArrayGrass", "groundArraySky", "arrayTrees"],
    overview:
      "This project considers a rural farmhouse where grid supply is available but unreliable. The priority is keeping lighting, refrigeration, phone charging and a small water pump running, rather than powering every appliance in the house.",
    challenge:
      "In this fictional scenario, outages can last several hours and sometimes repeat over consecutive days. The household relies on a small petrol generator, which is costly to run and needs regular fuel trips. They want a quieter, lower-running-cost option for essential needs.",
    configuration:
      "A ground-mounted array on open land near the house feeds an inverter/charger and battery bank supplying an essential-loads board. The pump runs on a timer during peak sun hours to make the most of solar output. The generator is retained as a last resort for extended cloudy periods.",
    components: [
      { label: "Solar array", value: "≈ 5 kWp ground-mounted (illustrative)" },
      { label: "Inverter", value: "Off-grid capable inverter/charger (illustrative)" },
      { label: "Battery", value: "≈ 10 kWh LiFePO₄ (illustrative)" },
      { label: "Backed-up loads", value: "Lighting, fridge, phone charging, TV, small pump" },
      { label: "Generator", value: "Existing unit retained as a last-resort input" },
      { label: "Mounting", value: "Fixed-tilt ground frame, fenced" },
    ],
    installation: [
      "Ground-mount location chosen to avoid shading and allow cleaning access, with fencing to protect from livestock.",
      "Cable runs between the array and the house sized to limit voltage drop over the distance.",
      "Earthing and surge protection reviewed given the exposed rural location.",
      "Pump scheduled to run during the middle of the day to reduce battery use.",
    ],
    outcome: [
      "Essential loads are designed to remain available during typical outages, within the limits of battery capacity and solar recharge.",
      "Generator use is intended to be reserved for extended low-sun periods rather than every outage.",
      "The household has simple guidance on which appliances to avoid running during long outages.",
    ],
    solutions: ["solar-backup-systems", "battery-storage", "residential-solar"],
  },
  {
    slug: "office-essential-backup",
    title: "Small Office, Nakuru",
    propertyType: "Professional services office",
    location: "Nakuru",
    categories: ["Commercial", "Backup Power", "Hybrid Systems"],
    systemType: "Hybrid essential-load backup",
    summary:
      "A hybrid backup design for a small office that needs computers, connectivity and lighting to stay available during outages.",
    image: "hybridDusk",
    gallery: ["hybridDusk", "electricianPanel", "rooftopSurveyTeam", "wiringHands"],
    overview:
      "This project addresses a twelve-person office where interruptions stop work entirely. The aim is continuity for IT equipment and lighting, with solar reducing daytime grid use as a secondary benefit.",
    challenge:
      "In this fictional scenario, the office's existing small UPS units only cover a few minutes, so staff lose work when outages run longer. The office does not want to support air conditioning or the kitchen on backup, but needs computers, the network and lighting to keep running.",
    configuration:
      "A hybrid inverter supplies a dedicated IT and lighting board from a battery bank, with rooftop solar charging the battery and offsetting daytime use. Air conditioning and kitchen circuits remain grid-only.",
    components: [
      { label: "Solar array", value: "≈ 6 kWp rooftop array (illustrative)" },
      { label: "Inverter", value: "Hybrid inverter with fast transfer (illustrative)" },
      { label: "Battery", value: "≈ 10 kWh LiFePO₄ (illustrative)" },
      { label: "Backed-up loads", value: "Workstations, network, lighting, security" },
      { label: "Not backed up", value: "Air conditioning, kitchen appliances" },
      { label: "Monitoring", value: "Remote alerts for battery state and faults" },
    ],
    installation: [
      "Load audit of workstations, network equipment and lighting to size the inverter and battery.",
      "IT and lighting circuits moved to a dedicated essential board.",
      "Inverter transfer time checked against IT equipment requirements.",
      "Installation planned for a weekend to avoid disrupting the working week.",
    ],
    outcome: [
      "IT, network and lighting circuits are designed to remain powered during typical outages, within the battery's usable capacity.",
      "Daytime solar generation is intended to offset part of the office's grid consumption.",
      "Staff have a clear understanding of which equipment is supported during an outage.",
    ],
    solutions: ["solar-backup-systems", "hybrid-solar-systems", "commercial-solar"],
  },
  {
    slug: "guest-house-solar-water-heating",
    title: "Guest House, Naivasha",
    propertyType: "Eight-room guest house",
    location: "Naivasha",
    categories: ["Commercial"],
    systemType: "Solar water heating",
    summary:
      "A solar water heating design for a guest house where electric geysers make up a large share of the monthly electricity bill.",
    image: "waterHeaterRoof",
    gallery: ["waterHeaterRoof", "arrayTrees", "panelTexture"],
    overview:
      "This project looks at replacing most of the electric water heating in an eight-room guest house with roof-mounted solar water heaters. Hot water demand is high and predictable, peaking in the early morning and evening when guests shower.",
    challenge:
      "In this fictional scenario, each room has its own electric geyser, and water heating is the single largest item on the electricity bill. The owner wants to cut that cost without guests noticing any change in hot water availability, including after cloudy days.",
    configuration:
      "Evacuated-tube solar water heaters on the roof feed insulated storage tanks serving groups of rooms. The existing geyser elements are retained as backup on timers, so they only top up the water when solar input has not been enough.",
    components: [
      { label: "Collectors", value: "Evacuated-tube solar water heaters (illustrative)" },
      { label: "Storage", value: "≈ 4 × 300 litre insulated tanks (illustrative)" },
      { label: "Backup heating", value: "Existing electric elements on timers" },
      { label: "Pressure", value: "Low-pressure system, subject to plumbing survey" },
      { label: "Rooms served", value: "Eight en-suite guest rooms" },
      { label: "Not included", value: "Kitchen hot water (separate phase)" },
    ],
    installation: [
      "Roof structure checked for the weight of full tanks before positions are finalised.",
      "Collectors oriented for the best sun exposure, clear of shading from the mature trees on the plot.",
      "Water quality tested, as hard water around the lake affects scaling and maintenance intervals.",
      "Work phased room by room so the guest house stays open during installation.",
    ],
    outcome: [
      "Most daily hot water demand is designed to be met by solar, with electric elements topping up only when needed.",
      "Timers prevent backup elements from heating water that the sun would have heated later in the day.",
      "Staff have a simple maintenance routine covering valves, anodes and collector cleaning.",
    ],
    solutions: ["solar-water-heating", "commercial-solar"],
  },
  {
    slug: "townhouse-essential-backup",
    title: "Townhouse, Kiambu",
    propertyType: "Three-bedroom townhouse",
    location: "Kiambu",
    categories: ["Residential", "Backup Power"],
    systemType: "Essential-load solar backup",
    summary:
      "A compact backup design for a townhouse with limited roof space, keeping lighting, Wi-Fi, the fridge and the gate running during outages.",
    image: "modernHome",
    gallery: ["modernHome", "heroRooftopInstall", "electricianPanel"],
    overview:
      "This project addresses a townhouse in a gated development where roof space is shared and limited. Rather than trying to power the whole home, the design focuses on a small set of essential loads that matter most during outages.",
    challenge:
      "In this fictional scenario, outages often happen in the evening and leave the family without lighting, internet or the electric gate. Only part of the roof can be used, and the residents' association requires panels to sit flush and out of view from the street.",
    configuration:
      "A small flush-mounted array on the rear roof slope feeds an inverter/charger and a compact battery supplying an essential-loads board. The battery also charges from the grid when solar output is low, so it is ready for evening outages.",
    components: [
      { label: "Solar array", value: "≈ 3 kWp flush-mounted, rear slope (illustrative)" },
      { label: "Inverter", value: "Inverter/charger, ≈ 3 kW rating (illustrative)" },
      { label: "Battery", value: "≈ 5 kWh LiFePO₄ (illustrative)" },
      { label: "Backed-up loads", value: "Lighting, Wi-Fi, fridge, TV, gate motor, CCTV" },
      { label: "Not backed up", value: "Electric shower, oven, iron, kettle" },
      { label: "Approval", value: "Residents' association guidelines followed" },
    ],
    installation: [
      "Panel layout agreed in advance to meet the development's guidelines on visibility.",
      "Essential circuits moved to a new sub-board next to the main distribution board.",
      "Battery and inverter wall-mounted in the garage, with ventilation and clearance.",
      "Grid charging scheduled so the battery is full before typical evening outages.",
    ],
    outcome: [
      "Essential circuits are designed to stay powered through typical evening outages, within the battery's usable capacity.",
      "The array is intended to offset part of daytime household consumption.",
      "The family knows exactly which appliances are covered and which are not.",
    ],
    solutions: ["solar-backup-systems", "battery-storage", "residential-solar"],
  },
  {
    slug: "school-hybrid-system",
    title: "Day School, Machakos",
    propertyType: "Primary day school",
    location: "Machakos",
    categories: ["Commercial", "Hybrid Systems"],
    systemType: "Hybrid solar + battery",
    summary:
      "A hybrid design for a day school whose energy use falls almost entirely within daylight hours, with backup for the computer lab and office.",
    image: "groundArraySky",
    gallery: ["groundArraySky", "rooftopSurveyTeam", "wiringHands"],
    overview:
      "This project looks at a day school where lighting, the computer lab, the staff room and the office all operate during the school day. That pattern lines up closely with solar generation, making most of the output directly usable.",
    challenge:
      "In this fictional scenario, outages interrupt computer lessons and office work, and the school's electricity budget is under pressure. Usage drops sharply in the evenings, at weekends and during holidays, so the design needs to avoid paying for capacity that would sit idle.",
    configuration:
      "Rooftop arrays across two classroom blocks feed a hybrid inverter. A modest battery supports the computer lab, office and security lighting during outages, while the rest of the school runs on solar and grid power. The system is set not to export to the grid.",
    components: [
      { label: "Solar array", value: "≈ 15 kWp across two roofs (illustrative)" },
      { label: "Inverter", value: "Three-phase hybrid inverter (illustrative)" },
      { label: "Battery", value: "≈ 15 kWh LiFePO₄ (illustrative)" },
      { label: "Backed-up loads", value: "Computer lab, office, security lighting" },
      { label: "Export", value: "Zero-export configuration" },
      { label: "Monitoring", value: "Generation dashboard for the bursar's office" },
    ],
    installation: [
      "Roof survey of both classroom blocks, including the condition of older iron-sheet roofing.",
      "Installation scheduled during the school holidays to avoid disrupting lessons.",
      "Cable routes and equipment kept out of reach of pupils, with lockable enclosures.",
      "Holiday settings agreed so the battery stays healthy when the school is closed.",
    ],
    outcome: [
      "Most daytime school loads are designed to run on solar when sunlight is available.",
      "The computer lab and office are intended to stay available during typical outages.",
      "The bursar can track generation against the school's electricity bills.",
    ],
    solutions: ["hybrid-solar-systems", "commercial-solar", "battery-storage"],
  },
  {
    slug: "dairy-farm-solar-backup",
    title: "Dairy Farm, Nyandarua",
    propertyType: "Small dairy farm",
    location: "Nyandarua",
    categories: ["Commercial", "Backup Power"],
    systemType: "Solar backup for cooling and pumping",
    summary:
      "A solar and battery design to keep milk cooling and water pumping running on a dairy farm where outages put the morning's milk at risk.",
    image: "arrayClouds",
    gallery: ["arrayClouds", "groundArrayGrass", "electricianPanel"],
    overview:
      "This project considers a small dairy farm where milk must be cooled quickly after milking and water must be pumped daily for the herd. Both loads are critical, and both are affected when grid supply is interrupted.",
    challenge:
      "In this fictional scenario, outages during or after milking mean the cooling tank stops, and milk can be rejected at the collection centre. The farm runs a diesel generator as a fallback, but fuel costs are rising and the generator is not always started in time.",
    configuration:
      "A ground-mounted array near the milking shed feeds an inverter/charger and battery bank supplying the cooling tank and water pump. The pump runs during peak sun hours to fill a storage tank, so it rarely draws on the battery. The diesel generator is kept as a last resort.",
    components: [
      { label: "Solar array", value: "≈ 10 kWp ground-mounted (illustrative)" },
      { label: "Inverter", value: "Off-grid capable inverter/charger (illustrative)" },
      { label: "Battery", value: "≈ 15 kWh LiFePO₄ (illustrative)" },
      { label: "Backed-up loads", value: "Milk cooling tank, water pump, shed lighting" },
      { label: "Generator", value: "Existing diesel unit retained as a last resort" },
      { label: "Mounting", value: "Fixed-tilt ground frame, fenced from livestock" },
    ],
    installation: [
      "Load review of the cooling tank's start-up current, which affects inverter sizing.",
      "Array sited close to the milking shed to keep cable runs short, with fencing from livestock.",
      "Pump timer and storage tank set up so pumping happens while the sun is highest.",
      "Changeover arranged so the generator only starts if the battery runs low.",
    ],
    outcome: [
      "Milk cooling is designed to continue through typical outages, within the battery's usable capacity.",
      "Daily water pumping is intended to run mainly on direct solar power.",
      "Generator use is expected to fall to extended low-sun periods rather than every outage.",
    ],
    solutions: ["solar-backup-systems", "battery-storage", "commercial-solar"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3) {
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      project: p,
      score: p.categories.filter((c) => project.categories.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.project);
}
