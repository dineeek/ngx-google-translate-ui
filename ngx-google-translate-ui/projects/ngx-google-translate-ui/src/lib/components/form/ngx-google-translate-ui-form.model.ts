import { FormControl } from '@angular/forms'

export interface NgxGoogleTranslateUiForm {
	apiKey: FormControl<string>
	translationText: FormControl<string>
	targetLangs: FormControl<string[]>
	onlyPopularLangs: FormControl<boolean>
}
