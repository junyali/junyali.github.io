export type MediaType = "photo" | "video"
export type Category = "photos" | "transport" | "food"

export interface GalleryItem {
	id: string
	title: string
	description: string
	cdnUrl: string
	mediaType: MediaType
	category: Category
	country: string
	year: number
	month?: number
	tags: string[]
}

export interface Country {
	code: string
	name: string
}

export const visitedCountries: Country[] = [
	{ code: "us", name: "United States" },
	{ code: "gb-eng", name: "England" },
	{ code: "gb-sct", name: "Scotland" },
	{ code: "gb-wls", name: "Wales" },
	{ code: "fr", name: "France" },
	{ code: "de", name: "Germany" },
	{ code: "be", name: "Belgium" },
	{ code: "at", name: "Austria" },
	{ code: "ch", name: "Switzerland" },
	{ code: "eg", name: "Egypt" },
	{ code: "sa", name: "Saudi Arabia" },
	{ code: "cn", name: "China" },
	{ code: "jp", name: "Japan" }
]
