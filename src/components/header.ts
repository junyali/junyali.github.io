import { ThemeSwitcher } from "../utils/theme-switcher.ts";

export function createHeader(activePage: "home" | "projects" | "gallery" = "home"): string {
	const themeSwitcher = new ThemeSwitcher();

	return `
		<header id="site-header" class="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out">
			<div class="header-container w-full mx-auto px-6 py-4 bg-ctp-surface0/80 backdrop-blur-md border-b border-ctp-surface1 transition-all duration-500 ease-out transform-gpu">
				<div class="flex items-center justify-between">
					<div class="text-xl font-bold text-ctp-mauve">junya</div>
					<div class="flex items-center gap-6">
						<a href="/" class="nav-link ${activePage === "home" ? "text-ctp-mauve" : "text-ctp-text hover:text-ctp-mauve"}">
							<i class="fas fa-home mr-2"></i>
							<span>Home</span>
						</a>
						<a href="/projects/" class="nav-link ${activePage === "projects" ? "text-ctp-mauve" : "text-ctp-text hover:text-ctp-mauve"}">
							<i class="fas fa-code mr-2"></i>
							<span>Projects</span>
						</a>
						<a href="/gallery/" class="nav-link ${activePage === "gallery" ? "text-ctp-mauve" : "text-ctp-text hover:text-ctp-mauve"}">
							<i class="fas fa-photo-film mr-2"></i>
							<span>Gallery</span>
						</a>
						${themeSwitcher.createThemeButton()}
					</div>
				</div>
			</div>
	  </header>
	`
}
