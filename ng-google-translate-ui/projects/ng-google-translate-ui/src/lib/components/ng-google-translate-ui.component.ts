import {
	Component,
	Inject,
	OnInit,
	Optional,
	ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleTranslateDialogModel } from '../models/google-translate-dialog.model';
import { GoogleTranslationBodyModel } from '../models/google-translation.model';
import { GoogleTranslationService } from '../util/google-translation.service';
import { LANGS } from '../util/languages';
import { CloudCredentialsMessage } from '../util/tooltips-messages';

// TODO readme, tests

@Component({
	selector: 'lib-ng-google-translate-ui',
	templateUrl: './ng-google-translate-ui.component.html',
	styleUrls: ['./ng-google-translate-ui.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NgGoogleTranslateUiComponent implements OnInit {
	languages = LANGS;
	cloudCredentialsTooltip = CloudCredentialsMessage;
	translations: { [key: string]: string } = {};
	areTranslationsEmpty = true;

	multiTranslateForm = new FormGroup({
		apiKey: new FormControl('', Validators.required),
		sourceText: new FormControl('', Validators.required),
		targetLangs: new FormControl([], Validators.required)
	});

	originalOrder = (): number => {
		return 0;
	};

	constructor(
		private googleService: GoogleTranslationService,
		@Optional()
		@Inject(MAT_DIALOG_DATA)
		public dialogData: GoogleTranslateDialogModel
	) {}

	ngOnInit(): void {
		if (this.dialogData) {
			this.multiTranslateForm.get('apiKey')?.setValue(this.dialogData.apiKey);

			this.dialogData.translationText
				? this.multiTranslateForm
						.get('sourceText')
						?.setValue(this.dialogData.translationText)
				: this.multiTranslateForm.get('sourceText')?.setValue('');
		}
	}

	/**
	 * @returns void - Fetches the translations from Cloud Translation API using the provided API key.
	 */
	onSearch(): void {
		this.translations = {};

		this.multiTranslateForm
			.get('targetLangs')
			?.value.forEach(async (targetLang: string) => {
				const body: GoogleTranslationBodyModel = {
					q: this.multiTranslateForm.get('sourceText')?.value,
					target: targetLang
				};

				const translation = await this.googleService
					.getTranslations(this.multiTranslateForm.get('apiKey')?.value, body)
					.toPromise();

				this.translations[targetLang.toLowerCase()] =
					translation.translatedText;

				this.areTranslationsEmpty = false;
			});
	}

	/**
	 * @returns void - Resets the input value in textarea and selected target languages.
	 */
	onReset(): void {
		this.multiTranslateForm.get('sourceText')?.setValue('');
		this.multiTranslateForm.get('targetLangs')?.setValue([]);
		this.translations = {};
		this.areTranslationsEmpty = true;
	}

	/**
	 * @param  e - Event to stop propagation.
	 * @returns void - navigates user to Google Cloud Console in the new browser tab.
	 */
	onCloudCredentialsHelpClick(e: Event): void {
		e.stopPropagation();
		window.open('https://console.cloud.google.com/', 'parent');
	}
}
