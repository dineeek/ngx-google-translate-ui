import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LANGS } from '../../util/languages';

@Component({
	selector: 'lib-google-translation-results',
	templateUrl: './translation-results.component.html',
	styleUrls: ['./translation-results.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TranslationResultsComponent {
	@Input()
	translations: { [key: string]: string } = {};
	languages = LANGS;

	constructor(private snackBar: MatSnackBar) {}

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
