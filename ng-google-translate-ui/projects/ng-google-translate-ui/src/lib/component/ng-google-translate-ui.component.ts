import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class NgGoogleTranslateUiComponent {
	languages = LANGS;
	cloudCredentialsTooltip = CloudCredentialsMessage;
	translations: { [key: string]: string } = {};
	emptyTranslations = true;

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
		private snackBar: MatSnackBar
	) {}

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

				this.translations[targetLang.toUpperCase()] =
					translation.translatedText;
			});

		this.emptyTranslations = false;
	}

	/**
	 * @returns void - Resets the input value in textarea and selected target languages.
	 */
	onReset(): void {
		this.multiTranslateForm.get('sourceText')?.setValue('');
		this.multiTranslateForm.get('targetLangs')?.setValue([]);
		this.translations = {};
		this.emptyTranslations = true;
	}

	/**
	 * @param  e - Event to stop propagation.
	 * @returns void - navigates user to Google Cloud Console in the new browser tab.
	 */
	onCloudCredentialsHelpClick(e: Event): void {
		e.stopPropagation();
		window.open('https://console.cloud.google.com/', 'parent');
	}

	/**
	 * @param  lang - Language code.
	 * @returns void - Shows the message to the user.
	 */
	openSnackBar(lang?: string): void {
		lang
			? this.snackBar.open(`Copied translation for ${lang} language!`, 'X', {
					duration: 5000
			  })
			: this.snackBar.open(`Copied translation for all languages!`, 'X', {
					duration: 5000
			  });
	}

	/**
	 * @returns string - JSON stringified fetched translations.
	 */
	onCopyAll(): string {
		return JSON.stringify(this.translations);
	}
}
