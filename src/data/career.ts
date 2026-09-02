// Confirmed career record, sourced verbatim from the LinkedIn profile supplied
// for this build (see PRODUCT.md → Evidence on Hand). Nothing here is invented:
// unnamed "+N" skill counts from the source are noted, never filled in.

export type ZoneFact = {
  role: string;
  org: string;
  location: string;
  dates: string;
  duration?: string;
  employment?: string;
  detail: string;
  skills: string[];
  unlistedSkillCount?: number;
  note?: string;
};

export type Zone = {
  id: string;
  /** Short arc label etched on the gauge, e.g. "ORIGIN" */
  tickLabel: string;
  /** Year label printed at this zone's leading boundary tick */
  yearLabel: string;
  /** One line shown as the zone's headline while active */
  headline: string;
  redline?: boolean;
  facts: ZoneFact[];
};

export const zones: Zone[] = [
  {
    id: "foundations",
    tickLabel: "FOUNDATIONS",
    yearLabel: "'16",
    headline: "Where the calibration started",
    facts: [
      {
        employment: "Education",
        role: "Higher Education, Science Stream",
        org: "Shri R. A. Patel Gyanjyot Gujarati Medium School",
        location: "Gujarat, India",
        dates: "Jun 2016 – Jun 2018",
        detail: "Science stream secondary education.",
        skills: [],
      },
      {
        employment: "Education",
        role: "BE, Computer Engineering",
        org: "SVIT, Vasad",
        location: "Gujarat, India",
        dates: "2018 – 2022",
        detail: "Bachelor of Engineering in Computer Engineering.",
        skills: ["Arduino", "Database Administration"],
        unlistedSkillCount: 1,
      },
    ],
  },
  {
    id: "field-training",
    tickLabel: "FIELD TRAINING",
    yearLabel: "'20",
    headline: "Three internships, one instrument being built",
    facts: [
      {
        role: "Internship Trainee",
        org: "Kyrion Technologies Pvt. Ltd.",
        location: "Delhi, India",
        dates: "Jun 2020 – Jul 2020",
        duration: "2 mos",
        employment: "Full-time",
        detail:
          "Built a neural network on Fashion MNIST, ran web scraping in Python, and studied neural-network and ML fundamentals.",
        skills: ["Artificial Neural Networks", "MTA"],
        unlistedSkillCount: 4,
      },
      {
        role: "Intern",
        org: "Arth Infosoft Pvt. Ltd.",
        location: "Ahmedabad, Gujarat, India",
        dates: "Jan 2022 – Apr 2022",
        duration: "4 mos",
        employment: "Full-time",
        detail:
          "Built a Project Management System in Django with a Postgres backend, using Git and Bootstrap. Handled deployment and error-solving.",
        skills: ["Django", "Database Administration"],
        unlistedSkillCount: 4,
      },
      {
        role: "Online Intern",
        org: "Internshala",
        location: "Remote",
        dates: "May 2022 – Nov 2022",
        duration: "7 mos",
        employment: "Internship",
        detail: "Learned web development: HTML, CSS, JS, Bootstrap, and Java.",
        skills: ["Database Management System (DBMS)", "Bootstrap"],
        unlistedSkillCount: 7,
      },
    ],
  },
  {
    id: "drevol",
    tickLabel: "DREVOL",
    yearLabel: "'22",
    headline: "The first full-time engineering role",
    facts: [
      {
        role: "Graduate Trainee",
        org: "Drevol",
        location: "Vadodara, Gujarat, India",
        dates: "Dec 2022 – Mar 2023",
        duration: "4 mos",
        employment: "Full-time",
        detail: "Full-time graduate trainee position.",
        note: "Sourced via LinkedIn.",
        skills: ["ASP.NET MVC", ".NET Framework"],
        unlistedSkillCount: 2,
      },
    ],
  },
  {
    id: "sales-manager",
    tickLabel: "SALES MANAGER",
    yearLabel: "'23",
    headline: "First command inside Eagle Pressure Systems",
    facts: [
      {
        role: "Sales Manager",
        org: "Eagle Pressure Systems",
        location: "Ahmedabad, Gujarat, India",
        dates: "Mar 2023 – Mar 2024",
        duration: "1 yr 1 mo",
        employment: "Remote",
        detail: "Full-time, remote.",
        skills: [],
      },
    ],
  },
  {
    id: "agm",
    tickLabel: "ASSISTANT GENERAL MANAGER",
    yearLabel: "NOW",
    headline: "Operating in the red zone, on purpose",
    redline: true,
    facts: [
      {
        role: "Assistant General Manager",
        org: "Eagle Pressure Systems",
        location: "Ahmedabad, Gujarat, India",
        dates: "Mar 2024 – Present",
        employment: "On-site",
        detail: "Good Manufacturing Practice (GMP) and Project Management.",
        skills: ["Good Manufacturing Practice (GMP)", "Project Management"],
      },
    ],
  },
];

export const instrumentation = {
  systems: {
    label: "SYSTEMS & SOFTWARE",
    origin: "field training, 2020–2022",
    items: [
      "Arduino",
      "Database Administration",
      "Django",
      "ASP.NET MVC",
      ".NET Framework",
      "Database Management System (DBMS)",
      "Bootstrap",
      "Artificial Neural Networks",
    ],
  },
  operations: {
    label: "OPERATIONS & LEADERSHIP",
    origin: "Eagle Pressure Systems, 2023–present",
    items: [
      "Good Manufacturing Practice (GMP)",
      "Project Management",
      "Sales Management",
    ],
  },
};

export const person = {
  name: "Astha Prajapati",
  currentTitle: "Assistant General Manager",
  currentOrg: "Eagle Pressure Systems",
  location: "Ahmedabad, Gujarat, India",
  linkedin: "https://www.linkedin.com/in/astha-prajapati-a71944177/",
  tagline: "Calibrated for pressure.",
};
