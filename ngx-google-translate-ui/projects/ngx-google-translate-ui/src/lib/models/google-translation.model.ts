export interface IGoogleTranslationRequest {
	q: string
	target: string
}

export interface IGoogleTranslationResponse {
	translatedText: string
	detectedSourceLanguage: string
}
