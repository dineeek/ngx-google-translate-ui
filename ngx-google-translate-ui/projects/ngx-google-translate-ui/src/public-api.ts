/*
 * Public API Surface of ngx-google-translate-ui
 */

export { NgxGoogleTranslateUiComponent } from './lib/components/container/ngx-google-translate-ui.component'
export { NgxGoogleTranslateUiModule } from './lib/ngx-google-translate-ui.module'

export {
	IGoogleTranslationResponse as GoogleTranslation,
	IGoogleTranslationRequest as GoogleTranslationBodyModel
} from './lib/models/google-translation.model'
export { GoogleTranslationService } from './lib/services/google-translation.service'

export { INgxGoogleTranslateUiDialogData as GoogleTranslateDialogModel } from './lib/models/google-translate-dialog.model'
