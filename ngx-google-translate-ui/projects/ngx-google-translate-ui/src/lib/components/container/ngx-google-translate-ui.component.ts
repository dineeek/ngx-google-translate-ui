import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
	Optional
} from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { forkJoin, map, Observable, of, Subject, switchMap } from 'rxjs'
import { CLOUD_CREDENTIALS_TOOLTIP_MSG, LANGS, POPULAR_LANGS } from '../../meta'
import { INgxGoogleTranslateUiDialogData } from '../../models'
import { GoogleTranslationService } from '../../services/google-translation.service'
import { NgxGoogleTranslateUiFormService } from '../form'

export interface ITranslationResult {
	language: string
	translate: string
}

@Component({
	selector: 'lib-ngx-google-translate-ui',
	templateUrl: './ngx-google-translate-ui.component.html',
	styleUrls: ['./ngx-google-translate-ui.component.scss'],
	providers: [NgxGoogleTranslateUiFormService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxGoogleTranslateUiComponent implements OnInit {
	readonly ALL_LANGS = LANGS
	readonly POPULAR_LANGS = POPULAR_LANGS
	readonly CLOUD_CRED_TOOLTIP_MSG = CLOUD_CREDENTIALS_TOOLTIP_MSG

	translations$: Observable<ITranslationResult[] | undefined> | undefined
	formGroup = this.formService.createFormGroup()

	private search$ = new Subject<boolean>()

	originalOrder = (): number => {
		return 0
	}

	constructor(
		private formService: NgxGoogleTranslateUiFormService,
		private googleService: GoogleTranslationService,
		@Optional()
		@Inject(MAT_DIALOG_DATA)
		public dialogData: INgxGoogleTranslateUiDialogData
	) {}

	ngOnInit(): void {
		this.translations$ = this.setTranslationSearch$()

		if (!this.dialogData) {
			return
		}

		this.formGroup.patchValue({
			apiKey: this.dialogData.googleApiKey,
			translationText: this.dialogData.translationText
		})
	}

	onPopularLangsChange(): void {
		this.formGroup.controls.targetLangs.reset([])
	}

	/**
	 * @returns void - Fetches the translations from Cloud Translation API using the provided API key.
	 */
	onSearch(): void {
		this.search$.next(true)
	}

	/**
	 * @returns void - Resets the input value in textarea and selected target languages.
	 */
	onReset(): void {
		this.formGroup.patchValue({
			translationText: '',
			targetLangs: []
		})

		this.search$.next(false)
	}

	/**
	 * @param  e - Event to stop propagation.
	 * @returns void - navigates user to Google Cloud Console in the new browser tab.
	 */
	onCloudCredentialsHelpClick(e: Event): void {
		e.stopPropagation()
		window.open('https://console.cloud.google.com/', 'parent')
	}

	private setTranslationSearch$(): Observable<
		ITranslationResult[] | undefined
	> {
		return this.search$.pipe(
			switchMap(search => (search ? this.getTranslations$() : of(undefined)))
		)
	}

	private getTranslations$(): Observable<ITranslationResult[]> {
		const { apiKey, targetLangs, translationText } =
			this.formGroup.getRawValue()

		const translations$ = targetLangs.map(targetLang =>
			this.googleService
				.getTranslation$(apiKey, targetLang, translationText)
				.pipe(
					map(translation => {
						return {
							language: LANGS[targetLang.toLowerCase()],
							translate: translation.translatedText
						}
					})
				)
		)

		return forkJoin(translations$)
	}
}
