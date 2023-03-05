import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ControlContainer, FormGroup } from '@angular/forms'
import {
	LANGS,
	POPULAR_LANGS,
	CLOUD_CREDENTIALS_TOOLTIP_MSG
} from '../../../meta'
import { INgxGoogleTranslateUiForm } from '../../form'

@Component({
	selector: 'ngx-google-translation-fields',
	templateUrl: './translation-fields.component.html',
	styleUrls: ['./translation-fields.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationFieldsComponent {
	readonly ALL_LANGS = LANGS
	readonly POPULAR_LANGS = POPULAR_LANGS
	readonly CLOUD_CRED_TOOLTIP_MSG = CLOUD_CREDENTIALS_TOOLTIP_MSG

	formGroup!: FormGroup<INgxGoogleTranslateUiForm>

	constructor(private parentForm: ControlContainer) {}

	ngOnInit(): void {
		this.formGroup = this.parentForm
			.control as FormGroup<INgxGoogleTranslateUiForm>
	}

	originalOrder = (): number => {
		return 0
	}

	onCloudCredentialsHelpClick(e: Event): void {
		e.stopPropagation()
		window.open('https://console.cloud.google.com/', 'parent')
	}

	onPopularLangsChange(): void {
		this.formGroup.controls.targetLangs.reset([])
	}
}
