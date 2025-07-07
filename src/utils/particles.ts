interface Particle {
	x: number
	y: number
	size: number
	speedX: number
	speedY: number
	colourClass: string
	element: HTMLDivElement
	angle: number
	angleSpeed: number
	amplitude: number
	rotation: number
	rotationSpeed: number
	lastUpdateTime: number
}

export function createParticlesBackground(): void {
	// making sure this stuff dont run on potato devices :skull:
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

	if (isReducedMotion || (isMobile && isLowPerformance)) {
		// could probably run on the first iPhone
		return
	}

	const particlesContainer = document.createElement("div")
	particlesContainer.className = "fixed inset-0 z-0 overflow-hidden pointer-events-none"
	document.body.prepend(particlesContainer)

	const colours = [
		{ class: "bg-ctp-mauve", opacity: "0.15" },
		{ class: "bg-ctp-pink", opacity: "0.15" },
		{ class: "bg-ctp-flamingo", opacity: "0.15" },
		{ class: "bg-ctp-rosewater", opacity: "0.15" },
		{ class: "bg-ctp-lavender", opacity: "0.15" },
		{ class: "bg-ctp-blue", opacity: "0.15" }
	]

	const maxParticles = isMobile ? 16 : 32
	const baseCount = Math.min(window.innerWidth / 64, maxParticles)
	const particleCount = isMobile || isReducedMotion ? Math.floor(baseCount / 2) : Math.floor(baseCount)

	const targetFPS = isMobile ? 15 : 30
	const frameInterval = 1000 / targetFPS

	const particles: Particle[] = []

	for (let i = 0; i < particleCount; i++) {
		const size = Math.random() * 100 + 50
		const x = Math.random() * window.innerWidth
		const y = Math.random() * window.innerHeight

		const element = document.createElement("div")
		const colourInfo = colours[Math.floor(Math.random() * colours.length)]

		element.className = `absolute ${colourInfo.class} particle`
		element.style.width = `${size}px`
		element.style.height = `${size}px`
		element.style.opacity = colourInfo.opacity
		element.style.filter = `blur(${Math.random() * 2 + 1}px)`
		element.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`
		element.style.willChange = "transform"
		element.style.borderRadius = `${Math.random() * 10}px`

		element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${Math.random() * 360}deg)`
		element.style.willChange = "transform"
		element.style.backfaceVisibility = "hidden"

		particlesContainer.appendChild(element)

		particles.push({
			x,
			y,
			size,
			speedX: (Math.random() - 0.5) * 0.1,
			speedY: (Math.random() - 0.5) * 0.1,
			colourClass: colourInfo.class,
			element,
			angle: Math.random() * Math.PI * 2,
			angleSpeed: (Math.random() * 0.001) + 0.00025,
			amplitude: Math.random() * 15 + 5,
			rotation: Math.random() * 360,
			rotationSpeed: (Math.random() - 0.5) * 0.05,
			lastUpdateTime: 0
		})
	}

	let lastTime = 0
	let frameCount = 0

	function animateParticles(timestamp: number) {
		if (timestamp - lastTime < frameInterval) {
			requestAnimationFrame(animateParticles)
			return
		}

		const deltaTime = timestamp - lastTime
		lastTime = timestamp
		frameCount++

		if (isMobile && frameCount % 2 !== 0) {
			requestAnimationFrame(animateParticles)
			return
		}

		const updates: { element: HTMLDivElement; transform: string }[] = []

		particles.forEach(particle => {
			if (timestamp - particle.lastUpdateTime < frameInterval * 2) {
				return
			}

			particle.angle += particle.angleSpeed * deltaTime
			particle.rotation += particle.rotationSpeed * deltaTime

			const offsetX = Math.sin(particle.angle) * particle.amplitude
			const offsetY = Math.cos(particle.angle * 0.7) * particle.amplitude

			particle.x += particle.speedX * deltaTime * 0.05
			particle.y += particle.speedY * deltaTime * 0.05

			// boundaries
			if (particle.x < -particle.size) particle.x = window.innerWidth + particle.size
			if (particle.x > window.innerWidth + particle.size) particle.x = -particle.size
			if (particle.y < -particle.size) particle.y = window.innerHeight + particle.size
			if (particle.y > window.innerHeight + particle.size) particle.y = -particle.size

			const finalX = particle.x + offsetX
			const finalY = particle.y + offsetY

			updates.push({
				element: particle.element,
				transform: `translate3d(${finalX}px, ${finalY}px, 0) rotate(${particle.rotation}deg)`
			})

			particle.element.style.transform = `translate(${finalX}px, ${finalY}px) rotate(${particle.rotation}deg)`
		})

		updates.forEach(({ element, transform}) => {
			element.style.transform = transform
		})

		requestAnimationFrame(animateParticles)
	}

	window.addEventListener("beforeunload", () => {
		particlesContainer.remove()
	})

	let isVisible = true
	document.addEventListener("visibilitychange", () => {
		isVisible = !document.hidden
		if (isVisible) {
			requestAnimationFrame(animateParticles)
		}
	})

	if (!document.hidden) {
		requestAnimationFrame(animateParticles)
	}

	// incase some smartie decides to yeah do that ig
	window.addEventListener("resize", () => {
		const width = window.innerWidth
		const height = window.innerHeight

		particles.forEach(particle => {
			if (particle.x > width) particle.x = width - particle.size
			if (particle.y > height) particle.y = height - particle.size
		})
	})

	requestAnimationFrame(animateParticles)
}