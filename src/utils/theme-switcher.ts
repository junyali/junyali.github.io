export type Theme = "mocha" | "latte";

export class ThemeSwitcher {
	private currentTheme: Theme
	private button: HTMLButtonElement | null = null

	constructor() {
		this.currentTheme = (localStorage.getItem("theme") as Theme) || "mocha"
		this.applyTheme(this.currentTheme)
	}

	createThemeButton(): string {
		return `
			<button id="theme-switcher"
					class="theme-btn p-2 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface1/50 border border-ctp-surface1/30 transition-all duration-200 group"
					title="Toggle Theme">
				<div class="relative w-5 h-5">
					<i class="fas fa-sun absolute inset-0 transition-all duration-300 ${this.currentTheme === "mocha" ? "opacity-0 rotate-180" : "opacity-100 rotate-0"} text-ctp-yellow"></i>
					<i class="fas fa-moon absolute inset-0 transition-all duration-300 ${this.currentTheme === "latte" ? "opacity-0 rotate-180" : "opacity-100 rotate-0"} text-ctp-blue"></i>
				</div>
			</button>
		`
	}

	setupEventListeners(): void {
		this.button = document.getElementById("theme-switcher") as HTMLButtonElement
		if (this.button) {
			this.button.addEventListener("click", () => {
				this.toggle()

				this.button?.classList.add("scale-95")
				setTimeout(() => {
					this.button?.classList.remove("scale-95")
				}, 150)
			})
		}
	}

	toggle(): void {
		this.currentTheme = this.currentTheme === "mocha" ? "latte" : "mocha"
		this.applyTheme(this.currentTheme)
		this.updateButtonIcons()

		localStorage.setItem("theme", this.currentTheme)
	}

	private applyTheme(theme: Theme): void {
		document.documentElement.setAttribute("data-theme", theme)

		const metaTheme = document.querySelector("meta[name='theme-color']")
		if (metaTheme) {
			metaTheme.setAttribute("content", theme === "mocha" ? "#cba6f7" : "8838ef")
		}
	}

	private updateButtonIcons(): void {
		const sunIcon = this.button?.querySelector(".fa-sun")
		const moonIcon = this.button?.querySelector(".fa-moon")

		if (this.currentTheme === "latte") {
			sunIcon?.classList.remove("opacity-0", "rotate-180")
			sunIcon?.classList.add("opacity-100", "rotate-0")
			moonIcon?.classList.remove("opacity-100", "rotate-0")
			moonIcon?.classList.add("opacity-0", "rotate-180")
		} else {
			moonIcon?.classList.remove("opacity-0", "rotate-180")
			moonIcon?.classList.add("opacity-100", "rotate-0")
			sunIcon?.classList.remove("opacity-100", "rotate-0")
			sunIcon?.classList.add("opacity-0", "rotate-180")
		}
	}
}