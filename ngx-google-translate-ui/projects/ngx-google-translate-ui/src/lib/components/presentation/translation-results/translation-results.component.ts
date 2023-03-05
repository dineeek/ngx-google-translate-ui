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
	translationResult: ITranslationResult[] = []

	constructor(private snackBar: MatSnackBar) {}

	openSnackBar(lang?: string): void {
		this.snackBar.open(
			lang
				? `Copied translation for ${lang} language.`
				: `Copied translation for all languages.`,
			'X',
			{
				horizontalPosition: 'left',
				verticalPosition: 'bottom',
				duration: 4000
			}
		)
	}

	onCopyAll(): string {
		return JSON.stringify(this.translationResult)
	}
}
