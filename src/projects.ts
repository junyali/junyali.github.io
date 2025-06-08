// this ts file has the configuration for all me projects!! :3

export interface ProjectLink {
    type: "github" | "demo" | "download" | "website" | "video"
    url: string
    label: string
}

export interface Project {
    id: string
    title: string
    description: string
    image: string
    imageAlt: string
    links: ProjectLink[]
    tags: string[]
    featured?: boolean
    status?: "completed" | "ongoing" | "stalled" | "archived"
    year?: number
}

export const projects: Project[] = [
    // all projects go here basically :p
    {
        id: "arsenalandanvil",
        title: "Arsenal and Anvil",
        description: "A QoL Minecraft mod for NeoForge 1.21.1 aimed to add a variety of new weapons and tools for all tiers!",
        image: "https://github.com/junyali/arsenalandanvil/blob/main/preview/demo_1.png?raw=true",
        imageAlt: "Preview of Arsenal and Anvil",
        links: [
            { type: "github", url: "https://github.com/junyali/arsenalandanvil/", label: "View Source" },
            { type: "download", url: "https://modrinth.com/mod/arsenal-and-anvil", label: "Download on Modrinth" },
            { type: "download", url: "https://www.curseforge.com/minecraft/mc-mods/arsenal-and-anvil", label: "Download on Curseforge" }
        ],
        tags: ["Java", "Minecraft", "Mod Development"],
        featured: true,
        status: "ongoing",
        year: 2025
    },
    {
        id: "extra-ores",
        title: "Extra Ores & Items",
        description: "A QoL Minecraft mod for Fabric 1.21.4 that adds a variety of new ores, tools, equipment and consumables into the game!",
        image: "https://github.com/junyali/extra-ores/blob/master/preview/demo_main.png?raw=true",
        imageAlt: "Preview of eXtra Ores & Items",
        links: [
            { type: "github", url: "https://github.com/junyali/extra-ores", label: "View Source" },
            { type: "download", url: "https://modrinth.com/mod/extra-ores-items", label: "Download on Modrinth" },
            { type: "download", url: "https://www.curseforge.com/minecraft/mc-mods/extra-ores-items", label: "Download on Curseforge" }
        ],
        tags: ["Java", "Minecraft", "Mod Development"],
        featured: true,
        status: "stalled",
        year: 2025
    },
    {
        id: "kawaiipad",
        title: "KawaiiPad",
        description: "A 3D printed macropad with 3x3 switches, per-key RGB neopixel LEDs, and along with the cute case, a super cute PCB!",
        image: "https://github.com/junyali/KawaiiPad/blob/main/demo/case_render.png?raw=true",
        imageAlt: "KawaiiPad 3D render showing cute design",
        links: [
            { type: "github", url: "https://github.com/junyali/kawaiipad", label: "View Source" }
        ],
        tags: ["Hardware", "3D Printing", "PCB Design"],
        featured: true,
        status: "completed",
        year: 2025
    },
    {
        id: "flourish",
        title: "Flourish",
        description: "A languageless exploration game featuring unique enemies with the goal of restoring wildlife and defeating the source of evil.",
        image: "https://github.com/junyali/flourish/blob/main/banner_wide.png?raw=true",
        imageAlt: "Preview of Flourish",
        links: [
            { type: "github", url: "https://github.com/junyali/flourish", label: "View Source" },
            { type: "demo", url: "https://junyali.itch.io/flourish", label: "Download Game" }
        ],
        tags: ["Godot", "Game Development", "Juice"],
        featured: true,
        status: "completed",
        year: 2025
    },
    {
        id: "game-of-life",
        title: "Conway's Game of Life",
        description: "A PyGame implementation of John Horton Conway's Game of Life - Cellular Automata at its finest :3",
        image: "https://github.com/junyali/game-of-life/blob/master/images/demo1.gif?raw=true",
        imageAlt: "Conway's Game of Life simulation showing cellular automata",
        links: [
            { type: "github", url: "https://github.com/junyali/game-of-life", label: "View Source" }
        ],
        tags: ["Python", "PyGame", "Simulation", "Mathematics"],
        status: "completed",
        year: 2024
    },
    {
        id: "boykisser-pcb",
        title: "Boykisser PCB",
        description: "A small circuit board project featuring the Boykisser character with basic LEDs and mini vibrating motor disc - made for Hack Club's Solder.",
        image: "https://github.com/junyali/boykisser-pcb/blob/main/demo/pcb.png?raw=true",
        imageAlt: "Boykisser PCB design with cute character",
        links: [
            { type: "github", url: "https://github.com/junyali/boykisser-pcb", label: "View Source" }
        ],
        tags: ["Hardware", "PCB Design", "Solder"],
        status: "completed",
        year: 2025
    },
    {
        id: "goldbach-conjecture",
        title: "Goldbach Conjecture Explorer",
        description: "A Python implementation exploring one of the oldest, best-known unsolved problems in mathematics, theorised by Christian Goldbach.",
        image: "https://github.com/junyali/goldbach-conjecture-python/blob/master/program-icon.png?raw=true",
        imageAlt: "Goldbach Conjecture program icon with mathematical symbols",
        links: [
            { type: "github", url: "https://github.com/junyali/goldbach-conjecture-python", label: "View Source" }
        ],
        tags: ["Python", "Mathematics", "Number Theory"],
        status: "completed",
        year: 2024
    },
]

