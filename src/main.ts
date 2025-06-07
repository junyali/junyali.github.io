import './style.css'
import { projects, techStack, aboutMe, type ProjectLink } from './projects'

function createMainPage(): void {
	const app = document.querySelector<HTMLDivElement>("#app")
	if (!app) return

	app.innerHTML = `
    <!-- messy html stuff -->
	<div class="relative z-10 max-w-6xl mx-auto px-6 py-12">
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
	
		<footer class="text-center mt-16 pt-8 border-t border-ctp-surface1/30">
			<p class="text-ctp-subtext0">
				Made with ❤️ by 
				<a href="https://github.com/${aboutMe.githubUsername}" target="_blank" rel="noopener noreferrer" class="text-ctp-mauve hover:text-ctp-pink transition-colors duration-200 font-medium">
					junya
				</a>
			</p>
		</footer>
    `
}

document.addEventListener('DOMContentLoaded', () => {
	createMainPage()
})
