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
