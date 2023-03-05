import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ControlContainer, FormGroup } from '@angular/forms'
import { LANGS, POPULAR_LANGS } from '../../../meta'
import { INgxGoogleTranslateUiForm } from '../../form'

const CLOUD_CREDENTIALS_TOOLTIP_MSG = `
To get an API key:
    1. Go to the Google Cloud Console.
    2. Click the project drop-down and select or create the project for which you want to add an API key.
    3. Click the menu button and select APIs & Services > Credentials.
    4. On the Credentials page, click + Create Credentials > API key. The API key created dialog displays the newly created API key.
    5. Click Close. The new API key is listed on the Credentials page under API Keys.`

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
	hideKey = false

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
