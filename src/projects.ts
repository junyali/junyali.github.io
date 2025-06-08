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
