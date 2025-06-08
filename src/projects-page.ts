import "./projects-style.css"
import { createHeader, setupHeaderScroll, setupInteractiveText } from "./main.ts"
import { aboutMe, projects, type Project, type ProjectLink } from "./projects"
import { createParticlesBackground } from "./particles"

function getLinkIcon(type: ProjectLink["type"]): string {
	switch (type) {
		case "github": return "fab fa-github"
		case "demo": return "fas fa-external-link-alt"
		case "download": return "fas fa-download"
		case "website": return "fas fa-globe"
		case "video": return "fas fa-video"
		default: return "fas fa-link"
	}
}

function getLinkStyling(type: ProjectLink["type"]): string {
	switch (type) {
		case "github": return "bg-ctp-surface1 hover:bg-ctp-surface2 text-ctp-text"
		case "demo": return "bg-ctp-blue hover:bg-ctp-sapphire text-ctp-base"
		case "download": return "bg-ctp-green hover:bg-ctp-teal text-ctp-base"
		case "website": return "bg-ctp-mauve hover:bg-ctp-pink text-ctp-base"
		case "video": return "bg-ctp-red hover:bg-ctp-maroon text-ctp-base"
		default: return "bg-ctp-surface1 hover:bg-ctp-surface2 text-ctp-text"
	}
}

function createProjectCard(project: Project): string {
	const statusColours = {
		completed: "bg-ctp-green/20 text-ctp-green",
		ongoing: "bg-ctp-blue/20 text-ctp-blue",
        stalled: "bg-ctp-yellow/20 text-ctp-yellow",
        archived: "bg-ctp-overlay0/20 text-ctp-overlay0",
	}

	const statusText = project.status ? `
		<span class="px-2 py-0.5 rounded-full text-xs font-medium ${statusColours[project.status]}">
			${project.status}
        </span>
	` : ""

	const yearText = project.year ? `
		<span class="text-ctp-overlay0 text-sm ml-2">${project.year}</span>
	` : ""

	const featuredBadge = project.featured? `
		<div class="absolute top-3 right-3 bg-ctp-mauve/90 text-ctp-base px-2 py-0.5 rounded-full text-xs font-medium shadow-lg">
			<i class="fas fa-star mr-1"></i> featured
		</div>
	` : ""

	const links = project.links.map(link => {
		return `
			<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 ${getLinkStyling(link.type)} transition-colors duration-200 rounded-lg text-sm flex items-center">
                <i class="${getLinkIcon(link.type)} mr-2"></i>
                ${link.label}
            </a>
		`
	})

	const tags = project.tags.map(tag => `
		<span class="px-2 py-0.5 bg-ctp-surface0/60 rounded-full text-xs">
			${tag}
		</span>
	`).join("")

	return `
		<div class="project-card bg-ctp-mantle border border-ctp-surface1/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translation-y-1 relative ${project.featured ? "featured-project" : ""}">
			${featuredBadge}
			<div class="aspect-video overflow-hidden bg-ctp-surface0">
				<img src="${project.image}" alt="${project.imageAlt}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
			</div>
			<div class="p-5">
				<div class="flex items-center mb-2">
					<h3 class="text-xl font-bold text-ctp-text">${project.title}</h3>
					${yearText}
				</div>
				<p class="text-ctp-subtext0 mb-4">${project.description}</p>
				<div class="flex flexwrap gap-1 mb-1">
					${tags}
				</div>
				<div class="flex items-center justify-between">
				    ${links}
				</div>
				${statusText}
			</div>
		</div>
	`
}

function createMainPage(): void {
	const app = document.querySelector<HTMLDivElement>("#app")
	if (!app) return

	const sortedProjects = [...projects].sort((a, b) => {
		if (a.featured && !b.featured) return -1
		if (!a.featured && b.featured) return 1
		return (b.year || 0) - (a.year || 0)
	})

	const featuredProjects = sortedProjects.filter(p => p.featured)
	const otherProjects = sortedProjects.filter(p => !p.featured)

	app.innerHTML = `
    <!-- messy html stuff -->
    ${createHeader("projects")}
    
	<div class="relative z-10 w-full mx-auto pt-24 pb-12">
		<section class="mb-16">
			<h1 class="text-4xl font-bold text-center mb-2">
				<span class="text-ctp-mauve">my </span>
				<span class="interactive-text">projects</span>
			</h1>
			<p class="text-ctp-subtext0 text-center mb-12 max-w-2xl mx-auto">
				here's a collection of things i've worked on! click on any project to learn more about it :3
			</p>
			${featuredProjects.length > 0 ? `
				<div class="mb-12">
					<h2 class="text-2xl font-bold mb-6 flex items-center">
						<i class="fas fa-star text-ctp-yellow mr-2"></i> featured projects
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						${featuredProjects.map(project => createProjectCard(project)).join("")}
					</div>
				</div>
			` : ""}
			<div>
				<h2 class="text-2xl font-bold mb-6 flex items-center">
					<i class="fas fa-star text-ctp-yellow mr-2"></i> projects
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					${otherProjects.map(project => createProjectCard(project)).join("")}
				</div>
			</div>
		</section>
		<footer class="text-center mt-16 pt-8 border-t border-ctp-surface1/30">
			<p class="text-ctp-subtext0">
				Made with ❤️ by 
				<a href="https://github.com/${aboutMe.githubUsername}" target="_blank" rel="noopener noreferrer" class="text-ctp-mauve hover:text-ctp-pink transition-colors duration-200 font-medium">
					junya
				</a>
			</p>
		</footer>
    `

	setupInteractiveText()

	window.dispatchEvent(new Event("scroll"))
}

document.addEventListener("DOMContentLoaded", () => {
	createMainPage()
	setupHeaderScroll()
	createParticlesBackground()
})

