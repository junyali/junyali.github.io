import "../styles/gallery-style.css"
import { setupHeaderScroll, setupInteractiveText } from "./main.ts"
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
