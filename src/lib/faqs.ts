import type { Faq } from "@/lib/solutions";

/** The eight questions the brief asks for on the homepage. */
export const homeFaqs: Faq[] = [
  {
    question: "How does a solar power system work?",
    answer:
      "Solar panels convert sunlight into direct current (DC) electricity. An inverter converts this into alternating current (AC), which your appliances use. Your property uses solar power first, and the grid or a battery supplies any shortfall. With a battery, surplus daytime energy can be stored for later.",
  },
  {
    question: "Do I need batteries with my solar panels?",
    answer:
      "Not always. If your main goal is to reduce daytime grid use, a system without batteries may be enough. Batteries become important if you want power during outages or want to use solar energy in the evening. The right choice depends on your energy use and priorities.",
  },
  {
    question: "Can solar power run my entire home?",
    answer:
      "It can, but only if the system is sized for it. Powering a whole home, including high-draw appliances such as electric showers, cookers and water heaters, needs a larger solar array, inverter and battery. Many households instead choose to cover a share of their use and back up essential loads. A site assessment and load review show what is practical for your property.",
  },
  {
    question: "How do I estimate the system size I need?",
    answer:
      "Start with your electricity bills or token purchases to see how many kilowatt-hours (kWh) you use each month. Then consider which loads you want solar to cover, whether you need backup, and how much roof space is available. Our savings calculator can help you explore costs, but a proper sizing needs a site assessment.",
  },
  {
    question: "How long does installation take?",
    answer:
      "A straightforward residential installation often takes one to a few days on site. Larger or more complex systems, such as commercial projects or installations needing electrical upgrades, take longer. Survey, design and equipment availability also affect the overall timeline.",
  },
  {
    question: "Does solar still work on cloudy days?",
    answer:
      "Yes, but output is lower. Solar panels respond to daylight, not heat, so they still generate under cloud cover, just less. System designs account for variation in weather, and batteries or the grid make up the difference.",
  },
  {
    question: "What maintenance does a solar system require?",
    answer:
      "Solar systems need relatively little maintenance. Typical tasks are keeping panels reasonably clean, checking for shading from new growth, inspecting wiring and mounts periodically and keeping an eye on inverter and battery alerts. Batteries and inverters may need occasional checks according to the manufacturer's guidance.",
  },
  {
    question: "Can solar reduce my electricity bill?",
    answer:
      "It can, by replacing some of the electricity you would otherwise buy from the grid. How much depends on your consumption pattern, tariff, system size, sunlight and whether you use batteries. A well-prepared quotation should show the assumptions behind any estimated reduction.",
  },
];

export type FaqGroup = { id: string; title: string; faqs: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "basics",
    title: "Solar basics",
    faqs: [
      homeFaqs[0],
      homeFaqs[5],
      {
        question: "What is the difference between kW and kWh?",
        answer:
          "kW (kilowatts) measures power: how much electricity is being used or produced at a moment. kWh (kilowatt-hours) measures energy: the amount used or produced over time. Your bill is measured in kWh. Inverters and panels are rated in kW, and batteries are rated in kWh.",
      },
      {
        question: "What is the difference between solar panels and solar water heaters?",
        answer:
          "Solar panels (photovoltaics) generate electricity. Solar water heaters use thermal collectors to heat water directly. They are different technologies and can be installed separately or together.",
      },
    ],
  },
  {
    id: "planning",
    title: "Planning and sizing",
    faqs: [
      homeFaqs[1],
      homeFaqs[2],
      homeFaqs[3],
      {
        question: "What is a site assessment?",
        answer:
          "A site assessment is a visit, or a remote review followed by a visit, to check your roof or ground area, shading, existing electrical installation and where equipment could go. Combined with your consumption data, it is the basis for a system design and quotation.",
      },
      {
        question: "Do I need to know technical specifications before asking for a quote?",
        answer:
          "No. Tell us about your property, what you would like solar to do and, if you have it, your typical monthly bill. We will ask the technical questions and explain the options.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation and maintenance",
    faqs: [
      homeFaqs[4],
      homeFaqs[6],
      {
        question: "Will installation damage my roof?",
        answer:
          "A proper installation uses mounting suited to your roof type and seals any penetrations. The roof's condition is checked beforehand, and repairs may be recommended before panels go on.",
      },
    ],
  },
  {
    id: "costs",
    title: "Costs and savings",
    faqs: [
      homeFaqs[7],
      {
        question: "How accurate is the savings calculator?",
        answer:
          "The calculator applies simple, transparent formulas to the figures you enter. It is an illustrative estimate, not a quote or an engineering assessment. Actual results depend on tariffs, consumption patterns, system size, site conditions, battery use and installation costs.",
      },
      {
        question: "What affects the cost of a solar system?",
        answer:
          "System size, battery capacity, equipment choice, roof type and access, distance between components, any electrical upgrades and the complexity of the installation all affect cost.",
      },
    ],
  },
  {
    id: "this-site",
    title: "About this website",
    faqs: [
      {
        question: "Is Sunpeak Energy Solutions a real company?",
        answer:
          "No. Sunpeak is a fictional company created for a portfolio website. Projects, team profiles and contact details on this site are illustrative. Forms run in demo mode unless a lead-capture backend has been configured.",
      },
    ],
  },
];
