import { type GalleryItem } from "../gallery.ts"
import { getCdnUrl } from "../../utils/cdn-helper.ts"

export const Items: GalleryItem[] = [
	{
		id: "hnd-landing-1",
		title: "HND Landing",
		description: "slightly rough landing at Tokyo Haneda International Airport. not the best weather, but still a nice day with a glorious concrete jungle overview prior to landing :O",
		cdnUrl: getCdnUrl("v1752027293/hnd_landing_ht5hyx.mp4", "video"),
		mediaType: "video",
		category: "transport",
		country: "jp",
		city: "Tokyo",
		year: 2024,
		month: 7,
		tags: [],
		metadata: {
			camera: "Apple iPhone 13",
			lens: "13mm",
			settings: {
				aperture: "2.4"
			}
		}
	},
	{
		id: "ghibli-1",
		title: "Ghibli Museum",
		description: "",
		cdnUrl: getCdnUrl("v1752027779/IMG_2383_a24l0i.jpg"),
		mediaType: "photo",
		category: "photos",
		country: "jp",
		city: "Ghibli Museum, Mitaka, Tokyo",
		year: 2024,
		month: 7,
		tags: [],
		metadata: {
			camera: "Apple iPhone 13",
			lens: "13mm",
			settings: {
				aperture: "2.4",
				iso: 32,
				shutterSpeed: "1/99"
			}
		}
	},
	{
		id: "ghibli-2",
		title: "Robot Soldier @ Ghibli Museum",
		description: "",
		cdnUrl: getCdnUrl("v1752028283/IMG_2391_tdryjp.jpg"),
		mediaType: "photo",
		category: "photos",
		country: "jp",
		city: "Ghibli Museum, Mitaka, Tokyo",
		year: 2024,
		month: 7,
		tags: [],
		metadata: {
			camera: "Apple iPhone 13",
			lens: "13mm",
			settings: {
				aperture: "2.4",
				iso: 32,
				shutterSpeed: "1/181"
			}
		}
	},
]
