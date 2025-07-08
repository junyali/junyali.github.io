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

		if (this.state.filteredItems.length === 0) {
			gridContainer.innerHTML = `
				<div class="col-span-full text-center py-16 animate-fade-in">
					<div class="animated-bounce mb-4">
						<i class="fas fa-images text-6xl text-ctp-overlay0 mb-4"></i>
					</div>
					<h3 class="text-xl font-semibold text-ctp-text mb-2">emptiness...</h3>
					<button onclick="galleryManager.clearAllFilters()"
							class="px-4 py-2 bg-ctp-mauve hover:bg-ctp-pink text-ctp-base rounded-lg transition-colors duration-200 hover:scale-105 transform">
						clear all filters
					</button>
				</div>
			`
			return
		}

		gridContainer.innerHTML = this.state.filteredItems.map((item, index) => `
			<div 	class="cursor-pointer transform transition-transform duration-500 ease-out hover:scale-105 hover:shadow-xl hover:shadow-ctp-mauve/20 opacity-0 translate-y-5"
					onclick="galleryManager.openModalById('${item.id}')"
					style="animation-delay: ${index * 50}ms">
				<div class="relative overflow-hidden rounded-lg bg-ctp-surface0 shadow-lg border border-ctp-surface1/30 transition-all duration-500 ease-out hover:border-ctp-mauve/50">
					<div class="aspect-square relative group bg-gradient-to-br from-ctp-mauve/10 via-ctp-pink/5 to-ctp-blue/10">
						${item.mediaType === "video" ? `
							<div class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10 group-hover:bg-black/10 transition-all duration-300">
								<div class="bg-white/20 rounded-full p-3 backdrop-blur-sm">
									<i class="fas fa-play text-white text-xl"></i>
								</div>
							</div>
						` : ""}
						<img 	src="${item.cdnUrl}"
								alt="${item.title}"
								class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
								loading="lazy" />
					</div>
					<div class="p-3 bg-gradient-to-b from-ctp-surface0 to-ctp-surface0/80">
						<div class="flex items-center gap-2 mb-1">
							<span class="fi fi-${item.country} rounded-sm border border-ctp-overlay0/30"></span>
							<span class="text-xs text-ctp-overlay0 font-medium">${this.getCountryName(item.country)}</span>
							<span class="text-xs text-ctp-overlay0/50">~</span>
							<span class="text-xs text-ctp-overlay0 font-mono">${item.year}</span>
						</div>
						<h3 class="font-semibold text-ctp-text text-sm mb-1 line-clamp-1 hover:text-ctp-mauve transition-colors">${item.title}</h3>
						<p class="text-xs text-ctp-subtext0 line-clamp-2 leading-relaxed">${item.description}</p>
					</div>
				</div>
			</div>
		`).join("")

		const items = gridContainer.querySelectorAll(".cursor-pointer")
		items.forEach((item, index) => {
			const element = item as HTMLElement
			setTimeout(() => {
				element.classList.remove("opacity-0", "translate-y-5")
				element.classList.add("opacity-100", "translate-y-0")
			}, index * 50)
		})
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

		modal.innerHTML = `
			<div class="relative bg-ctp-base rounded-xl max-w-6xl max-h-[95vh] overflow-auto shadow-2xl border border-ctp-surface1/50 animate-scale-in">
				<button class="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 hover:scale-110"
						onclick="galleryManager.closeModal()">
					<i class="fas fa-times"></i>
				</button>
				<div class="flex flex-col lg:flex-row">
					<div class="lg:w-2/3 bg-gradient-to-br from-ctp-surface0/20 via-ctp-mauve/5 to-ctp-pink/10 p-4">
						${item.mediaType === "video" ? `
							<video controls class="w-full h-auto rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
								<source src="${item.cdnUrl}" type="video/mp4">
								your browser doesn't support videos :(
							</video>
						` : `
							<img    src="${item.cdnUrl}" alt="${item.title}"
									class="w-full h-auto rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none object-cover">
						`}
					</div>
					<div class="lg:w-1/3 p-6 bg-gradient-to-b from-ctp-base to-ctp-mantle">
						<div class="flex items-center gap-2 mb-3">
							<span class="fi fi-${item.country} rounded-sm border border-ctp-overlay0/30"></span>
							<span class="text-sm text-ctp-mauve font-semibold">${this.getCountryName(item.country)}</span>
						</div>
						<h2 class="text-2xl font-bold text-ctp-text mb-2 leading-tight">${item.title}</h2>
						<p class="text-ctp-subtext0 mb-4 leading-relaxed">${item.description}</p>
						<div class="space-y-3 text-sm">
							<div class="flex items-center gap-2 p-2 bg-ctp-surface0/50 rounded-lg">
								<i class="fas fa-calendar text-ctp-blue w-4"></i>
								<span class="font-mono">${item.month ? `${item.month}/` : ""}${item.year}</span>
							</div>
							<div class="flex items-center gap-2 p-2 bg-ctp-surface0/50 rounded-lg">
								<i class="fas fa-tag text-ctp-green w-4"></i>
								<span>${categories.find(category => category.id === item.category)?.name}</span>
							</div>
							${item.metadata?.camera ? `
								<div class="flex items-center gap-2 p-2 bg-ctp-surface0/50 rounded-lg">
									<i class="fas fa-camera text-ctp-yellow w-4"></i>
									<span class="font-medium">${item.metadata.camera}</span>
								</div>
							` : ""}
							${item.metadata?.settings ? `
								<div class="pt-2 border-t border-ctp-surface1/50">
									<h4 class="font-semibold text-ctp-text mb-2 flex items-center gap-2">
										<i class="fas fa-cog text-ctp-mauve text-xs"></i>
										camera info
									</h4>
									<div class="grid grid-cols-2 gap-2 text-xs">
										${item.metadata.settings.aperture ? `<div class="bg-ctp-surface0/30 px-2 py-1 rounded text-center font-mono">f/${item.metadata.settings.aperture}</div>` : ""}
										${item.metadata.settings.shutterSpeed ? `<div class="bg-ctp-surface0/30 px-2 py-1 rounded text-center font-mono">${item.metadata.settings.shutterSpeed}</div>` : ""}
										${item.metadata.settings.iso ? `<div class="bg-ctp-surface0/30 px-2 py-1 rounded text-center font-mono">${item.metadata.settings.iso}</div>` : ""}
										${item.metadata.settings.focalLength ? `<div class="bg-ctp-surface0/30 px-2 py-1 rounded text-center font-mono">${item.metadata.settings.focalLength}</div>` : ""}
									</div>
								</div>
							` : ""}
						</div>
						<div class="flex flex-wrap gap-1 mt-4 pt-4 border-t border-ctp-surface1/50">
							${item.tags.map(tag => `
								<span class="px-2 py-1 bg-ctp-surface0/60 hover:bg-ctp-mauve/20 text-ctp-text rounded-full text-xs transition-colors duration-200 cursor-default border border-ctp-surface1/30">
									${tag}
								</span>
							`).join("")}
						</div>
					</div>
				</div>
			</div>
		`

		document.body.appendChild(modal)
	}

	openModalById(itemId: string): void {
		const item = galleryItems.find(i => i.id === itemId)
		if (item) this.openModal(item)
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
						<div class="flex justify-between items-center mt-4 pt-4 border-t border-ctp-surface1">
							<span id="results-count" class="text-xs text-ctp-overlay0"></span>
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

	const searchInput = document.getElementById("gallery-search") as HTMLInputElement
	if (searchInput) {
		let searchTimeout: number
		searchInput.addEventListener("input", (e) => {
			clearTimeout(searchTimeout)
			searchTimeout = window.setTimeout(() => {
				window.galleryManager.setSearchQuery((e.target as HTMLInputElement).value)
			}, 300) // Debounce search
		})
	}

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
