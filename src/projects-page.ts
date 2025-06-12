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
		<span class="px-2 py-0.5 rounded-full text-xs font-medium ${statusColours[project.status]} ml-2">
			${project.status}
        </span>
	` : ""

	const yearText = project.year ? `
		<span class="text-ctp-overlay0 text-sm ml-2">${project.year}</span>
	` : ""

	const featuredBadge = project.featured? `
		<div class="absolute top-3 right-3 bg-ctp-mauve/90 text-ctp-base px-2 py-0.5 rounded-full text-xs font-medium shadow-lg z-10">
			<i class="fas fa-star mr-1"></i> featured
		</div>
	` : ""

	const links = project.links.map(link => {
		return `
			<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="px-2 py-1 ${getLinkStyling(link.type)} transition-colors duration-200 rounded-lg text-sm flex items-center mr-2 mb-2">
                <i class="${getLinkIcon(link.type)} mr-1.5"></i>
                ${link.label}
            </a>
		`
	}).join("")

	const tags = project.tags.map(tag => `
		<span class="px-2 py-0.5 bg-ctp-surface0/60 rounded-full text-xs mr-1 mb-1">
			${tag}
		</span>
	`).join("")

	const featuredClasses = project.featured
	? "border-ctp-mauve/40 shadow-lg shadow-ctp-mauve/20"
	: "border-ctp-surface1/50"

	return `
		<div class="project-card h-full flex flex-col bg-ctp-mantle border ${featuredClasses} rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
			${featuredBadge}
			<div class="aspect-video relative h-[200px] overflow-hidden bg-ctp-surface0">
				<img src="${project.image}" alt="${project.imageAlt}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
			</div>
			<div class="p-5">
				<div class="flex items-center mb-2 flex-wrap">
					<h3 class="text-xl font-bold text-ctp-text">${project.title}</h3>
					${yearText}
					${statusText}
				</div>
				<p class="text-ctp-subtext0 mb-4">${project.description}</p>
				<div class="flex flexwrap gap-1 mb-1">
					${tags}
				</div>
				<div class="flex flex-wrap">
				    ${links}
				</div>
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
    
	<div class="relative z-10 w-full mx-auto px-6 pt-24 pb-12 max-w-7xl">
		<section class="mb-16">
			<h1 class="text-4xl font-bold text-center mb-2">
				<span class="text-ctp-mauve">my </span>
				<span class="interactive-text">projects</span>
			</h1>
			<p class="text-ctp-subtext0 text-center mb-12 max-w-2xl mx-auto">
				here's a collection of things i've worked on! click on any project's links to learn more about it :3
			</p>
			${featuredProjects.length > 0 ? `
				<div class="mb-16">
					<div class="flex items-center mb-8 border-b border-ctp-surface1/50 pb-2">
						<div class="bg-ctp-yellow/10 p-2 rounded-lg mr-3">
							<i class="fas fa-star text-ctp-yellow text-xl"></i>
						</div>
						<h2 class="text-2xl font-bold text-ctp-text">
							featured projects
						</h2>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						${featuredProjects.map(project => createProjectCard(project)).join("")}
					</div>
				</div>
			` : ""}
			<div>
				<div class="flex items-center mb-8 border-b border-ctp-surface1/50 pb-2">
					<div class="bg-ctp-blue/10 p-2 rounded-lg mr-3">
						<i class="fas fa-code text-ctp-blue text-xl"></i>
					</div>
					<h2 class="text-2xl font-bold text-ctp-text">
						other projects
					</h2>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					${otherProjects.map(project => createProjectCard(project)).join("")}
				</div>
			</div>
		</section>
		<footer class="text-center mt-16 pt-8 border-t border-ctp-surface1/30">
		    <div class="relative max-w-9/10 mx-auto">
		        <div class="absolute left-0 top-1/2 -translate-y-1/2 text-left">
		            <div class="flex items-center space-x-1 text-sm">
		                <a href="https://ctp-webr.ing/junya/previous" class="text-ctp-subtext0 hover:text-ctp-mauve transition-colors">&larr;</a>
		                <a href="https://ctp-webr.ing/" class="flex items-center text-ctp-subtext0 hover:text-ctp-mauve transition-colors"><img src="/catppuccin.png" alt="Catppuccin" class="h-4 max-h-4 w-auto object-contain mr-1"/><span> webring</span></a>
		                <a href="https://ctp-webr.ing/junya/next" class="text-ctp-subtext0 hover:text-ctp-mauve transition-colors">&rarr;</a>
		            </div>
		        </div>
		        <p class="text-ctp-subtext0">
		            Made with ❤️ by 
		            <a href="https://github.com/${aboutMe.githubUsername}" target="_blank" rel="noopener noreferrer" class="text-ctp-mauve hover:text-ctp-pink transition-colors duration-200 font-medium">
		                junya
		            </a>
		        </p>
		    </div>
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

