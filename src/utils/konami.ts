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

		// tba
		// const easterEggs = []
		// const randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)]
		// randomEgg()

		setTimeout(() => {
			this.isActive = false
		}, 10000)
	}
}