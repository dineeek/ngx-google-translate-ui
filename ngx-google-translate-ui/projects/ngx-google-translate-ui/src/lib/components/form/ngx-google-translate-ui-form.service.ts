import { Injectable, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { INgxGoogleTranslateUiForm } from './ngx-google-translate-ui-form.model'

@Injectable()
export class NgxGoogleTranslateUiFormService {
	private readonly formBuilder = inject(NonNullableFormBuilder)

	private readonly form = this.formBuilder.group<INgxGoogleTranslateUiForm>({
		apiKey: this.formBuilder.control('', Validators.required),
		translationText: this.formBuilder.control('', Validators.required),
		targetLangs: this.formBuilder.control([], Validators.required),
		onlyPopularLangs: this.formBuilder.control(false)
	})

	get formGroup(): FormGroup<INgxGoogleTranslateUiForm> {
		return this.form
	}
}
