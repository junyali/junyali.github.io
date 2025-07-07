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
			() => this.rainbowMode()
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

		const notif = document.createElement("div")
		notif.className = "fixed top-20 right-4 z-[9999] bg-ctp-mauve text-ctp-base px-6 py-3 rounded-lg shadow-lg animate-bounce"
		notif.textContent = "🌈 RAINBOW MODE ACTIVATED!!! 🌈"
		document.body.appendChild(notif)

		setTimeout(() => {
			document.body.classList.remove("rainbow-mode")
			style.remove()
			notif.remove()
		}, 8000)
	}
}