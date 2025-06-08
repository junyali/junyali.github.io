import "./style.css"
import { techStack, aboutMe } from "./projects"
import { createParticlesBackground } from "./particles"

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

// editor's note: one day i'll ACTUALLY sort my typescript files out and organise them properly
// one day maybe..
// ONE DAY....

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

function renderTechStack(): HTMLDivElement {
	const techStackSection = document.createElement("div")
	techStackSection.className = "w-full relative overflow-hidden py-4 mb-8 mt-6 bg-ctp-base/50 backdrop-blur-md border-t border-b border-ctp-mauve/20 shadow-lg"
	techStackSection.classList.add("tech-stack-container")

	const scrollContainer = document.createElement("div")
	scrollContainer.className = "flex whitespace-nowrap tech-stack-scroll"

	const techItems = techStack.map(tech => {
		const techItem = document.createElement("div")
		techItem.className = "inline-flex items-center mx-6 px-4 py-2 rounded-lg bg-ctp-surface0/60 border border-ctp-mauve/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-ctp-mauve/30 hover:bg-ctp-surface1/70"

		if (tech.isSvg) {
			const icon = document.createElement("img")
			icon.className = `text-2xl mr-2 max-h-6`
			icon.src = `${tech.icon}`
			icon.alt = `${tech.name}`

			techItem.appendChild(icon)
		} else {
			const hasColoredClass = tech.icon.includes("colored")

			const icon = document.createElement("i")
			icon.className = `${tech.icon} text-2xl mr-2`
			if (!hasColoredClass) {
				icon.style.color = tech.colour
			}

			techItem.appendChild(icon)
		}

		const name = document.createElement("span")
		name.className = "text-ctp-text"
		name.textContent = tech.name

		techItem.appendChild(name)

		return techItem
	})

	techItems.forEach(item => scrollContainer.appendChild(item))

	techItems.forEach(item => {
		const clone = item.cloneNode(true)
		scrollContainer.appendChild(clone)
	})

	techStackSection.appendChild(scrollContainer)

	return techStackSection
}

function setupInteractiveText(): void {
	const style = document.createElement("style")
	style.textContent = `
		.shadow-glow {
			text-shadow: 0 0 8px rgba(203, 166, 247, 0.6);
		}
	`
	document.head.appendChild(style)

	const interactiveElements = document.querySelectorAll(".interactive-text")

	interactiveElements.forEach(element => {
		const typedElement = element as HTMLElement
		typedElement.classList.add(
			"relative",
			"inline-block",
			"cursor-pointer",
			"transition-all",
			"duration-300",
			"hover:scale-105"
		)

		const underline = document.createElement("span")
		underline.classList.add(
			"absolute",
			"bottom-0",
			"left-0",
			"w-0",
			"h-0.5",
			"bg-gradient-to-r",
			"from-ctp-pink",
			"via-ctp-mauve",
			"to-ctp-blue",
			"transition-all",
			"duration-300",
			"group-hover:w-full"
		)

		const wrapper = document.createElement("span")
		wrapper.classList.add("group", "inline-block")

		const originalText = element.textContent
		typedElement.textContent = ""

		typedElement.parentNode?.insertBefore(wrapper, typedElement)
		wrapper.appendChild(typedElement)
		typedElement.appendChild(document.createTextNode(originalText || ""))
		typedElement.appendChild(underline)

		const colours = ["text-ctp-pink", "text-ctp-mauve", "text-ctp-flamingo", "text-ctp-sky", "text-ctp-green", "text-ctp-yellow"]
		let currentColourIndex = 0

		typedElement.addEventListener("mouseenter", () => {
			typedElement.classList.add("shadow-glow")

			const interval = setInterval(() => {
				colours.forEach(colour => element.classList.remove(colour))
				element.classList.add(colours[currentColourIndex])
				currentColourIndex = (currentColourIndex + 1) % colours.length
			}, 300)

			typedElement.dataset.colorInterval = interval.toString()
		})

		typedElement.addEventListener("mouseleave", () => {
			typedElement.classList.remove("shadow-glow")
			if (typedElement.dataset.colorInterval) {
				clearInterval(parseInt(typedElement.dataset.colorInterval))
				typedElement.dataset.colorInterval = ""
			}

			colours.forEach(colour => typedElement.classList.remove(colour))
		})
	})
}

function setupExtraInteractivity(): void {
	const typingSpeedElements = document.querySelectorAll(".typing-speed-highlight")
	typingSpeedElements.forEach(element => {
		const tooltip = document.createElement("span")
		tooltip.textContent = "sonic if he typed"
		tooltip.classList.add(
			"absolute", "hidden", "group-hover:block", "bottom-full", "left-1/2",
			"transform", "-translate-x-1/2", "px-2", "py-1", "bg-ctp-surface0",
			"text-ctp-text", "text-xs", "rounded", "shadow-lg", "mb-1",
			"border", "border-ctp-mauve/30", "whitespace-nowrap", "z-10"
		)

		const wrapper = document.createElement("span")
		wrapper.classList.add("group", "relative", "inline-block")
		element.parentNode?.insertBefore(wrapper, element)
		wrapper.appendChild(element)
		wrapper.appendChild(tooltip)
	})

	const keyboardElements = document.querySelectorAll(".keyboard-highlight")
	keyboardElements.forEach(element => {
		element.addEventListener("click", () => {
			element.classList.add("scale-95", "bg-ctp-mauve/20")
			setTimeout(() => {
				element.classList.remove("scale-95", "bg-ctp-mauve/20")
			}, 200)
		})
	})
}

