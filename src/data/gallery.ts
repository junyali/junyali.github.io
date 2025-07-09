import { Items as atItems } from "./gallery/at.ts"
import { Items as beItems } from "./gallery/be.ts"
import { Items as cnItems } from "./gallery/cn.ts"
import { Items as egItems } from "./gallery/eg.ts"
import { Items as engItems } from "./gallery/gb-eng.ts"
import { Items as frItems } from "./gallery/fr.ts"
import { Items as deItems } from "./gallery/de.ts"
import { Items as jpItems } from "./gallery/jp.ts"
import { Items as saItems } from "./gallery/sa.ts"
import { Items as sctItems } from "./gallery/gb-sct.ts"
import { Items as chItems } from "./gallery/ch.ts"
import { Items as usItems } from "./gallery/us.ts"
import { Items as wlsItems } from "./gallery/gb-wls.ts"

export type MediaType = "photo" | "video"
export type Category = "photos" | "transport" | "food"

export interface CameraMetadata {
	camera?: string
	lens?: string
	settings?: {
		aperture?: string
		shutterSpeed?: string
		iso?: number
		focalLength?: string
	}
	location?: {
		coordinates?: { lat: number; lng: number }
		altitude?: string
	}
}

export interface GalleryItem {
	id: string
	title: string
	description: string
	cdnUrl: string
	mediaType: MediaType
	category: Category
	country: string
	city?: string
	year: number
	month?: number
	tags: string[]
	metadata?: CameraMetadata
}

export interface Country {
	code: string
	name: string
}

export const visitedCountries: Country[] = [
	{ code: "at", name: "Austria" },
	{ code: "be", name: "Belgium" },
	{ code: "cn", name: "China" },
	{ code: "eg", name: "Egypt" },
	{ code: "gb-eng", name: "England" },
	{ code: "fr", name: "France" },
	{ code: "de", name: "Germany" },
	{ code: "jp", name: "Japan" },
	{ code: "sa", name: "Saudi Arabia" },
	{ code: "gb-sct", name: "Scotland" },
	{ code: "ch", name: "Switzerland" },
	{ code: "us", name: "United States" },
	{ code: "gb-wls", name: "Wales" },
]

export const categories: { id: Category; name: string; icon: string; description: string }[] = [
	{
		id: "photos",
		name: "Photos",
		icon: "fas fa-camera-retro",
		description: "generic stuff"
	},
	{
		id: "transport",
		name: "Transport",
		icon: "fas fa-plane",
		description: "planes and trains! takeoffs + landings included :3"
	},
	{
		id: "food",
		name: "Food",
		icon: "fas fa-utensils",
		description: "NOM NOM!!"
	}
]

export const galleryItems: GalleryItem[] = [
	...atItems,
	...beItems,
	...cnItems,
	...egItems,
	...engItems,
	...frItems,
	...deItems,
	...jpItems,
    ...saItems,
	...sctItems,
	...chItems,
	...usItems,
	...wlsItems,
]
