import type { Project, Skill, Review } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "hustlehub",
    title: "HustleHub",
    description:
      "A full-stack productivity platform for freelancers and indie hackers. Features task management, income tracking, and client management with a beautiful dashboard UI.",
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    status: "live",
    category: "Web App",
    year: "2024",
    size: "42.3 MB",
  },
  {
    id: "turfmacha",
    title: "TurfMacha",
    description:
      "Sports ground booking platform — find, book, and manage turf bookings near you. Built with real-time availability and payment integration.",
    tags: ["React", "Node.js", "Supabase", "Maps API"],
    status: "live",
    category: "Web App",
    year: "2024",
    size: "38.7 MB",
  },
  {
    id: "discord-bots",
    title: "Discord Bots Suite",
    description:
      "Collection of feature-rich Discord bots: moderation, economy, music, and fun commands. Used by 50+ servers with 10,000+ users.",
    tags: ["JavaScript", "Discord.js", "MongoDB", "Node.js"],
    status: "completed",
    category: "Bot",
    year: "2023",
    size: "12.1 MB",
  },
  {
    id: "roblox-projects",
    title: "Roblox Game Collection",
    description:
      "Multiple Roblox experiences: RPG combat systems, tycoon games, obby challenges. Built with Lua scripting and advanced game mechanics.",
    tags: ["Lua", "Roblox Studio", "Scripting", "UI Design"],
    status: "live",
    category: "Game Dev",
    year: "2022-2024",
    size: "250+ MB",
  },
  {
    id: "portfolio-websites",
    title: "Portfolio Websites",
    description:
      "Designed and developed 10+ custom portfolio websites for clients. Each one unique, creative, and optimized for performance and SEO.",
    tags: ["Next.js", "Framer Motion", "Tailwind", "Design"],
    status: "completed",
    category: "Design",
    year: "2023-2024",
    size: "Various",
  },
  {
    id: "ai-tools",
    title: "AI Tools & Automation",
    description:
      "Built AI-powered tools using OpenAI and Claude APIs. Includes a content generator, code reviewer, and automated workflow systems.",
    tags: ["Python", "OpenAI", "Claude API", "Automation"],
    status: "wip",
    category: "AI/ML",
    year: "2024",
    size: "8.4 MB",
  },
  {
    id: "experimental",
    title: "Experimental Concepts",
    description:
      "Lab for wild ideas — WebGL experiments, generative art, weird interactions. This is where creativity has no boundaries.",
    tags: ["WebGL", "Three.js", "Canvas API", "Creative"],
    status: "wip",
    category: "Experiments",
    year: "2024",
    size: "5.2 MB",
  },
];

