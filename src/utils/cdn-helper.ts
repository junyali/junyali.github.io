export const CLOUDINARY_CONFIG = {
	cloudName: "dygieay8w",
	baseUrl: "https://res.cloudinary.com"
}

export function getCdnUrl(path: string, mediaType: "photo" | "video" = "photo"): string {
	const resourceType = mediaType === "video" ? "video" : "image"
	return `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload/${path}`
}
