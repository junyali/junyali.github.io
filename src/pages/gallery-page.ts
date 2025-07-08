import "../styles/gallery-style.css"
import { setupHeaderScroll, setupInteractiveText } from "./main.ts"
import {
	categories,
	visitedCountries,
	galleryItems,
	type GalleryItem,
	type Category
} from "../data/gallery.ts"
import { createHeader } from "../components/header.ts"
import { createFooter } from "../components/footer.ts"
import { ThemeSwitcher } from "../utils/theme-switcher.ts"
import { Konami } from "../utils/konami.ts"

export interface GalleryState {
	selectedCountry: string | null
	selectedCategory: string | null
	searchQuery: string
	filteredItems: GalleryItem[]
	isModalOpen: boolean
	selectedItem: GalleryItem | null
}

class GalleryManager {
	private state: GalleryState = {
		selectedCountry: null,
		selectedCategory: null,
		searchQuery: "",
		filteredItems: [...galleryItems],
		isModalOpen: false,
		selectedItem: null
	}

	constructor() {
		this.filterItems()
	}

	private filterItems(): void {
		// filtering stuff goes here!!
		let filtered = [...galleryItems]

		if (this.state.selectedCountry) {
			filtered = filtered.filter(item => item.country === this.state.selectedCountry)
		}

		if (this.state.selectedCategory) {
			filtered = filtered.filter(item => item.category === this.state.selectedCategory)
		}

		if (this.state.searchQuery.trim()) {
			const query = this.state.searchQuery.toLowerCase()
			filtered = filtered.filter(item =>
				item.title.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query) ||
				item.tags.some(tag => tag.toLowerCase().includes(query)) ||
				this.getCountryName(item.country).toLowerCase().includes(query) ||
				item.year.toString().includes(query)
			)
		}

		this.state.filteredItems = filtered
		this.renderGalleryGrid()
		this.updateResultsCount()
	}

	private getCountryName(countryCode: string): string {
		const country = visitedCountries.find(country => country.code === countryCode)
		return country?.name || countryCode
	}

	setCountryFilter(countryCode: string | null): void {
		this.state.selectedCountry = countryCode
		this.filterItems()
		this.updateActiveStates()
	}

	setCategoryFilter(category: string | null): void {
		this.state.selectedCategory = category as Category | null
		this.filterItems()
		this.updateActiveStates()
	}

	setSearchQuery(query: string): void {
		this.state.searchQuery = query
		this.filterItems()
	}

	clearAllFilters(): void {
		this.state.selectedCountry = null
		this.state.selectedCategory = null
		this.state.searchQuery = ""

		const searchInput = document.getElementById("gallery-search") as HTMLInputElement
		if (searchInput) {
			searchInput.value = ""
		}

		this.filterItems()
		this.updateActiveStates()
	}

	private updateActiveStates(): void {
		document.querySelectorAll(".country-filter").forEach(button => {
			const countryCode = button.getAttribute("data-country")
			if (countryCode === this.state.selectedCountry) {
				button.classList.add("active")
			} else {
				button.classList.remove("active")
			}
		})

		document.querySelectorAll(".category-filter").forEach(button => {
			const category = button.getAttribute("data-category") as Category
			if (category === this.state.selectedCategory) {
				button.classList.add("active")
			} else {
				button.classList.remove("active")
			}
		})
	}

	private updateResultsCount(): void {
		const resultsElement = document.getElementById("results-count")
		if (resultsElement) {
			const count = this.state.filteredItems.length
			const total = galleryItems.length
			resultsElement.textContent = `showing ${count} of ${total} results`
		}
	}

	openModal(item: GalleryItem): void {
		this.state.selectedItem = item
		this.state.isModalOpen = true
		this.renderModal()
		document.body.style.overflow = "hidden"
	}

	closeModal(): void {
		this.state.isModalOpen = false
		this.state.selectedItem = null
		const modal = document.getElementById("gallery-modal")
		if (modal) {
			modal.remove()
		}
		document.body.style.overflow = ""
	}

	private renderGalleryGrid(): void {
		const gridContainer = document.getElementById("gallery-grid")
		if (!gridContainer) {
			return
		}

		// tba
	}

	private renderModal(): void {
		const item = this.state.selectedItem
		const modal = document.createElement("div")

		if (!item) {
			return
		}

		modal.id = "gallery-modal"
		modal.className = "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
		modal.onclick = (cursor) => {
			if (cursor.target === modal) {
				this.closeModal()
			}
		}

	}
}

declare global {
	interface Window {
		galleryManager: GalleryManager
	}
}

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
						<div class="flex flex-col lg:flex-row gap-4 mb-4">
							<div class="flex-1">
								<input  type="text"
										id="gallery-search"
										placeholder="filter by..."
										class="w-full px-4 py-2 bg-ctp-surface1 border border-ctp-surface2 rounded-lg text-ctp-text placeholder-ctp-overlay0 focus:outline-none focus:border-ctp-mauve transition-colors">
							</div>
							<button onclick="galleryManager.clearAllFilters()"
									class="px-4 py-2 bg-ctp-surface1 hover:bg-ctp-surface2 text-ctp-text rounded-lg transition-colors">
								<i class="fas fa-times mr-2"></i>clear
							</button>
						</div>
						<div class="mb-4">
							<h3 class="text-sm font-medium text-ctp-text mb-2 flex items-center gap-2">
								<i class="fas fa-layer-group text-ctp-mauve"></i>
								Categories
							</h3>
							<div class="flex flex-wrap gap-2">
								${categories.map(category => `
									<button class="category-filter cursor-pointer px-3 py-1.5 bg-ctp-surface1 hover:bg-ctp-mauve text-ctp-text hover:text-ctp-base rounded-lg transition-all duration-200 text-sm border border-ctp-surface2/50 hover:border-ctp-mauve hover:scale-105 transform"
											data-category="${category.id}"
											onclick="galleryManager.setCategoryFilter('${category.id}')">
										<i class="${category.icon} mr-1.5"></i>${category.name}
								`).join("")}
							</div>
						</div>
						<div>
							<h3 class="text-sm font-medium text-ctp-text mb-2 flex items-center gap-2">
								<i class="fas fa-globe text-ctp-blue"></i>
								Visited Countries
							</h3>
							<div class="flex flex-wrap gap-2">
								${visitedCountries.map(country => `
									<button class="country-filter cursor-pointer px-3 py-1.5 bg-ctp-surface1 hover:bg-ctp-mauve text-ctp-text hover:text-ctp-base rounded-lg transition-all duration-200 text-sm flex items-center border border-ctp-surface2/50 hover:border-ctp-mauve hover:scale-105 transform"
											data-country="${country.code}"
											onclick="galleryManager.setCountryFilter('${country.code}')">
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

	window.galleryManager = new GalleryManager()

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
