// src/data/terminal-data.ts
//
// Single source of truth for every piece of content on the site. Both the card
// at / and the terminal at /details read from here — page titles, meta
// descriptions, the bio paragraph and the prompt label are all derived below.
// Edit this file, never the pages or components.

export const CAREER_START = "2017-06-01";

const YEAR_MS = 31557600000; // 365.25 days

/** Years of experience, recomputed at build time so it never goes stale.
    Floored rather than rounded — "8+ years" reads like a person wrote it,
    "8.6 years" reads like a script did. */
function yearsSince(start: string): string {
  return `${Math.floor((Date.now() - new Date(start).getTime()) / YEAR_MS)}+ years`;
}

export const PROFILE = {
  name: "Duong Hoang",
  role: "Platform Engineer / Solution Architect",
  experience: yearsSince(CAREER_START),
};

/** "Duong" — used in the prompt label and the bio's opening line. */
export const FIRST_NAME = PROFILE.name.split(" ")[0];

export const CONTACT = {
  email: "duong.ht0831@gmail.com",
  location: "Hanoi, Vietnam",
  openTo: ["consulting", "project support"],
};

export const SOCIAL_LINKS = {
  github: "https://github.com/d-clz",
  linkedin: "https://www.linkedin.com/in/dclz",
  blog: "https://d-clz.github.io",
};

const BASE = import.meta.env.BASE_URL;

export const ROUTES = {
  card: BASE,
  details: `${BASE}details/`,
};

export const PROMPT_LABEL = `${FIRST_NAME.toLowerCase()} — zsh`;

export const QUICK_COMMANDS = ["help", "about", "experience", "skills", "contact"];

/** Short bio on the card. Blank lines survive via `white-space: pre-line`. */
export const BIO = `I'm ${FIRST_NAME}.

Unmanaged things bother me — the manual step nobody wrote down, the box someone keeps fixing by hand, the procedure that works only because one person still remembers it.

That started with a home server in 2017 and hasn't let up since. The systems just got bigger, and most of the work now is making myself unnecessary to them: turning the thing one person knows how to run into something the whole team can.

There's a terminal behind this card if you want the longer version.`;

/** <title> and meta description for each route. */
export const PAGES = {
  card: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: `${PROFILE.name}, ${PROFILE.role} based in ${CONTACT.location}. ${PROFILE.experience} designing and operating infrastructure.`,
  },
  details: {
    title: `${PROFILE.name} — Details`,
    description: `Interactive terminal covering ${PROFILE.name}'s experience, skills and projects.`,
  },
};

// Not achievements — the timeline covers those. This is which skills I chose
// to go and pick up, and what those choices say about how I approach a system.
export const EDGE = [
  {
    title: "I design from the layers I've had to fix",
    body: "Self-taught in a homelab from 2017, then sysadmin, DevOps/SRE, DevSecOps, platform. Every layer I now put on a diagram — the network, the hypervisor, the cluster, the pipeline — is one I have been woken up by at some point. Design decisions get made with the failure modes already in mind, because I have met most of them from the wrong end.",
  },
  {
    title: "Every obstacle is a chance to learn",
    body: "Air-gapped and on-premises: no internet route, no scaling on demand, and traffic between sites that has to be steered deliberately rather than failing over on its own. Those constraints turned out to be the best teacher — when you can't add a node you learn exactly what the cluster spends, and when nothing is managed for you, you learn how it actually works. A cloud API hides most of that; here it has to be understood.",
  },
  {
    title: "I create the tool when it doesn't exist",
    body: "When the available tooling doesn't survive the constraints, I build what does. The coding part matters less every year — I let AI do most of it now, and that's fine. What it can't do is notice which tool is missing, state the constraint precisely enough to be built against, or judge whether what came back will hold when it matters. Knowing what to ask for is the part that stays mine.",
  },
  {
    title: "I write it down until it's boring",
    body: "Intuition doesn't survive being handed to someone else. I turn what I know into definitions, thresholds and runbooks, then hand the ownership over with them — a document nobody else edits is just my opinion with formatting. What I'm after is a team where the next person improves the procedure instead of asking me to run it again.",
  },
];

