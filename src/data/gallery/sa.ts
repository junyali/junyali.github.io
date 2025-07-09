import { type GalleryItem } from "../gallery.ts"
import { getCdnUrl } from "../../utils/cdn-helper.ts"

export const Items: GalleryItem[] = [
	{
		id: "ruh-landing-1",
		title: "RUH Landing",
		description: "landing at Riyadh's King Khalid International Airport, photo was taken around 9:29pm local time.",
		cdnUrl: getCdnUrl("v1752021577/IMG_2133_hu21dv.jpg"),
		mediaType: "photo",
		category: "photos",
		country: "sa",
		city: "Riyadh",
		year: 2024,
		month: 7,
		tags: []
	},
	{
		id: "sa-desert-1",
		title: "Desert Landscape",
		description: "pretty cool view I got from the takeoff in Riyadh.",
		cdnUrl: getCdnUrl("v1752022687/IMG_3211_c4ydj3.jpg"),
		mediaType: "photo",
		category: "photos",
		country: "sa",
		city: "Riyadh",
		year: 2024,
		month: 7,
		tags: [],
		metadata: {
			camera: "Apple iPhone 13",
			lens: "26mm",
			settings: {
				aperture: "1.6",
				iso: 50,
				shutterSpeed: "1/1890"
			}
		}
	},
	{
		id: "sa-desert-2",
		title: "Desert Landscape",
		description: "more views from my takeoff!",
		cdnUrl: getCdnUrl("v1752023157/IMG_3216_r4qp9c.jpg"),
		mediaType: "photo",
		category: "photos",
		country: "sa",
		city: "Riyadh",
		year: 2024,
		month: 7,
		tags: [],
		metadata: {
			camera: "Apple iPhone 13",
			lens: "26mm",
			settings: {
				aperture: "1.6",
				iso: 50,
				shutterSpeed: "1/1957"
			}
		}
	},
	{
		id: "ruh-takeoff-1",
		title: "RUH Takeoff",
		description: "takeoff video from Riyadh's King Khalid Internation Airport, video was taken around 9:22am local time. i've genuinely never seen such barren environments, so this was a pretty amazing view",
		cdnUrl: getCdnUrl("v1752024889/ruh_takeoff_fh6juk.mp4", "video"),
		mediaType: "video",
		category: "transport",
		country: "sa",
		city: "Riyadh",
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
]
