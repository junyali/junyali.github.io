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

export const techStack = [
    { name: "Python", icon: "fab fa-python", color: "#3776ab" },
    { name: "Lua", icon: "devicon-lua-plain", color: "#2c2d72" },
    { name: "TypeScript", icon: "devicon-typescript-plain", color: "#294E80" },
    { name: "Java", icon: "devicon-java-plain", color: "#f89820" },
    { name: "Visual Basic", icon: "devicon-visualbasic-plain", color: "#004875" },
    { name: "GDScript", icon: "devicon-godot-plain", color: "#478cbf" },
]

export const aboutMe = {
    name: "junya",
    description: "friendly programmar that likes making silly things :3",
    image: "https://ca.slack-edge.com/T0266FRGM-U082PAFDDS5-24254fec2bbc-512",
    githubUsername: "junyali",
    location: "SE UK"
}
