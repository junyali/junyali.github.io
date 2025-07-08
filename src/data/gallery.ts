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
