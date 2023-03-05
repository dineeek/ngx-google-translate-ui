import { FormControl } from '@angular/forms'

export interface INgxGoogleTranslateUiForm {
	apiKey: FormControl<string>
	translationText: FormControl<string>
	targetLangs: FormControl<string[]>
	onlyPopularLangs: FormControl<boolean>
}
