export interface GoogleTranslationBodyModel {
	q: string
	target: string
}

export interface GoogleTranslation {
	translatedText: string
	detectedSourceLanguage: string
}
