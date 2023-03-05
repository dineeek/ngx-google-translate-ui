import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
	Optional
} from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { forkJoin, map, Observable, of, Subject, switchMap } from 'rxjs'
import { LANGS } from '../../meta'
import { INgxGoogleTranslateUiDialogData } from '../../models'
import { GoogleTranslationService } from '../../services/google-translation.service'
import { NgxGoogleTranslateUiFormService } from '../form'

export interface ITranslationResult {
	language: string
	translation: string
}

@Component({
	selector: 'ngx-google-translate-ui',
	templateUrl: './ngx-google-translate-ui.component.html',
	styleUrls: ['./ngx-google-translate-ui.component.scss'],
	providers: [NgxGoogleTranslateUiFormService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxGoogleTranslateUiComponent implements OnInit {
	translations$: Observable<ITranslationResult[] | undefined> | undefined
	formGroup = this.formService.createFormGroup()

	private search$ = new Subject<boolean>()

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

	onSearch(): void {
		this.search$.next(true)
	}

	onReset(): void {
		this.formGroup.patchValue({
			translationText: '',
			targetLangs: []
		})

		this.search$.next(false)
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
					map(result => {
						return {
							language: LANGS[targetLang.toLowerCase()],
							translation: result.translations?.[0]?.translatedText ?? ''
						}
					})
				)
		)

		return forkJoin(translations$)
	}
}
