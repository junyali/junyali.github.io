import "../styles/gallery-style.css"
import { setupHeaderScroll, setupInteractiveText } from "./main.ts"
import {
	visitedCountries
} from "../data/gallery.ts"
import { createHeader } from "../components/header.ts"
import { createFooter } from "../components/footer.ts"
import { ThemeSwitcher } from "../utils/theme-switcher.ts"
import { Konami } from "../utils/konami.ts"

function createGalleryPage(): void {
	const app = document.querySelector<HTMLDivElement>("#app")
	if (!app) return

	app.innerHTML = `
		${createHeader("gallery")}
		
		<div class="relative z-10 w-full mx-auto pt-24 pb-12">
			<div class="max-w-7xl mx-auto px-6">
				<section class="mb-8">
					<h1 class="text-4xl font-bold text-center mb-2">
						<span class="text-ctp-mauve">my </span>
						<span class="interactive-text">gallery</span>
					</h1>
					<p class="text-ctp-subtext0 text-center mb-8 max-w-2xl mx-auto">
						explore my travels around the world :3
					</p>
					<div class="bg-ctp-surface0/40 backdrop-blur-sm border border-ctp-mauve/20 rounded-xl p-6 mb-8">
						<div>
							<h3 class="txt-sm font-medium text-ctp-text mb-2 flex items-center gap-2">
								<i class="fas fa-globe text-ctp-blue"></i>
								Visited Countries
							</h3>
							<div class="flex flex-wrap gap-2">
								${visitedCountries.map(country => `
									<button class="country-filter px-3 py-1.5 bg-ctp-surface1 hover:bg-ctp-mauve text-ctp-text hover:text-ctp-base rounded-lg transition-all duration-200 text-sm flex items-center broder border-ctp-surface2/50 hover:border-ctp-mauve hover:scale-105 transform"
											data-country="${country.code}">
										<span class="fi fi-${country.code} mr-2 rounded-sm border border-ctp-overlay0/30"></span>${country.name}
									</button>
								`).join("")}
							</div>
						</div>
					</div>
				</section>
				<section class="mb-16">
					<!-- gallery stuff goes here -->
					<div id="gallery-grid" class="masonry-grid"></div>
				</section>
				${createFooter()}
			</div>
		</div>
	`

	setupInteractiveText()
	window.dispatchEvent(new Event("scroll"))
}

document.addEventListener("DOMContentLoaded", () => {
	createGalleryPage()
	setupHeaderScroll()

	const themeSwitcher = new ThemeSwitcher()
	themeSwitcher.setupEventListeners()

	new Konami()
})