export const SKILLS: Skill[] = [
  { name: "HTML", level: 95, category: "Frontend", color: "#E34F26" },
  { name: "CSS", level: 90, category: "Frontend", color: "#264DE4" },
  { name: "JavaScript", level: 88, category: "Frontend", color: "#F7DF1E" },
  { name: "TypeScript", level: 82, category: "Frontend", color: "#3178C6" },
  { name: "React", level: 85, category: "Frontend", color: "#61DAFB" },
  { name: "Next.js", level: 83, category: "Frontend", color: "#000000" },
  { name: "Roblox Studio", level: 90, category: "Game Dev", color: "#FF0000" },
  { name: "Lua", level: 88, category: "Game Dev", color: "#000080" },
  { name: "Firebase", level: 75, category: "Backend", color: "#FFCA28" },
  { name: "Supabase", level: 70, category: "Backend", color: "#3ECF8E" },
  { name: "UI/UX Design", level: 87, category: "Design", color: "#F24E1E" },
  { name: "Discord Bots", level: 92, category: "Bot Dev", color: "#5865F2" },
  { name: "Framer Motion", level: 80, category: "Animation", color: "#0055FF" },
  { name: "GitHub", level: 88, category: "Tools", color: "#181717" },
  { name: "AI Tools", level: 78, category: "AI/ML", color: "#00A67E" },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Alex_Dev",
    role: "Startup Founder",
    message:
      "Hero.X built our entire web platform in record time. The quality of work is insane — every detail is polished. Highly recommend!",
    rating: 5,
    avatar: "🦁",
    timestamp: "2024-11-15 14:32",
    platform: "Discord",
  },
  {
    id: "r2",
    name: "TechLord99",
    role: "Roblox Developer",
    message:
      "Best Roblox UI designer I've worked with. Made my game look 10x better. The custom HUD and inventory system are amazing pieces of work.",
    rating: 5,
    avatar: "🎮",
    timestamp: "2024-10-22 09:18",
    platform: "Roblox",
  },
  {
    id: "r3",
    name: "Sarah.codes",
    role: "Frontend Engineer",
    message:
      "The portfolio site Hero.X made for me got me 3 job interviews in a week. Pure creativity and skill. A genuine talent.",
    rating: 5,
    avatar: "💻",
    timestamp: "2024-09-08 16:45",
    platform: "Twitter/X",
  },
  {
    id: "r4",
    name: "DiscordMod_Pro",
    role: "Server Owner",
    message:
      "Our Discord bot works flawlessly. Economy, moderation, custom games — all in one. The code is clean, documented, and runs without issues.",
    rating: 5,
    avatar: "🤖",
    timestamp: "2024-08-30 11:20",
    platform: "Discord",
  },
  {
    id: "r5",
    name: "VentureX_CEO",
    role: "Tech Entrepreneur",
    message:
      "Worked with Hero.X on our MVP. Delivered ahead of schedule, handled feedback like a pro. Will definitely work again on our next product.",
    rating: 5,
    avatar: "🚀",
    timestamp: "2024-07-14 13:00",
    platform: "Email",
  },
];

export const TERMINAL_COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  help        - Show this menu
  about       - About Hero.X
  projects    - List projects
  skills      - Display skill list
  socials     - Show social links
  contact     - Get contact info
  whoami      - Who is Hero.X?
  clear       - Clear terminal
  sudo        - Try your luck...
  hack        - Initiate hack sequence
  matrix      - Activate matrix mode
  easteregg   - ????
  history     - Show command history
  sysinfo     - System information
  pwd         - Print working directory
  ls          - List directory contents
  cat         - Read a file`,

  about: `┌─────────────────────────────────────────┐
│           HERO.X :: PROFILE v2.0        │
├─────────────────────────────────────────┤
│ Name    : Hero.X                        │
│ Role    : Full-Stack Dev / Creator      │
│ Status  : [ONLINE] Building things      │
│ Age     : 17                            │
│ XP      : 1337+                         │
│ Level   : Elite Developer               │
├─────────────────────────────────────────┤
│ A developer who builds stuff that       │
│ shouldn't exist. Part hacker, part      │
│ designer, part Roblox legend.           │
│                                         │
│ Currently: Breaking the internet.       │
└─────────────────────────────────────────┘`,

  projects: `PROJECTS :: C:\\Hero\\Projects\\
══════════════════════════════
[EXE]  HustleHub.exe         - Live
[EXE]  TurfMacha.exe         - Live
[EXE]  DiscordBots.exe       - Active
[EXE]  RobloxProjects.exe    - Live
[EXE]  PortfolioSites.exe    - Done
[EXE]  AITools.exe           - WIP
[EXE]  Experimental.exe      - WIP
══════════════════════════════
Type 'open <project>' to view`,

  skills: `SKILL_TREE :: LOADING...
█████████░ HTML         95%
████████░░ CSS          90%
████████░░ JavaScript   88%
████████░░ React        85%
████████░░ Next.js      83%
█████████░ Roblox       90%
█████████░ Lua          88%
█████████░ Discord Bots 92%
███████░░░ UI/UX Design 87%
████████░░ TypeScript   82%`,

  socials: `SOCIAL LINKS :: ONLINE
══════════════════════════════
[●] Roblox   : Hero_H622
[●] GitHub   : github.com/iamHeroXD
[●] Discord  : herox.dev
[●] X        : @HeroXDev
══════════════════════════════`,

  contact: `CONTACT :: CHANNELS OPEN
