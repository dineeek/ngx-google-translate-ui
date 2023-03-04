import { Component, Inject, OnInit, Optional } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { LANGS, POPULAR_LANGS, CloudCredentialsMessage } from '../../meta'
import {
	GoogleTranslateDialogModel,
	GoogleTranslationBodyModel
} from '../../models'
import { GoogleTranslationService } from '../../services'

@Component({
	selector: 'lib-ngx-google-translate-ui',
	templateUrl: './ngx-google-translate-ui.component.html',
	styleUrls: ['./ngx-google-translate-ui.component.scss']
})
export class NgxGoogleTranslateUiComponent implements OnInit {
	readonly languages = LANGS
	readonly popularLanguages = POPULAR_LANGS

	cloudCredentialsTooltip = CloudCredentialsMessage

	translations: { [key: string]: string } = {}
	emptyTranslationsFlag = true // delete and look at translations

	multiTranslateForm = new FormGroup({
		apiKey: new FormControl('', Validators.required),
		translationText: new FormControl('', Validators.required),
		targetLangs: new FormControl([], Validators.required),
		popularLangsToggle: new FormControl(false)
	})

	get apiKey(): FormControl {
		return this.multiTranslateForm.get('apiKey') as FormControl
	}

	get translationText(): FormControl {
		return this.multiTranslateForm.get('translationText') as FormControl
	}

	get targetLangs(): FormControl {
		return this.multiTranslateForm.get('targetLangs') as FormControl
	}

	get popularLangsToggle(): FormControl {
		return this.multiTranslateForm.get('popularLangsToggle') as FormControl
	}

	originalOrder = (): number => {
		return 0
	}

	constructor(
		private googleService: GoogleTranslationService,
		@Optional()
		@Inject(MAT_DIALOG_DATA)
		public dialogData: GoogleTranslateDialogModel
	) {}

	ngOnInit(): void {
		if (!this.dialogData) {
			return
		}

		this.apiKey.setValue(this.dialogData.apiKey)

		this.dialogData.translationText
			? this.translationText.setValue(this.dialogData.translationText)
			: this.translationText.setValue('')
	}

	/**
	 * @returns void - Fetches the translations from Cloud Translation API using the provided API key.
	 */
	onSearch(): void {
		this.translations = {}

		this.targetLangs.value.forEach(async (targetLang: string) => {
			const body: GoogleTranslationBodyModel = {
				q: this.translationText.value,
				target: targetLang
			}
			const translation = await this.googleService
				.getTranslations(this.apiKey.value, body)
				.toPromise()

			if (translation) {
				this.translations[LANGS[targetLang.toLowerCase()]] =
					translation.translatedText

				this.emptyTranslationsFlag = false
			}
		})
	}

	/**
	 * @returns void - Resets the input value in textarea and selected target languages.
	 */
	onReset(): void {
		this.translationText.reset('')
		this.targetLangs.reset([])

		this.translations = {}
		this.emptyTranslationsFlag = true
	}

	/**
	 * @param  e - Event to stop propagation.
	 * @returns void - navigates user to Google Cloud Console in the new browser tab.
	 */
	onCloudCredentialsHelpClick(e: Event): void {
		e.stopPropagation()
		window.open('https://console.cloud.google.com/', 'parent')
	}
}