// Ordered by what the work actually leads with, not alphabetically. The
// EDGE entries above carry the argument; this is the supporting inventory.
export const SKILL_GROUPS: Array<{ key: string; values: string[] }> = [
  { key: "platform", values: ["Kubernetes", "OpenShift"] },
  { key: "virtualization", values: ["Proxmox", "lxc/lxd"] },
  { key: "container_runtimes", values: ["containerd", "cri-o", "podman", "dockerd"] },
  { key: "operating_systems", values: ["Linux", "RHEL"] },
  { key: "delivery", values: ["Jenkins", "Git", "registry mirroring"] },
  { key: "languages", values: ["Go", "Python", "Bash", "PowerShell"] },
  { key: "networking", values: ["WireGuard", "DNS", "ingress / load balancing"] },
  {
    key: "stateful_workloads",
    values: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "RabbitMQ"],
  },
];

// The arc is told through job titles, not employers — each step is what the
// work turned into, with the company kept as quiet context on the right.
export const EXPERIENCE = {
  current: {
    title: PROFILE.role,
    kind: "Platform & Infrastructure",
    time: "Since 2022",
  },
  timeline: [
    {
      year: "2017",
      title: "System Administrator",
      context: "homelab, self-taught",
      story:
        "One server, and a stubborn preference for running things myself rather than renting them. WireGuard for VPN, Pi-hole for DNS, NextCloud for storage, a few game servers and a Discord bot. Nobody assigned any of it, and every outage was mine alone to fix — which turned out to be the fastest way to actually learn Linux.",
      tags: ["Linux", "Networking", "Self-hosted"],
    },
    {
      year: "2019",
      title: "DevOps Engineer / SRE",
      context: "B2B logistics",
      story:
        "The same instincts, but now with a team depending on them — and the first time any of it had to be written down. Incident management, SLA, RPO and RTO, a disaster recovery plan someone would actually follow. It's where I first had to define what zero-downtime deployment meant in practice and then build for it: high availability, resilience, tolerations that hold when a node doesn't. The principle stuck — release fast, roll back faster, and let the client see neither.",
      tags: ["Incident Management", "DR / HA", "CI/CD"],
    },
    {
      year: "2022",
      title: "Senior DevSecOps Engineer",
      context: "digital banking",
      story:
        "An existing CI/CD estate rather than a blank page — hundreds of microservices, each with its own idea of how to build and ship. The work was making them converge on one path to production, with the security checks inside that path instead of bolted on after it. Zero downtime again, but consumer scale this time rather than a single business's user base, so the priority inverts: speed still matters, stability comes first, and a config tweak moves with the same discipline as a release.",
      tags: ["Microservices CI/CD", "DevSecOps", "Zero-Downtime"],
    },
    {
      year: "Now",
      title: PROFILE.role,
      context: "same employer, wider remit",
      story:
        "Same desk as the row above — the remit kept growing, which is why I never had to leave to find the next problem. Where that role imposed discipline by hand, this one abstracts it. Unified procedures and one shape of pipeline, so onboarding the 200th module costs what the 2nd did, and the teams who need it can run it themselves instead of filing a request. If the next one isn't as cheap as the last, the abstraction isn't finished yet.",
      tags: ["Platform Design", "IDP", "Automation"],
    },
  ],
};

export const PROJECTS = [
  {
    title: "dterm",
    badge: "TUI",
    badgeColor: "indigo",
    stack: "Go",
    tagline: "SSH session manager — bookmarks, split panes, SFTP, tunnels",
    technology: ["Go", "Bubble Tea", "x/crypto/ssh", "pkg/sftp"],
    liveLink: "",
    github: "https://github.com/d-clz/dterm",
  },
];

