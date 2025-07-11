export class Konami {
	private sequence: string[] = []
	private konamiSequence: string[] = [
		"ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"
	]
	private timeoutId: number | null = null
	private isActive: boolean = false

	constructor() {
		this.setupListener()
	}

	private setupListener(): void {
		document.addEventListener("keydown", (event: KeyboardEvent) => {
			if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
				return
			}

			this.sequence.push(event.code)

			if (this.sequence.length > this.konamiSequence.length) {
				this.sequence.shift()
			}

			if (this.sequenceMatches()) {
				this.triggerEasterEgg()
			}

			if (this.timeoutId) {
				clearTimeout(this.timeoutId)
			}

			this.timeoutId = window.setTimeout(() => {
				this.sequence = []
			}, 3000)
		})
	}

	private sequenceMatches(): boolean {
		if (this.sequence.length !== this.konamiSequence.length) {
			return false
		}

		return this.sequence.every((key, index) => key === this.konamiSequence[index])
	}

	private triggerEasterEgg(): void {
		if (this.isActive) {
			return
		}

		this.isActive = true
		this.sequence = []

		const easterEggs = [
			() => this.matrixRain(),
			() => this.rainbowMode(),
			// to be implemented l8r maybe.. for now im just not happy with its state :(
			// () => this.catppuccinSwirl()
		]
		const randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)]
		randomEgg()

		setTimeout(() => {
			this.isActive = false
		}, 10000)
	}

	private matrixRain(): void {
		const matrix = document.createElement("div")
		matrix.className = "fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-black/80"
		matrix.id = "matrix-rain"

		const canvas = document.createElement("canvas")
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		matrix.appendChild(canvas)

		const ctx = canvas.getContext("2d")!
		const chars ="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
		const fontSize = 16
		const columns = Math.floor(canvas.width / fontSize)
		const drops: number[] = Array(columns).fill(0)

		function draw() {
			ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			ctx.fillStyle = "#0f0"
			ctx.font = `${fontSize}px monospace`

			for (let i = 0; i < drops.length; i++) {
				const char = chars[Math.floor(Math.random() * chars.length)]
				ctx.fillText(char, i * fontSize, drops[i] * fontSize)

				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0
				}
				drops[i]++
			}
		}

		const interval = setInterval(draw, 33)
		document.body.appendChild(matrix)

		this.showNotification("👨‍💻 MATRIX MODE 👨‍💻", "welcome to the digital realm")

		setTimeout(() => {
			const message = document.createElement("div")
			message.className = "fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
			message.innerHTML = `
				<div class="text-center">
					<h1 class="text-6xl font-bold text-green-400 mb-4 animate-pulse">KONAMI CODE ACTIVATED</h1>
					<p class="text-2xl text-green-300">you found the easter egg! :3</p>
					<p class="text-lg text-green-200 mt-4">~ matrix mode engaged ~</p>
				</div>
			`
			document.body.appendChild(message)

			setTimeout(() => {
				clearInterval(interval)
				matrix.remove()
				message.remove()
			}, 8000)
		}, 2000)
	}

	private rainbowMode(): void {
		const style = document.createElement("style")
		style.innerHTML = `
			@keyframes rainbow-background {
				0% { filter: hue-rotate(0deg); }
				100% { filter: hue-rotate(360deg); }
			}
			.rainbow-mode * {
				animation: rainbow-background 2s linear infinite !important;
			}
		`

		document.head.appendChild(style)
		document.body.classList.add("rainbow-mode")

		this.showNotification("🌈 RAINBOW MODE 🌈", "colours ablaze!!")

		setTimeout(() => {
			document.body.classList.remove("rainbow-mode")
			style.remove()
		}, 8000)
	}

	// @ts-ignore
	private catppuccinSwirl(): void {
		const originalTheme = document.documentElement.getAttribute("data-theme") || "mocha"
		const themes = ["latte", "mocha", "macchiato", "frappe"]
		let currentIndex = 0

		this.showNotification("🍥 CATPPUCCIN SWIRL 🍥", "meow :3")

		const transitionStyle = document.createElement("style")
		transitionStyle.textContent = `
			:root {
				transition: all 0.1s ease-in-out;
			}
		`
		document.head.appendChild(transitionStyle)

		const interval = setInterval(() => {
			const newTheme = themes[currentIndex]
			document.documentElement.setAttribute("data-theme", newTheme)
			currentIndex = (currentIndex + 1) % themes.length
		}, 250)

		setTimeout(() => {
			clearInterval(interval)
			transitionStyle.remove()
			document.documentElement.setAttribute("data-theme", originalTheme)
		}, 8000)
	}

	private showNotification(title: string, subtitle: string): void {
		const notif = document.createElement("div")
		notif.className = "fixed bottom-4 right-4 z-[10001] bg-ctp-surface0/40 border-l-2 border-ctp-mauve/50 text-ctp-text px-4 py-3 rounded-lg shadow-lg max-w-md"
		notif.style.backdropFilter = "blur(12px)"
		notif.style.animation = "slide-in-right 0.5s ease forwards"
		notif.innerHTML = `
			<div class="flex flex-col">
				<div class="flex items-center gap-x-2 mb-1">
					<h4 class="text-base font-medium text-ctp-lavender whitespace-nowrap">${title}</h4>
					<p class="text-sm">${subtitle}</p>
				</div>
				<p class="text-xs text-ctp-subtext0/50">psst.. try the sequence again for a different effect 😉</p>
			</div>
		`

		const style = document.createElement("style")
		style.textContent = `
			@keyframes slide-in-right {
				from {
					transform: translateX(100%);
					opacity: 0;
				}
				to {
					transform: translateX(0);
					opacity: 1;
				}
			}
			
			@keyframes slide-out-right {
				from {
					transform: translateX(0);
					opacity: 1;
				}
				to {
					transform: translateX(100%);
					opacity: 0;
				}
			}
		`

		document.body.appendChild(style)
		document.body.appendChild(notif)

		setTimeout(() => {
			notif.style.animation = "slide-out-right 0.5s ease forwards"
			setTimeout(() => {
				notif.remove()
				style.remove()
			}, 500)
		}, 7500)
	}
}