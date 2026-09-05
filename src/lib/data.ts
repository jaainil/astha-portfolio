export const LINKEDIN =
  "https://www.linkedin.com/in/astha-prajapati-a71944177/";

export type ExperienceItem = {
  id: string;
  index: string;
  company: string;
  monogram: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  mode: string;
  current?: boolean;
  summary: string;
  tags: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "eagle-agm",
    index: "01",
    company: "Eagle Pressure Systems",
    monogram: "EP",
    role: "Assistant General Manager",
    period: "Mar 2024 — Present",
    duration: "2 yrs 7 mos",
    location: "Ahmedabad, India",
    mode: "On-site",
    current: true,
    summary:
      "Running operations where engineering meets commerce — driving Good Manufacturing Practice (GMP), project management and cross-team execution for industrial pressure systems.",
    tags: ["GMP", "Project Management", "Operations", "Leadership"],
  },
  {
    id: "eagle-sales",
    index: "02",
    company: "Eagle Pressure Systems",
    monogram: "EP",
    role: "Sales Manager",
    period: "Mar 2023 — Mar 2024",
    duration: "1 yr 1 mo",
    location: "Remote",
    mode: "Remote",
    summary:
      "Owned the pipeline end-to-end — translating technical specifications into signed deals, and learning how engineering decisions echo all the way through a business.",
    tags: ["Sales", "Negotiation", "Client Relations", "Strategy"],
  },
  {
    id: "drevol",
    index: "03",
    company: "Drevol",
    monogram: "DR",
    role: "Graduate Trainee",
    period: "Dec 2022 — Mar 2023",
    duration: "4 mos",
    location: "Vadodara, India",
    mode: "Full-time",
    summary:
      "First industry role out of engineering school — building on the .NET stack with ASP.NET MVC and sharpening software fundamentals that still pay rent today.",
    tags: ["ASP.NET MVC", ".NET Framework", "C#", "SQL"],
  },
  {
    id: "internshala",
    index: "04",
    company: "Internshala",
    monogram: "IS",
    role: "Online Intern — Web Development",
    period: "May 2022 — Nov 2022",
    duration: "7 mos",
    location: "Remote",
    mode: "Internship",
    summary:
      "Seven months of structured web-development training — HTML, CSS, JavaScript, Bootstrap and Java, capped with a Database Management System module.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Java", "DBMS"],
  },
  {
    id: "arth",
    index: "05",
    company: "Arth Infosoft Pvt. Ltd.",
    monogram: "AI",
    role: "Software Intern",
    period: "Jan 2022 — Apr 2022",
    duration: "4 mos",
    location: "Ahmedabad, India",
    mode: "Full-time",
    summary:
      "Shipped a Project Management System in Django with PostgreSQL — from schema design to deployment on a live server, with Git driving every single step.",
    tags: ["Django", "PostgreSQL", "Git", "Bootstrap", "Deployment"],
  },
  {
    id: "kyrion",
    index: "06",
    company: "Kyrion Technologies Pvt. Ltd.",
    monogram: "KY",
    role: "Internship Trainee — Machine Learning",
    period: "Jun 2020 — Jul 2020",
    duration: "2 mos",
    location: "Delhi, India",
    mode: "Full-time",
    summary:
      "Where it all began — neural networks on MNIST Fashion, web-scraping pipelines in Python, and a first love affair with machine learning.",
    tags: ["Python", "Neural Networks", "Web Scraping", "Machine Learning"],
  },
];

export type EducationItem = {
  id: string;
  school: string;
  monogram: string;
  degree: string;
  period: string;
  place: string;
  note: string;
  tags: string[];
};

export const EDUCATION: EducationItem[] = [
  {
    id: "svit",
    school: "SVIT, Vasad",
    monogram: "SV",
    degree: "B.E. — Computer Engineering",
    period: "2018 — 2022",
    place: "Vasad, Gujarat",
    note: "Four years of computer engineering — Arduino labs, database administration and the foundations everything else stands on.",
    tags: ["Arduino", "Database Administration", "Computer Engineering"],
  },
  {
    id: "gyanjyot",
    school: "Shri R. A. Patel Gyanjyot Gujarati Medium School",
    monogram: "GP",
    degree: "Higher Education — Science Stream",
    period: "2016 — 2018",
    place: "Gujarat, India",
    note: "Science stream in Gujarati medium — where curiosity finally got a curriculum.",
    tags: ["Science", "Mathematics", "Physics"],
  },
];

export const SKILL_GROUPS = [
  {
    id: "engineering",
    title: "Engineering",
    blurb: "The stack that ships — web, backend, data and machines.",
    skills: [
      "Python",
      "Django",
      "ASP.NET MVC",
      ".NET Framework",
      "JavaScript",
      "Java",
      "HTML & CSS",
      "Bootstrap",
      "PostgreSQL",
      "MySQL",
      "DBMS",
      "Git & GitHub",
      "Deployment",
      "Arduino",
      "Neural Networks",
      "Web Scraping",
    ],
  },
  {
    id: "command",
    title: "Leadership & Operations",
    blurb: "The human stack — running projects, plants and pipelines.",
    skills: [
      "Good Manufacturing Practice",
      "Project Management",
      "Sales & Negotiation",
      "Team Leadership",
      "Client Relations",
      "Database Administration",
      "Problem Solving",
    ],
  },
];

export const MARQUEE_ITEMS = [
  "Assistant General Manager",
  "Django",
  "Project Management",
  "Neural Networks",
  "GMP",
  ".NET MVC",
  "PostgreSQL",
  "Sales Leadership",
  "Web Scraping",
  "Arduino",
];

export const STATS = [
  { value: 6, suffix: "+", label: "Years of momentum" },
  { value: 5, suffix: "", label: "Organizations served" },
  { value: 6, suffix: "", label: "Roles & counting" },
  { value: 2, suffix: "", label: "Domains — code & commerce" },
];

export const HERO_CHIPS = [
  { label: "Django", depth: 70, rot: -8, pos: "a" },
  { label: "PostgreSQL", depth: 45, rot: 5, pos: "b" },
  { label: ".NET MVC", depth: 60, rot: 6, pos: "c" },
  { label: "Neural Networks", depth: 38, rot: -5, pos: "d" },
  { label: "GMP Certified", depth: 55, rot: -3, pos: "e" },
  { label: "Python", depth: 85, rot: 4, pos: "f" },
];
