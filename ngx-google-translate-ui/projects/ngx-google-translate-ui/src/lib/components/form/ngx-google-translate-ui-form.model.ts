import { FormControl } from '@angular/forms'

export interface INgxGoogleTranslateUi {
	apiKey: string
	translationText: string
	targetLangs: string[]
	onlyPopularLangs: boolean
}

export type INgxGoogleTranslateUiForm = {
	[K in keyof INgxGoogleTranslateUi]: FormControl<INgxGoogleTranslateUi[K]>
}
