export interface IGoogleTranslationRequest {
	q: string | string[]
	target: string
}

export interface IGoogleTranslation {
	translatedText: string
	detectedSourceLanguage: string
}

export interface IGoogleTranslationsData {
	translations: IGoogleTranslation[]
}

export interface IGoogleTranslationResponse {
	data: IGoogleTranslationsData
}