export interface techStackItem {
    name: string
    icon: string
    isSvg?: boolean
    colour: string
}

export const techStack: techStackItem[] = [
    { name: "MicroPython", icon: "fab fa-python", colour: "#2b2728" },
    { name: "Python", icon: "devicon-python-plain colored", colour: "#3776ab" },
    { name: "Lua", icon: "devicon-lua-plain colored", colour: "#2c2d72" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored", colour: "#f7df1e" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored", colour: "#3178c6" },
    { name: "NPM", icon: "devicon-npm-original-wordmark colored", colour: "#cb3837" },
    { name: "Java", icon: "devicon-java-plain colored", colour: "#f89820" },
    { name: "Visual Basic", icon: "devicon-visualbasic-plain colored", colour: "#004875" },
    { name: "C#", icon: "devicon-csharp-plain colored", colour: "#239120" },
    { name: "GDScript", icon: "devicon-godot-plain colored", colour: "#478cbf" },
    { name: "Unity", icon: "devicon-unity-plain colored", colour: "#000000" },
    { name: "Unreal Engine", icon: "devicon-unrealengine-original colored", colour: "#313131" },
    { name: "Bash", icon: "devicon-bash-plain colored", colour: "#4eaa25" },
    { name: "Markdown", icon: "devicon-markdown-original colored", colour: "#000000" },
    { name: "HTML5", icon: "devicon-html5-plain colored", colour: "#e34f26" },
    { name: "CSS3", icon: "devicon-css3-plain colored", colour: "#1572b6" },
    { name: "TailwindCSS", icon: "devicon-tailwindcss-plain colored", colour: "#38b2ac" },
    { name: "GitHub", icon: "devicon-github-original colored", colour: "#181717" },
    { name: "Slack", icon: "devicon-slack-plain colored", colour: "#4a154b" },
    { name: "Gradle", icon: "devicon-gradle-plain colored", colour: "#02303a" },
    { name: "Fedora", icon: "devicon-fedora-plain colored", colour: "#294172" },
    { name: "Arch Linux", icon: "devicon-archlinux-plain colored", colour: "#1793d1" },
    { name: "KiCAD", icon: "/techstackicons/kicad.svg", isSvg: true, colour: "#314cb0" },
    { name: "Blender", icon: "devicon-blender-original colored", colour: "#f5792a" },
    { name: "Cloudflare", icon: "devicon-cloudflare-plain colored", colour: "#f38020" },
    { name: "Nginx", icon: "devicon-nginx-original colored", colour: "#009639" },
    { name: "SQLite", icon: "devicon-sqlite-plain colored", colour: "#003b57" },
]

export const aboutMe = {
    name: "junya",
    description: "friendly programmar that likes making silly things :3",
    image: "https://ca.slack-edge.com/T0266FRGM-U082PAFDDS5-24254fec2bbc-512",
    githubUsername: "junyali",
    location: "SE UK",
    typingSpeed: "140",
    typingKeyboard: "ThinkPad L13 2-in-1 Gen 5",
    typingKeyboardUrl: "https://psref.lenovo.com/Product/ThinkPad/ThinkPad_L13_2_in_1_Gen_5_Intel",
    slackId: "U082PAFDDS5",
    contactEmail: "cuties-only[-at-]kafka.moe",
    reddit: "n1tohofan",
    instagram: "_junyanya",
    steam: "UnstableGL",
    itchio: "junyali"
}
