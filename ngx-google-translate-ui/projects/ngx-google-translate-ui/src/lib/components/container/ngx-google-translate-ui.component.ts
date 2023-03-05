import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
	Optional
} from '@angular/core'
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { forkJoin, map, Observable, Subject, switchMap, take } from 'rxjs'
import { LANGS, POPULAR_LANGS, CLOUD_CREDENTIALS_TOOLTIP_MSG } from '../../meta'
import {
	INgxGoogleTranslateUiDialogData,
	IGoogleTranslationRequest
} from '../../models'
import { GoogleTranslationService } from '../../services/google-translation.service'

export interface NgxGoogleTranslateUiForm {
	apiKey: FormControl<string>
	translationText: FormControl<string>
	targetLangs: FormControl<string[]>
	onlyPopularLangs: FormControl<boolean>
}

export interface ITranslationResult {
	language: string
	translate: string
}

@Component({
	selector: 'lib-ngx-google-translate-ui',
	templateUrl: './ngx-google-translate-ui.component.html',
	styleUrls: ['./ngx-google-translate-ui.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxGoogleTranslateUiComponent implements OnInit {
	readonly ALL_LANGS = LANGS
	readonly POPULAR_LANGS = POPULAR_LANGS
	readonly CLOUD_CRED_TOOLTIP_MSG = CLOUD_CREDENTIALS_TOOLTIP_MSG

	translations$: Observable<ITranslationResult[]> | undefined

	formGroup = this.formBuilder.group<NgxGoogleTranslateUiForm>({
		apiKey: this.formBuilder.control('', Validators.required),
		translationText: this.formBuilder.control('', Validators.required),
		targetLangs: this.formBuilder.control([], Validators.required),
		onlyPopularLangs: this.formBuilder.control(false)
	})

	private search$ = new Subject<void>()

	get apiKey(): FormControl<string> {
		return this.formGroup.controls.apiKey
	}

	get translationText(): FormControl<string> {
		return this.formGroup.controls.translationText
	}

	get targetLangs(): FormControl<string[]> {
		return this.formGroup.controls.targetLangs
	}

	get onlyPopularLangs(): FormControl<boolean> {
		return this.formGroup.controls.onlyPopularLangs
	}

	originalOrder = (): number => {
		return 0
	}

	constructor(
		private formBuilder: NonNullableFormBuilder,
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

		this.apiKey.setValue(this.dialogData?.apiKey ?? '')
		this.translationText.setValue(this.dialogData?.translationText ?? '')
	}

	/**
	 * @returns void - Fetches the translations from Cloud Translation API using the provided API key.
	 */
	onSearch(): void {
		this.search$.next()
	}

	/**
	 * @returns void - Resets the input value in textarea and selected target languages.
	 */
	onReset(): void {
		this.translationText.reset('')
		this.targetLangs.reset([])
		//this.translations$.next([]) - TODO
	}

	/**
	 * @param  e - Event to stop propagation.
	 * @returns void - navigates user to Google Cloud Console in the new browser tab.
	 */
	onCloudCredentialsHelpClick(e: Event): void {
		e.stopPropagation()
		window.open('https://console.cloud.google.com/', 'parent')
	}

	private setTranslationSearch$(): Observable<ITranslationResult[]> {
		return this.search$.pipe(
			switchMap(() =>
				this.getTranslations$(
					this.apiKey.value,
					this.targetLangs.value,
					this.translationText.value
				)
			)
		)
	}

	private getTranslations$(
		apiKey: string,
		targetLangs: string[],
		text: string
	): Observable<ITranslationResult[]> {
		const translations$ = targetLangs.map(targetLang =>
			this.googleService.getTranslation$(apiKey, targetLang, text).pipe(
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
