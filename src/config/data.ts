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
  help: `HERO.X TERMINAL v1.337 — Available Commands
═══════════════════════════════════════════════
  NAVIGATION
  ──────────────────────────────────────────
  help          Show this help menu
  about         About Hero.X
  whoami        Who is Hero.X?
  sysinfo       System information
  neofetch      System info with ASCII art

  PORTFOLIO
  ──────────────────────────────────────────
  projects      List all projects
  skills        Display skill tree
  socials       Show social links
  contact       Get contact info

  FILESYSTEM
  ──────────────────────────────────────────
  ls            List directory contents
  pwd           Print working directory
  cat <file>    Read a file
  tree          Show directory tree

  FUN & SECRETS
  ──────────────────────────────────────────
  hack          Initiate hack sequence
  matrix        Activate matrix mode
  scan          Port scan simulation
  decode        Decode a message
  easteregg     ????
  fortune       Random wisdom
  ping          Ping the matrix
  date          Show current time

  SYSTEM
  ──────────────────────────────────────────
  achievements  View your achievements
  history       Show command history
  sudo          Try your luck
  clear         Clear terminal
  echo <msg>    Print a message

  [Tab]  autocomplete  |  [↑/↓]  history nav
  [Ctrl+L]  clear screen`,

  about: `┌─────────────────────────────────────────────┐
│          HERO.X :: PROFILE v2.0             │
├─────────────────────────────────────────────┤
│ Name    : Hero.X                            │
│ Role    : Full-Stack Dev / Creator          │
│ Status  : [● ONLINE] Building things        │
│ Age     : 17                                │
│ XP      : 1337+                             │
│ Level   : Elite Developer                   │
├─────────────────────────────────────────────┤
│ A developer who builds stuff that           │
│ shouldn't exist. Part hacker, part          │
│ designer, part Roblox legend.               │
│                                             │
│ Stack  : Next.js · TypeScript · Lua · Python│
│ Tools  : Framer Motion · Tailwind · Discord │
│                                             │
│ Currently: Breaking the internet. 🌐        │
└─────────────────────────────────────────────┘`,

  neofetch: () => {
    const hour = new Date().getHours();
    const uptime = `${Math.floor(Math.random() * 12 + 1)}h ${Math.floor(Math.random() * 59)}m`;
    return `        👾        hero.x@hero-os
       /███\\       ─────────────────────
      /█████\\      OS: Hero.X OS v1.337
     /███████\\     Host: Portfolio Machine
    /█████████\\    Kernel: 5.15.0-hero
   /███████████\\   Uptime: ${uptime}
  /█████████████\\  Shell: hero-terminal v1.337
 /███████████████\\ Resolution: ${typeof window !== "undefined" ? window.innerWidth : "??"}×${typeof window !== "undefined" ? window.innerHeight : "??"}
─────────────────  Theme: Cyberpunk XP
CPU: Creative Chaos™ @ MAX GHz
RAM: 16 GB Caffeine / 16 GB Total
GPU: Imagination Pro 9090
NET: Connected to The Grid ∞
Time: ${hour < 5 ? "🌙 Night Owl Mode" : hour < 12 ? "🌅 Morning" : hour < 18 ? "☀️ Afternoon" : "🌆 Evening"}`;
  },

  projects: `PROJECTS :: C:\\Hero\\Projects\\
══════════════════════════════════════
[● LIVE]  HustleHub.exe       v2.1  42.3MB
[● LIVE]  TurfMacha.exe       v1.8  38.7MB
[● LIVE]  DiscordBots.exe     v3.5  12.1MB
[● LIVE]  RobloxProjects.exe  v∞   250MB+
[✓ DONE]  PortfolioSites.exe  v1.0  Various
[◐ WIP ]  AITools.exe         v0.7  8.4MB
[◐ WIP ]  Experimental.exe    v0.3  5.2MB
══════════════════════════════════════
Open the Projects window for full details`,

  skills: `SKILL_TREE :: C:\\Hero\\System\\skills.sys
══════════════════════════════════════
[FRONTEND]
  HTML         ██████████ 95% ⭐
  CSS          █████████░ 90%
  JavaScript   █████████░ 88%
  TypeScript   ████████░░ 82%
  React        █████████░ 85%
  Next.js      ████████░░ 83%

[GAME DEV]
  Roblox Studio █████████░ 90% ⭐
  Lua            █████████░ 88%

[BACKEND]
  Firebase    ████████░░ 75%
  Supabase    ███████░░░ 70%
  Node.js     ████████░░ 78%

[CREATIVE]
  UI/UX Design  █████████░ 87%
  Discord Bots  █████████░ 92% ⭐
  Framer Motion ████████░░ 80%
  AI Tools      ████████░░ 78%`,

  socials: `SOCIAL LINKS :: ALL SYSTEMS ONLINE
══════════════════════════════════════
[●] Roblox   : Hero_H622
[●] GitHub   : github.com/iamHeroXD
[●] Discord  : herox.dev
[●] X/Twitter: @HeroXDev
[●] Portfolio: hero-os.vercel.app
══════════════════════════════════════
Status: Available for work & collabs 🟢`,

  contact: `CONTACT :: CHANNELS OPEN
══════════════════════════════════════
[>] Discord  : herox.dev       (fastest)
[>] Email    : hero@herox.dev
[>] Status   : Available for work
[>] Timezone : UTC+5:30 (IST)
[>] Response : < 24 hours
══════════════════════════════════════
Open the Contact app for the mail form`,

  whoami: `> whoami
╔══════════════════════════════════════╗
║  hero.x                              ║
║  developer. creator. builder.        ║
║  ────────────────────────────────    ║
║  currently: making the impossible.   ║
║  power level: OVER 9000             ║
║  threat level: VERY FRIENDLY         ║
║  age: 17   timezone: UTC+5:30        ║
║  mode: FULL SEND                     ║
╚══════════════════════════════════════╝`,

  sudo: `[sudo] password for hero.x: ****
sudo: WARNING: You are not the hero you think you are.
sudo: This incident will be reported to /dev/null.
sudo: Permission denied (and yes, we logged your attempt 😏)
Hint: try 'hack' instead`,

  scan: `NETWORK SCANNER v2.0 — INITIATING...
══════════════════════════════════════
> Target: portfolio.herox.dev
> Protocol: TCP/HTTPS
> Scanning ports...

PORT    STATE    SERVICE     VERSION
22/tcp  closed   ssh         -
80/tcp  open     http        Next.js 15
443/tcp open     https       Vercel Edge
3000/tcp filtered dev-server -
1337/tcp open    hero-api    v1.337 ⭐

> Vulnerability scan: 0 CVEs found
> Security rating: A+
> Encryption: TLS 1.3
> Headers: CSP, HSTS, X-Frame-Options ✓
══════════════════════════════════════
Scan complete. All systems secure 🛡️`,

  decode: `DECODE MODULE v1.0 — RUNNING...
══════════════════════════════════════
Input (Base64): SGVyby5YIGlzIGEgbGVnZW5k
Decoding...  [██████████] 100%
Output: "Hero.X is a legend"

Input (Hex): 48 65 72 6F 2E 58
Decoding...  [██████████] 100%
Output: "Hero.X"

Input (ROT13): Ureh.K vf ohvyqvat gur shgher
Decoding...  [██████████] 100%
Output: "Hero.X is building the future"

Input (Binary): 01001000 01100101 01110010 01101111
Decoding...  [██████████] 100%
Output: "Hero"
══════════════════════════════════════
All messages successfully decoded ✓`,

  easteregg: `🥚 ═══ EASTER EGG FOUND ═══ 🥚
+100 XP added to your account!

Secret transmission: "The code is the art."
Hidden truth: null !== undefined
Pro tip: Try the Konami Code on the desktop
          ↑ ↑ ↓ ↓ ← → ← → B A

You're now officially part of the inner circle.
Welcome, hacker. 👾`,

  sysinfo: () => `HERO.X OS v1.337 :: SYSTEM INFORMATION
══════════════════════════════════════
CPU     : Creative Chaos™ @ 9.99 GHz
RAM     : 16384 MB (${Math.floor(Math.random() * 3000 + 10000)} MB used)
GPU     : Imagination Pro 9090 Ti
HDD     : Infinite Ideas™ [∞ GB free]
OS      : Hero.X OS (XP + Cyberpunk Edition)
UPTIME  : ${Math.floor(Math.random() * 8 + 1)}h ${Math.floor(Math.random() * 59)}m
BIOS    : Hero UEFI v2.0
NET     : Connected to The Grid ∞
BROWSER : ${typeof navigator !== "undefined" ? navigator.userAgent.split(" ").slice(-1)[0] : "Unknown"}
SCREEN  : ${typeof window !== "undefined" ? `${window.innerWidth}×${window.innerHeight}` : "??"}
LOCALE  : ${typeof navigator !== "undefined" ? navigator.language : "??"}
══════════════════════════════════════`,

  pwd: `C:\\Users\\Hero.X\\Desktop`,

  ls: `Directory of C:\\Users\\Hero.X\\Desktop
 Volume: Hero.X OS   Serial: 1337-CAFE

<DIR>    .
<DIR>    ..
<DIR>    Projects              [7 items]
<DIR>    Secret_Files          [LOCKED]
<DIR>    Source_Code           [GIT REPO]
<DIR>    Designs               [Figma exports]
         about.txt             2.4 KB
         resume.pdf            84.1 KB
         matrix.exe            13.37 KB
         easter_egg.txt        0.5 KB
         skills.sys            4.2 KB
         README.md             1.7 KB
         konami_code.secret    ??? KB

       12 File(s)    4,096 bytes
        4 Dir(s)     ∞ bytes free`,

  tree: `C:\\Users\\Hero.X\\Desktop
├── Projects\\
│   ├── HustleHub.exe
│   ├── TurfMacha.exe
│   ├── DiscordBots.exe
│   ├── RobloxProjects.exe
│   └── Experimental.exe
├── Secret_Files\\
│   ├── [LOCKED] unreleased_projects.exe
│   ├── secret_level_1.txt
│   ├── origin_story.md
│   ├── hacker_manifesto.txt
│   └── easter_eggs_list.json
├── Source_Code\\
│   ├── portfolio-os\\  [this very project]
│   └── .gitconfig
├── README.md
└── resume.pdf

5 directories, 13 files`,

  fortune: () => {
    const quotes = [
      '"The best code is no code at all." — Jeff Atwood',
      '"First, solve the problem. Then, write the code." — John Johnson',
      '"Code never lies. Comments sometimes do." — Ron Jeffries',
      '"It works on my machine." — Every Developer Ever',
      '"rm -rf is the ultimate undo." — anonymous',
      '"There are 10 types of developers: those who know binary, and those who don\'t." — Classic',
      '"I don\'t always test my code, but when I do, I do it in production." — Meme',
      '"Build things that shouldn\'t exist." — Hero.X',
      '"Ship early, iterate often, never stop learning." — Unknown',
      '"The code you write today is the legacy code someone else will inherit tomorrow." — Truth',
    ];
    return `🔮 Fortune for this session:\n\n  ${quotes[Math.floor(Math.random() * quotes.length)]}\n\nRun 'fortune' again for another insight.`;
  },

  ping: () => `PING matrix.herox.dev (1.3.3.7):
64 bytes from 1.3.3.7: icmp_seq=0 ttl=64 time=${(Math.random() * 2 + 0.5).toFixed(2)} ms
64 bytes from 1.3.3.7: icmp_seq=1 ttl=64 time=${(Math.random() * 2 + 0.5).toFixed(2)} ms
64 bytes from 1.3.3.7: icmp_seq=2 ttl=64 time=${(Math.random() * 2 + 0.5).toFixed(2)} ms
64 bytes from 1.3.3.7: icmp_seq=3 ttl=64 time=${(Math.random() * 2 + 0.5).toFixed(2)} ms

--- matrix.herox.dev ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
round-trip min/avg/max = 0.5/1.2/2.3 ms
The grid is responsive. 🟢`,

  date: () => {
    const now = new Date();
    return `HERO.X OS CLOCK
══════════════════════
Local  : ${now.toLocaleString()}
UTC    : ${now.toUTCString()}
Unix   : ${Math.floor(now.getTime() / 1000)}
ISO    : ${now.toISOString()}
Week   : Week ${Math.ceil((now.getDate() + new Date(now.getFullYear(), now.getMonth(), 1).getDay()) / 7)} of ${now.getFullYear()}
══════════════════════`;
  },

  "cat readme.md": `# Hero.X Portfolio OS
  Version  : 1.337.0
  Built on : Next.js 15 + TypeScript + Framer Motion
  Style    : Windows XP × Cyberpunk 2077
  Warning  : Highly addictive. Use responsibly.

  Stars on GitHub appreciated 🌟
  github.com/iamHeroXD/hero-s-web`,

  "cat easter_egg.txt": `Congratulations, hacker. You found the hidden file.

The real secret is: null !== undefined
Hidden truth: The matrix has you.
Secret code: 1337

...and you're genuinely awesome for reading this. 🎉`,

  "cat about.txt": `Name  : Hero.X
Age   : 17
Role  : Full-Stack Developer / Creator
Status: ONLINE — Building
Fun fact: This entire portfolio is a fake OS.
         You're literally inside my mind right now. 👁️`,

  matrix: `MATRIX MODE ACTIVATED
> Disconnecting from the simulation...
> Loading green rain...
> You took the red pill. Welcome to reality.`,

  clear: "CLEAR",

  achievements: "ACHIEVEMENTS_OPEN",
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