function getRandomCaffeine(): string {
	const amount = Math.floor(Math.random() * 601)

	let emoji = "☕"
	let description = ""

	if (amount === 0) {
		emoji = "😴"
		description = " (need more!)"
	} else if (amount < 100) {
		emoji = "🥱"
		description = " (just getting started)"
	} else if (amount < 300) {
		emoji = "😊"
		description = " (feeling good)"
	} else if (amount < 500) {
		emoji = "😳"
		description = " (getting jittery)"
	} else {
		emoji = "🤪"
		description = " (vibrating intensely)"
	}

	return `
		<span class="font-bold">caffeine consumed today: </span><span class="caffeine-amount">${amount}mg</span> ${emoji}<span class="text-ctp-overlay0 text-sm">${description}</span>
	`
}

function createMainPage(): void {
	const app = document.querySelector<HTMLDivElement>("#app")
	if (!app) return

	app.innerHTML = `
    <!-- messy html stuff -->
    ${createHeader("home")}
    
	<div class="relative z-10 w-full mx-auto pt-24 pb-12">
		<section class="text-center mb-16">
			<div class="relative inline-block mb-8">
				<img src="${aboutMe.image}" 
					alt="picture"
					class="w-32 h-32 rounded-2xl mx-auto border-4 border-ctp-mauve/30 shadow-2xl shadow-ctp-mauve/20">
			</div>
	
			<h1 class="text-5xl font-bold text-ctp-text mb-4">
				<span class="text-ctp-mauve">hello!! i'm </span>
				<span class="interactive-text">${aboutMe.name}</span>
			</h1>
	
			<p class="text-xl text-ctp-subtext1 mb-8 max-w-2xl mx-auto">
				${aboutMe.description}
			</p>
			
			<div class="inline-flex items-center gap-2 bg-ctp-surface0/40 backdrop-blur-sm border border-ctp-surface1/50 rounded-full px-4 py-2 text-ctp-subtext1">
				<i class="fas fa-clock"></i>
				<span id="current-time">fetching my local time</span>
				<span class="mx-1"></span>
				<i class="fas fa-map-marker-alt"></i>
				<span>${aboutMe.location}</span>
			</div>	
		</section>
		<div id="tech-stack-container"></div>
		<section class="text-left mb-16">
			<div class="mt-12 max-w-3xl mx-auto bg-ctp-surface0/40 backdrop-blur-sm border border-ctp-mauve/20 rounded-xl p-6 shadow-lg">
				<h2 class="text-2xl font-bold text-ctp-text mb-4">
					<span class="text-ctp-mauve">a thing or two </span>
					<span class="interactive-text">about me...</span>
				</h2>
				<p class="text-ctp-text leading-relaxed">
					heya!! i've been programming since 2018 and i love all things tech!
				</p>
				<p class="text-ctp-text leading-relaxed">
					when i'm not coding, you might find playing games or travelling around
				</p>
				<p class="text-ctp-text leading-relaxed">
					i can speak english <span class="fi fi-gb"></span> and mandarin <span class="fi fi-cn"></span> natively, and A2 german <span class="fi fi-de"></span> and spanish <span class="fi fi-es"></span>
				</p>
				<p class="text-ctp-text leading-relaxed">
					feel free to get in contact with me, i'd love to chat <3
				</p>
			</div>
			<div class="mt-12 max-w-3xl mx-auto bg-ctp-surface0/40 backdrop-blur-sm border border-ctp-mauve/20 rounded-xl p-6 shadow-lg">
				<h2 class="text-2xl font-bold text-ctp-text mb-4">
					<span class="text-ctp-mauve">extra things</span>
				</h2>
				<div class="quote-container my-6 px-6 py-4 border-l-4 border-ctp-mauve bg-ctp-surface0/60 rounded-r-lg shadow-inner">
					<p class="quote-text text-ctp-text leading-relaxed">
						What I cannot create, I do not understand.
					</p>
					<p class="quote-attribution text-right text-ctp-subtext0 mt-2">— Richard Feynman</p>
				</div>
				<p class="text-ctp-text leading-relaxed" id="caffeine-counter">
					${getRandomCaffeine()}
				</p>
				<p class="text-ctp-text leading-relaxed">
					<span class="font-bold">best typing speed: </span>
					<span class="typing-speed-highlight">${aboutMe.typingSpeed}</span>
					<span class="text-ctp-text">wpm on a</span>
					<a href="${aboutMe.typingKeyboardUrl}" 
						target="_blank" 
						rel="noopener noreferrer" 
						class="keyboard-highlight inline-block px-2 py-0.5 rounded bg-ctp-surface1/50 border border-ctp-mauve/30 hover:bg-ctp-surface1/80 transition-all cursor-pointer" 
						title="the keeb i use :3">
						${aboutMe.typingKeyboard}
						<i class="fas fa-external-link-alt text-xs ml-1 text-ctp-overlay0"></i>
					</a>
				</p>
				<p class="text-ctp-text leading-relaxed">
					<span class="font-bold">days since last bug: </span>
					<span class="inline-block bg-ctp-red/20 text-ctp-red px-2 py-0.5 rounded animate-pulse">0</span>
					<span class="text-xs text-ctp-overlay0">(this counter seems to be stuck...)</span>
				</p>
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

	updateTime()
	setInterval(updateTime, 1000)

	const techStackContainer = document.querySelector("#tech-stack-container")
	if (techStackContainer) {
		techStackContainer.appendChild(renderTechStack())
	}

	setupInteractiveText()
	setupExtraInteractivity()

	window.dispatchEvent(new Event("scroll"))
}

document.addEventListener("DOMContentLoaded", () => {
	createMainPage()
	setupHeaderScroll()
	createParticlesBackground()
})
