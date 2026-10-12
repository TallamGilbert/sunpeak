import type { ImageKey } from "@/lib/images";

export type IconName =
  | "home"
  | "building"
  | "hybrid"
  | "battery"
  | "water"
  | "backup";

export type Faq = { question: string; answer: string };

export type Solution = {
  slug: string;
  name: string;
  icon: IconName;
  image: ImageKey;
  summary: string;
  heroTitle: string;
  heroIntro: string;
  atAGlance: { label: string; value: string }[];
  overview: string[];
  howItWorks: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  considerations: { title: string; body: string }[];
  faqs: Faq[];
  related: string[];
};

export const solutions: Solution[] = [
  {
    slug: "residential-solar",
    name: "Residential Solar",
    icon: "home",
    image: "residentialRoof",
    summary:
      "Rooftop solar for households, sized around how your family actually uses power, with battery storage as an option.",
    heroTitle: "Solar power planned around your household.",
    heroIntro:
      "A residential system combines solar panels, an inverter and, where it makes sense, battery storage. The aim is to cover a meaningful share of your daytime energy use and give you more control over what you draw from the grid.",
    atAGlance: [
      { label: "Core components", value: "Panels, inverter, mounting, protection" },
      { label: "Optional", value: "Battery storage, monitoring" },
      { label: "Best suited to", value: "Homes with daytime loads and usable roof space" },
      { label: "Sizing based on", value: "Consumption, roof area, budget, backup needs" },
    ],
    overview: [
      "Solar panels on your roof convert sunlight into direct current (DC) electricity. An inverter converts that into alternating current (AC), the type your sockets and appliances use. During the day, your home uses solar power first and draws from the grid only for the shortfall.",
      "Whether you add batteries depends on what you want the system to do. If your goal is to reduce daytime grid use, a grid-tied system without batteries may be enough. If you want power during outages or into the evening, battery storage becomes part of the design.",
    ],
    howItWorks: [
      { title: "Panels generate DC power", body: "Photovoltaic panels produce electricity whenever there is daylight. Output rises and falls with sunlight intensity through the day." },
      { title: "The inverter converts it", body: "The inverter turns DC from the panels into AC for your home and manages how solar, grid and battery (if fitted) work together." },
      { title: "Your home uses solar first", body: "Appliances running during the day draw on solar power. Any shortfall is supplied by the grid or a battery." },
      { title: "Surplus is stored or limited", body: "With a battery, excess daytime energy can be stored for later. Without one, the inverter limits output to what the home can use, depending on your connection arrangements." },
    ],
    useCases: [
      { title: "Reducing daytime grid use", body: "Households with people at home during the day, home offices, or appliances such as pumps and washing machines that can run while the sun is up." },
      { title: "Keeping essentials on in outages", body: "Paired with a battery, a system can keep selected circuits such as lighting, Wi-Fi and the fridge running when grid supply drops." },
      { title: "Planning for future loads", body: "Homes expecting to add appliances, an extension or electric cooking can plan inverter and roof capacity with expansion in mind." },
    ],
    considerations: [
      { title: "Your actual consumption", body: "Recent electricity bills or token purchase history give the most reliable starting point for sizing." },
      { title: "Roof space and orientation", body: "Available area, pitch, shading from trees or neighbouring buildings, and roof condition all affect how many panels can be installed and how well they perform." },
      { title: "Which loads matter most", body: "Knowing which appliances you would want running during an outage determines whether you need a battery and how large it should be." },
      { title: "Budget and phasing", body: "Some households start with panels and an inverter that can accept a battery later, spreading the investment over time." },
    ],
    faqs: [
      { question: "How many panels does a typical home need?", answer: "There is no single typical number. The panel count depends on your daily energy use, the share of it you want solar to cover, panel wattage and the roof space available. A site assessment and a review of your bills are needed to recommend a size." },
      { question: "Will solar panels work with my existing wiring?", answer: "In most homes, yes, but the existing distribution board, earthing and protection devices need to be checked. Some upgrades may be needed for a safe installation." },
      { question: "Can I add a battery later?", answer: "Often, yes, if the inverter you choose supports battery storage. If adding a battery later is likely, it is worth planning for it at the design stage." },
    ],
    related: ["battery-storage", "hybrid-solar-systems", "solar-backup-systems"],
  },
  {
    slug: "commercial-solar",
    name: "Commercial Solar",
    icon: "building",
    image: "commercialRooftop",
    summary:
      "Solar for shops, offices, workshops and other businesses, matched to your operating hours and load profile.",
    heroTitle: "Commercial solar matched to how your business runs.",
    heroIntro:
      "Many businesses use most of their electricity during daylight hours, which is when solar generates. A well-designed commercial system is based on your actual load profile, roof and site conditions, and financial priorities.",
    atAGlance: [
      { label: "Core components", value: "Panel array, commercial inverter(s), protection, monitoring" },
      { label: "Optional", value: "Battery storage, load management" },
      { label: "Best suited to", value: "Sites with significant daytime consumption" },
      { label: "Sizing based on", value: "Load profile, demand peaks, roof area, budget" },
    ],
    overview: [
      "Commercial premises often have a closer match between energy use and solar generation than homes do, because operating hours tend to fall during the day. That alignment is a key factor in how much of the solar output a business can use directly.",
      "The right configuration depends on your load profile: how much power you use, when you use it and how high your demand peaks are. We look at metering data or bills, equipment schedules and the condition and structure of your roof before recommending a system.",
    ],
    howItWorks: [
      { title: "Understand the load profile", body: "We review consumption data and operating patterns to see how energy use is spread across the day and the week." },
      { title: "Size the array to daytime use", body: "The system is typically sized so that most solar output is used on site rather than wasted, based on your daytime baseload." },
      { title: "Integrate with your supply", body: "Commercial inverters work alongside your grid connection and existing distribution, with protection and isolation designed for the site." },
      { title: "Monitor performance", body: "Monitoring helps you see generation and consumption over time and spot issues early." },
    ],
    useCases: [
      { title: "Retail and hospitality", body: "Shops, restaurants and guest houses with refrigeration, lighting and cooling running through the day." },
      { title: "Offices and clinics", body: "Premises with computers, air conditioning and equipment that operate during business hours." },
      { title: "Workshops and light industry", body: "Sites with machinery and pumps, where daytime production loads can be partly met by solar." },
    ],
    considerations: [
      { title: "Roof structure and condition", body: "Flat and pitched roofs both work, but structural capacity, waterproofing and access need to be assessed before installation." },
      { title: "Demand patterns", body: "Short spikes from motors or compressors affect inverter sizing and may influence whether battery support or load management is useful." },
      { title: "Weekend and holiday use", body: "If a site closes at weekends, generation on those days may not be used unless the design accounts for it." },
      { title: "Financial considerations", body: "Capital cost, expected bill reduction, maintenance and the business's planning horizon all affect whether a project makes financial sense. These are reviewed against your own figures." },
    ],
    faqs: [
      { question: "Will solar power my whole business?", answer: "It depends on your consumption, your available roof or ground area and when you use power. Many commercial systems are designed to cover part of daytime demand rather than all of it. Your load profile determines what is realistic." },
      { question: "Do we need to close during installation?", answer: "Most installation work happens on the roof and can be scheduled to limit disruption. Some short planned shutdowns are usually needed when the system is connected to your distribution board." },
      { question: "How do we judge whether it is worth it?", answer: "Compare the installed cost with a realistic estimate of bill reduction based on your tariff and consumption, net of maintenance. A proposal should show its assumptions so you can check them." },
    ],
    related: ["hybrid-solar-systems", "battery-storage", "solar-backup-systems"],
  },
  {
    slug: "hybrid-solar-systems",
    name: "Hybrid Solar Systems",
    icon: "hybrid",
    image: "hybridDusk",
    summary:
      "Solar, batteries and grid power working together, so you can use solar first and keep chosen loads running in outages.",
    heroTitle: "Solar, storage and grid, working as one system.",
    heroIntro:
      "A hybrid system uses an inverter that manages solar panels, a battery bank and the grid together. Depending on the design, it can prioritise solar, store surplus energy and switch to battery power when the grid goes down.",
    atAGlance: [
      { label: "Core components", value: "Panels, hybrid inverter, battery, protection" },
      { label: "Energy sources", value: "Solar, battery, grid (and optionally a generator)" },
      { label: "Best suited to", value: "Properties wanting solar use plus outage support" },
      { label: "Backup coverage", value: "Depends on battery capacity, inverter rating and connected loads" },
    ],
    overview: [
      "A hybrid inverter decides moment by moment where power comes from. In a typical setup, solar supplies the property first, surplus solar charges the battery, and the grid fills any remaining gap.",
      "When grid supply is interrupted, the inverter can switch to supplying the backed-up circuits from the battery and solar. How long and how much it can supply depends on the battery's usable capacity, the inverter's power rating and what is connected. These are design decisions, not fixed features.",
    ],
    howItWorks: [
      { title: "Solar supplies the property", body: "During daylight, solar output goes to the loads that are running." },
      { title: "Surplus charges the battery", body: "Energy not used immediately is stored in the battery, up to its capacity." },
      { title: "Battery and grid fill the gaps", body: "In the evening or on overcast days, the battery and grid supply the shortfall according to the settings you choose." },
      { title: "Outage mode", body: "If the grid fails, the inverter supplies the backed-up circuits. Switchover behaviour varies by inverter and configuration." },
    ],
    useCases: [
      { title: "Areas with frequent interruptions", body: "Homes and businesses that experience regular outages and want selected loads to keep running." },
      { title: "Evening energy use", body: "Properties that use much of their energy after sunset and want to shift solar output into the evening." },
      { title: "Reducing generator reliance", body: "Sites that currently run a generator during outages and want to reduce how often it is needed." },
    ],
    considerations: [
      { title: "Which circuits to back up", body: "Most hybrid systems back up a dedicated set of essential circuits. Backing up everything requires much larger battery and inverter capacity." },
      { title: "Battery capacity vs. power", body: "Capacity (kWh) determines how long the battery can supply loads. Inverter and battery power ratings (kW) determine how much can run at the same time." },
      { title: "High-draw appliances", body: "Electric showers, cookers, kettles and some pumps draw a lot of power. They are often kept off the backed-up circuit unless the system is sized for them." },
      { title: "Grid connection arrangements", body: "Exporting power to the grid involves utility requirements. Many hybrid systems are configured not to export." },
    ],
    faqs: [
      { question: "How long will a hybrid system keep my power on?", answer: "That depends on the battery's usable capacity, how much power the connected loads draw and how much sunlight is available. A load calculation is needed to estimate backup time for your situation." },
      { question: "Is there a delay when the grid goes off?", answer: "Some inverters switch over within milliseconds, others take slightly longer. Sensitive equipment may need an inverter with fast transfer or an online UPS. This is checked during design." },
      { question: "Can a hybrid system work without the grid?", answer: "Many hybrid inverters can run off-grid, but a system designed mainly for off-grid use needs larger solar and battery capacity to cover days with less sun." },
    ],
    related: ["battery-storage", "solar-backup-systems", "residential-solar"],
  },
  {
    slug: "battery-storage",
    name: "Battery Storage",
    icon: "battery",
    image: "electricianPanel",
    summary:
      "Store solar energy for evenings and outages, sized from a clear calculation of the loads you want to support.",
    heroTitle: "Battery storage sized from real load calculations.",
    heroIntro:
      "A battery lets you use solar energy after the sun goes down and keep chosen loads running during outages. The right battery depends on how much energy you need, how fast you need it and how long you want it to last.",
    atAGlance: [
      { label: "Capacity", value: "Total energy stored, measured in kWh" },
      { label: "Usable energy", value: "The share of capacity that can be used day to day" },
      { label: "Power output", value: "How much can run at once, measured in kW" },
      { label: "Backup duration", value: "Usable energy ÷ connected load (approximate)" },
    ],
    overview: [
      "Batteries are described by a few key figures. Capacity is how much energy the battery holds. Usable energy is how much of that you can draw on in normal operation, since most batteries are not run to completely empty. Power output is the rate at which the battery can supply energy, which limits how many appliances can run at the same time.",
      "Backup duration is roughly the usable energy divided by the power your connected loads draw. In practice it varies with appliance cycling, inverter efficiency and battery condition. No battery should be described as able to run every appliance or last a set number of hours without a proper load calculation.",
    ],
    howItWorks: [
      { title: "Charging", body: "Surplus solar energy, and grid power if configured, charges the battery through the inverter or a dedicated charger." },
      { title: "Storing", body: "A battery management system monitors cell voltages, temperature and state of charge to keep the battery within safe limits." },
      { title: "Discharging", body: "When solar output is low or the grid is down, the battery supplies the connected loads through the inverter." },
      { title: "Protecting the battery", body: "Discharge limits and charge settings help the battery last longer. These are set during commissioning." },
    ],
    useCases: [
      { title: "Evening solar use", body: "Storing daytime solar energy for lighting, cooking appliances and entertainment in the evening." },
      { title: "Outage support", body: "Keeping essentials such as lighting, refrigeration, routers and security systems running during interruptions." },
      { title: "Adding to an existing system", body: "Retrofitting storage to a compatible solar system that currently has no battery." },
    ],
    considerations: [
      { title: "Load calculation first", body: "List the appliances you want supported, their power draw and how long they run. This is the basis for sizing." },
      { title: "Battery chemistry", body: "Lithium iron phosphate (LiFePO₄) and lead-acid batteries differ in usable depth of discharge, lifespan, weight and cost." },
      { title: "Installation location", body: "Batteries need a well-ventilated, dry, shaded location with safe access and appropriate protection." },
      { title: "Inverter compatibility", body: "The battery must be compatible with the inverter's voltage and communication requirements." },
    ],
    faqs: [
      { question: "Will a battery power my whole home?", answer: "Only if it is sized for that, which usually means a large battery and inverter. Most residential batteries are sized to support selected essential loads. A load calculation shows what is practical." },
      { question: "How long do batteries last?", answer: "Lifespan depends on chemistry, how deeply and how often the battery is cycled, temperature and maintenance. Manufacturer warranties usually specify a number of cycles or years and a minimum retained capacity." },
      { question: "What is the difference between kW and kWh?", answer: "kW measures power, the rate at which energy is used at a given moment. kWh measures energy, the amount used over time. A battery needs enough kWh to last and enough kW to run your loads at once." },
    ],
    related: ["hybrid-solar-systems", "solar-backup-systems", "residential-solar"],
  },
  {
    slug: "solar-water-heating",
    name: "Solar Water Heating",
    icon: "water",
    image: "waterHeaterRoof",
    summary:
      "Use the sun to heat water directly and reduce the electricity used by electric geysers and showers.",
    heroTitle: "Hot water heated by the sun.",
    heroIntro:
      "A solar water heater uses collectors on the roof to heat water directly, storing it in an insulated tank. It is a separate technology from solar panels and can reduce the electricity used for water heating.",
    atAGlance: [
      { label: "Main types", value: "Evacuated tube and flat plate collectors" },
      { label: "Storage", value: "Insulated tank, roof-mounted or separate" },
      { label: "Backup", value: "Electric element for cloudy periods (optional)" },
      { label: "Sizing based on", value: "Household size, hot water use, water quality" },
    ],
    overview: [
      "Water heating is often one of the larger electricity uses in a home, especially where electric geysers or instant showers are used. A solar water heater captures heat from sunlight and transfers it to water stored in an insulated tank, ready for use.",
      "Most systems include a backup heating element for extended cloudy periods. Performance depends on the collector type, orientation, how much hot water is used and when.",
    ],
    howItWorks: [
      { title: "Collectors absorb heat", body: "Evacuated tubes or flat plate collectors absorb heat from sunlight." },
      { title: "Heat moves to the tank", body: "In thermosiphon systems, heated water rises naturally into the tank. Pumped systems use a small circulation pump." },
      { title: "Water is stored hot", body: "An insulated tank keeps water hot for use later in the day and overnight." },
      { title: "Backup tops up", body: "An optional electric element can heat water when solar input is not enough." },
    ],
    useCases: [
      { title: "Family homes", body: "Households with regular morning and evening showers and an electric geyser." },
      { title: "Guest houses and hostels", body: "Premises with high, predictable hot water demand." },
      { title: "Institutions", body: "Schools, clinics and staff quarters with shared bathing facilities." },
    ],
    considerations: [
      { title: "Roof load and position", body: "A full tank is heavy. The roof structure must be able to support it, and collectors should face the sun with minimal shading." },
      { title: "Water quality", body: "Hard water can cause scale build-up. System type and maintenance should reflect local water quality." },
      { title: "Water pressure", body: "Low-pressure and high-pressure systems suit different plumbing setups. Your existing pressure determines the right choice." },
      { title: "Maintenance", body: "Periodic checks of valves, the anode (where fitted) and collectors help maintain performance." },
    ],
    faqs: [
      { question: "Is a solar water heater the same as solar panels?", answer: "No. Solar water heaters heat water directly using thermal collectors. Solar panels generate electricity. They can be installed together but are separate systems." },
      { question: "Will I still have hot water on cloudy days?", answer: "Collectors still gather some heat on overcast days, but less. A backup element can make up the difference, using electricity when needed." },
      { question: "What maintenance is needed?", answer: "Typically a periodic inspection of valves and fittings, checking for leaks, cleaning collectors if dusty and, depending on water quality, descaling or replacing the anode." },
    ],
    related: ["residential-solar", "commercial-solar", "hybrid-solar-systems"],
  },
  {
    slug: "solar-backup-systems",
    name: "Solar Backup Systems",
    icon: "backup",
    image: "wiringHands",
    summary:
      "Keep selected appliances and essential circuits running during outages, recharged by solar.",
    heroTitle: "Backup power for the loads that matter most.",
    heroIntro:
      "A solar backup system is designed to support selected appliances or essential circuits during power interruptions. It is usually smaller and simpler than a system built to power an entire property.",
    atAGlance: [
      { label: "Core components", value: "Inverter/charger, battery, solar panels, changeover" },
      { label: "Typical loads", value: "Lighting, Wi-Fi, TV, fridge, security, laptops" },
      { label: "Scope", value: "Selected circuits, not the whole property" },
      { label: "Sizing based on", value: "Essential load list and desired backup time" },
    ],
    overview: [
      "A backup system focuses on continuity for a defined set of loads. Typical examples are lighting, a router, a television, a fridge and security equipment. Those circuits are separated onto a dedicated board that the inverter supplies when the grid fails.",
      "This differs from a system designed to power an entire property, which needs a much larger inverter, battery bank and solar array to handle high-draw appliances such as electric cookers, showers and water heaters. Being clear about the scope keeps the system appropriately sized and cost-effective.",
    ],
    howItWorks: [
      { title: "Define essential loads", body: "Agree which appliances and circuits should stay on during an outage." },
      { title: "Separate the circuits", body: "Essential circuits are wired to a dedicated board supplied by the inverter." },
      { title: "Charge from solar and grid", body: "Solar panels, and the grid when available, keep the battery charged." },
      { title: "Switch over on outage", body: "When grid supply drops, the inverter supplies the essential board from the battery and solar." },
    ],
    useCases: [
      { title: "Home offices", body: "Keeping laptops, routers and lighting available so work can continue during interruptions." },
      { title: "Small businesses", body: "Supporting point-of-sale systems, lighting, CCTV and refrigeration." },
      { title: "Security and communications", body: "Keeping alarms, gate motors, cameras and connectivity running." },
    ],
    considerations: [
      { title: "Backup vs. whole-property", body: "Decide early whether you need selected-load backup or whole-property supply. The two differ significantly in size and cost." },
      { title: "Realistic backup time", body: "Backup duration depends on battery capacity and what is switched on. Leaving high-draw appliances off the essential board extends it." },
      { title: "Solar recharge", body: "Solar panels allow the battery to recharge during the day, which matters during longer or repeated outages." },
      { title: "Room to grow", body: "Choosing an inverter that can take more panels or batteries later gives you flexibility." },
    ],
    faqs: [
      { question: "What is the difference between a backup system and full home solar?", answer: "A backup system supports a defined set of essential loads during outages. A full home system is designed to supply most or all of the property's demand, including high-draw appliances, which requires far more capacity." },
      { question: "Can I run my electric shower or cooker on backup?", answer: "Usually not on a backup-sized system. These appliances draw a lot of power. Including them would require a much larger inverter and battery." },
      { question: "Do I need solar panels for a backup system?", answer: "Not strictly, as a battery can be charged from the grid. Solar panels allow recharging during the day, which helps during long or repeated outages and reduces grid use." },
    ],
    related: ["battery-storage", "hybrid-solar-systems", "residential-solar"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