══════════════════════════════
[>] Discord  : herox.dev
[>] Email    : hero@herox.dev
[>] Status   : Available for work
[>] Timezone : UTC+5:30
══════════════════════════════
Open Contact window for forms`,

  whoami: `> whoami
hero.x — developer. creator. builder.
currently: making things that shouldn't exist.
power level: over 9000.
threat level: friendly.`,

  sudo: `[sudo] password for hero.x: ****
Sorry, user 'visitor' is not in the sudoers file.
This incident has been reported.
Nice try though 😏`,

  hack: `INITIATING HACK SEQUENCE...
> Scanning target...
> Bypassing firewall... [DONE]
> Injecting payload... [DONE]
> Accessing mainframe... [DENIED]
> Access denied: L33T skills required
> Try: sudo hack --level=elite
> Hint: You are already inside the matrix 👀`,

  easteregg: `🥚 YOU FOUND AN EASTER EGG!
+100 XP added to your account
Secret message: "The code is the art."
Konami Code: ↑↑↓↓←→←→BA for more secrets...`,

  sysinfo: `HERO.X OS v1.337 :: SYSTEM INFO
══════════════════════════════
CPU    : Creative Chaos™ @ MAX GHz
RAM    : 16 GB caffeine
GPU    : Imagination Pro 9090
HDD    : Infinite Ideas™
OS     : Hero.X OS (Windows XP inspired)
UPTIME : Building since day 1
BIOS   : Hero UEFI v2.0
NET    : Connected to the grid
══════════════════════════════`,

  pwd: `C:\\Users\\Hero.X\\Desktop`,

  ls: `Directory of C:\\Users\\Hero.X\\Desktop

<DIR>  .
<DIR>  ..
<DIR>  Projects
<DIR>  Secret_Files
<DIR>  Source_Code
       about.txt
       resume.pdf
       matrix.exe
       easter_egg.txt
       skills.sys
       README.md`,

  "cat readme.md": `# Hero.X Portfolio OS
Version: 1.337.0
Built with: Coffee, creativity, and chaos.
Warning: Highly addictive. Use responsibly.`,

  "cat easter_egg.txt": `Congratulations, hacker.
You found the hidden file.
The real secret is: null !== undefined
...and: you're awesome for reading this.`,

  matrix: `MATRIX MODE ACTIVATED
> Redirecting reality...
> Loading green rain...
> You took the red pill. Welcome.`,

  history: `1  help
2  whoami
3  about
4  skills
5  hack
6  sudo
7  matrix
8  easteregg`,

  clear: "CLEAR",
};

export const BOOT_MESSAGES = [
  "HERO.X BIOS v1.337 — Copyright 2024 Hero.X Systems",
  "CPU: Creative Chaos™ Processor @ 9.99 GHz",
  "RAM: 16384 MB OK",
  "Detecting boot devices...",
  "Primary Master: Hero.X SSD [420.69 GB]",
  "Secondary Master: Imagination Drive [∞ GB]",
  "Initializing PCI devices...",
  "Loading Hero.X OS...",
  "Checking file system...",
  "Starting networking services...",
  "Loading desktop environment...",
  "Mounting secret partitions...",
  "Applying cool factor... [DONE]",
  "System ready. Welcome, user.",
];

export const FAKE_NOTIFICATIONS = [
  { title: "Hero.X OS", message: "New portfolio update available!", icon: "💾" },
  { title: "Antivirus Pro", message: "No threats detected. You're safe... for now.", icon: "🛡️" },
  { title: "Music Player", message: "Lo-fi Chill Beats — Now Playing", icon: "🎵" },
  { title: "System Update", message: "Hero.X OS v1.338 ready to install", icon: "⚙️" },
  { title: "Network", message: "Connected to the Grid ∞", icon: "🌐" },
  { title: "Memory Cleaner", message: "RAM freed: 1337 MB", icon: "🧹" },
];
