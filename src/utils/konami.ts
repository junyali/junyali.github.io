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
			() => this.catppuccinSwirl()
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

	private catppuccinSwirl(): void {
		const themes = ["latte", "mocha"]
		let currentIndex = 0

		this.showNotification("🍥 CATPPUCCIN SWIRL 🍥", "meow :3")

		const colourBurst = document.createElement("div")
		colourBurst.className = "fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
		colourBurst.innerHTML = `
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="w-8 h-8 rounded-full bg-ctp-lavender animate-ping opacity-90"></div>
				<div class="w-16 h-16 rounded-full bg-ctp-blue animate-ping opacity-85 delay-64"></div>
				<div class="w-24 h-24 rounded-full bg-ctp-sapphire animate-ping opacity-80 delay-128"></div>
				<div class="w-32 h-32 rounded-full bg-ctp-sky animate-ping opacity-75 delay-192"></div>
				<div class="w-40 h-40 rounded-full bg-ctp-teal animate-ping opacity-70 delay-256"></div>
				<div class="w-56 h-56 rounded-full bg-ctp-green animate-ping opacity-65 delay-320"></div>
				<div class="w-64 h-64 rounded-full bg-ctp-yellow animate-ping opacity-60 delay-384"></div>
				<div class="w-72 h-72 rounded-full bg-ctp-peach animate-ping opacity-55 delay-448"></div>
				<div class="w-80 h-80 rounded-full bg-ctp-maroon animate-ping opacity-50 delay-512"></div>
				<div class="w-88 h-88 rounded-full bg-ctp-red animate-ping opacity-45 delay-576"></div>
				<div class="w-96 h-96 rounded-full bg-ctp-mauve animate-ping opacity-40 delay-640"></div>
				<div class="w-104 h-104 rounded-full bg-ctp-pink animate-ping opacity-35 delay-704"></div>
				<div class="w-112 h-112 rounded-full bg-ctp-flamingo animate-ping opacity-30 delay-768"></div>
				<div class="w-120 h-120 rounded-full bg-ctp-rosewater animate-ping opacity-25 delay-832"></div>
			</div>
		`

		document.body.appendChild(colourBurst)

		const interval = setInterval(() => {
			document.documentElement.setAttribute("data-theme", themes[currentIndex])
			currentIndex = (currentIndex + 1) % themes.length
		}, 500)

		setTimeout(() => {
			clearInterval(interval)
			colourBurst.remove()
		}, 800)
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