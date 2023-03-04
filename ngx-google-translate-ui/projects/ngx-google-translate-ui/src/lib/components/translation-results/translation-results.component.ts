import {
	ChangeDetectionStrategy,
	Component,
	Input,
	ViewEncapsulation
} from '@angular/core'
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar'

@Component({
	selector: 'lib-google-translation-results',
	templateUrl: './translation-results.component.html',
	styleUrls: ['./translation-results.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationResultsComponent {
	@Input()
	translations: { [key: string]: string } = {}

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
