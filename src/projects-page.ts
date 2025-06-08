import "./projects-style.css"
import { createHeader, setupHeaderScroll } from "./main.ts"
import { aboutMe } from "./projects"
import { createParticlesBackground } from "./particles"

function createMainPage(): void {
	const app = document.querySelector<HTMLDivElement>("#app")
	if (!app) return

	app.innerHTML = `
    <!-- messy html stuff -->
    ${createHeader("projects")}
    
	<div class="relative z-10 w-full mx-auto pt-24 pb-12">
		<section class="text-center mb-16">
			
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

	window.dispatchEvent(new Event("scroll"))
}

document.addEventListener("DOMContentLoaded", () => {
	createMainPage()
	setupHeaderScroll()
	createParticlesBackground()
})

