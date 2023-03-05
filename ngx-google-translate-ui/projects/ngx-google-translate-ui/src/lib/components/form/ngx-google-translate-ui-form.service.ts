import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { INgxGoogleTranslateUiForm } from './ngx-google-translate-ui-form.model'

@Injectable()
export class NgxGoogleTranslateUiFormService {
	private form!: FormGroup<INgxGoogleTranslateUiForm>

	constructor(private formBuilder: NonNullableFormBuilder) {}

	createFormGroup(): FormGroup<INgxGoogleTranslateUiForm> {
		this.form = this.formBuilder.group<INgxGoogleTranslateUiForm>({
			apiKey: this.formBuilder.control('', Validators.required),
			translationText: this.formBuilder.control('', Validators.required),
			targetLangs: this.formBuilder.control([], Validators.required),
			onlyPopularLangs: this.formBuilder.control(false)
		})

		return this.form
	}
}
