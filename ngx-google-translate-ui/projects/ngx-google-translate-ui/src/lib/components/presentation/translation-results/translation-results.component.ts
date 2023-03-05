import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ITranslationResult } from '../../container/ngx-google-translate-ui.component'

@Component({
	selector: 'ngx-google-translation-results',
	templateUrl: './translation-results.component.html',
	styleUrls: ['./translation-results.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationResultsComponent {
	@Input()
	translations: ITranslationResult[] = []

	constructor(private snackBar: MatSnackBar) {}

	/**
	 * @param  lang - Language code.
	 * @returns void - Shows the message to the user.
	 */
	openSnackBar(lang?: string): void {
		this.snackBar.open(
			lang
				? `Copied translation for all languages!`
				: `Copied translation for all languages!`,
			'X',
			{
				duration: 5000
			}
		)
	}

	/**
	 * @returns string - JSON stringified fetched translations.
	 */
	onCopyAll(): string {
		return JSON.stringify(this.translations)
	}
}
