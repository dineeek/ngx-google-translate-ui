import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { NgxGoogleTranslateUiForm } from './ngx-google-translate-ui-form.model'

@Injectable()
export class NgxGoogleTranslateUiFormService {
	private form!: FormGroup<NgxGoogleTranslateUiForm>

	constructor(private formBuilder: NonNullableFormBuilder) {}

	createFormGroup(): FormGroup<NgxGoogleTranslateUiForm> {
		this.form = this.formBuilder.group<NgxGoogleTranslateUiForm>({
			apiKey: this.formBuilder.control('', Validators.required),
			translationText: this.formBuilder.control('', Validators.required),
			targetLangs: this.formBuilder.control([], Validators.required),
			onlyPopularLangs: this.formBuilder.control(false)
		})

		return this.form
	}
}
