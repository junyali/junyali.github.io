import './style.css'
import { techStack, aboutMe } from './projects'

function updateTime(): void {
	const now = new Date()
	const timeString = now.toLocaleTimeString("en-GB", {
		hour12: true,
		hour: "numeric",
		minute: "2-digit"
	})

	const timeElement = document.getElementById("current-time")
	if (timeElement) {
        timeElement.textContent = timeString
    }
}

function createHeader(activePage: "home" | "projects" = "home"): string {
	return `
		<header id="site-header" class="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out">
			<div class="header-container w-full mx-auto px-6 py-4 bg-ctp-surface0/80 backdrop-blur-md border-b border-ctp-surface1 transition-all duration-500 ease-out transform-gpu">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold text-ctp-mauve">junya</div>
					<div class="flex gap-6">
						<a href="/" class="nav-link ${activePage === "home" ? "text-ctp-mauve" : "text-ctp-text hover:text-ctp-mauve"}">
							<i class="fas fa-home mr-2"></i>
							<span>Home</span>
						</a>
						<a href="/projects/" class="nav-link ${activePage === "projects" ? "text-ctp-mauve" : "text-ctp-text hover:text-ctp-mauve"}">
							<i class="fas fa-code mr-2"></i>
							<span>Projects</span>
						</a>
					</div>
				</div>
			</div>
	  </header>
	`
}

function setupHeaderScroll(): void {
	const header = document.getElementById("site-header")
	const headerContainer = header?.querySelector<HTMLDivElement>(".header-container")

	if (!header || !headerContainer) return

	const expandedClasses = [
		"w-full", "mx-auto", "px-6", "py-4",
		"bg-ctp-base/95", "backdrop-blur-md",
		"border-b", "border-ctp-surface1",
		"transition-all", "duration-500", "ease-out"
	]

	const compactClasses = [
		"w-3/5", "mx-auto", "mt-2", "px-6", "py-2",
		"bg-ctp-mantle/95", "backdrop-blur-md",
		"rounded-xl", "shadow-lg",
		"border", "border-ctp-overlay2/30",
		"ring-1", "ring-ctp-mauve/20", "ring-offset-0",
		"transition-all", "duration-500", "ease-out"
	]

	expandedClasses.forEach(cls => {
		if (!headerContainer.classList.contains(cls)) {
			headerContainer.classList.add(cls)
		}
	})

	window.addEventListener("scroll", () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop

		if (scrollTop > 50) {
			header.classList.add("scrolled")

			expandedClasses.forEach(cls => {
				headerContainer.classList.remove(cls)
			})
			compactClasses.forEach(cls => {
				if (!headerContainer.classList.contains(cls)) {
					headerContainer.classList.add(cls)
				}
			})
		} else {
			header.classList.remove("scrolled")

			compactClasses.forEach(cls => {
				headerContainer.classList.remove(cls)
			})
			expandedClasses.forEach(cls => {
				if (!headerContainer.classList.contains(cls)) {
					headerContainer.classList.add(cls)
				}
			})
		}
	})
}

function createMainPage(): void {
	const app = document.querySelector<HTMLDivElement>("#app")
	if (!app) return

	app.innerHTML = `
    <!-- messy html stuff -->
    ${createHeader("home")}
    
	<div class="relative z-10 w-full mx-auto px-6 pt-24 pb-12">
		<section class="text-center mb-16">
			<div class="relative inline-block mb-8">
				<img src="${aboutMe.image}" 
					alt="picture"
					class="w-32 h-32 rounded-2xl mx-auto border-4 border-ctp-mauve/30 shadow-2xl shadow-ctp-mauve/20">
			</div>
	
			<h1 class="text-5xl font-bold text-ctp-text mb-4">
				<span class="text-ctp-mauve">hello!! i'm</span> ${aboutMe.name}
			</h1>
	
			<p class="text-xl text-ctp-subtext1 mb-8 max-w-2xl mx-auto">
				${aboutMe.description}
			</p>
	
			<div class="flex justify-center gap-6 mb-8">
				${techStack.map(tech => `
					<i class="${tech.icon} text-3xl text-ctp-text hover:text-ctp-blue transition-colors duration-200 cursor-pointer tech-icon" 
						title="${tech.name}" 
						style="color: ${tech.color}"></i>
				`).join('')}
			</div>
	
			<div class="inline-flex items-center gap-2 bg-ctp-surface0/40 backdrop-blur-sm border border-ctp-surface1/50 rounded-full px-4 py-2 text-ctp-subtext1">
				<i class="fas fa-clock"></i>
				<span id="current-time">fetching my local time</span>
			</div>
			
		</section>
		<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		
		</p>
		<footer class="text-center mt-16 pt-8 border-t border-ctp-surface1/30">
			<p class="text-ctp-subtext0">
				Made with ❤️ by 
				<a href="https://github.com/${aboutMe.githubUsername}" target="_blank" rel="noopener noreferrer" class="text-ctp-mauve hover:text-ctp-pink transition-colors duration-200 font-medium">
					junya
				</a>
			</p>
		</footer>
    `

	updateTime()
	setInterval(updateTime, 1000)

	window.dispatchEvent(new Event('scroll'));
}

document.addEventListener('DOMContentLoaded', () => {
	createMainPage()
	setupHeaderScroll()
})
