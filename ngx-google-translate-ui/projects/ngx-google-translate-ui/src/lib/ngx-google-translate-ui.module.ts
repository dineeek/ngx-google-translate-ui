import { ClipboardModule } from '@angular/cdk/clipboard'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button'
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input'
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list'
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select'
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar'
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip'
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog'
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider'
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle'
import { NgxGoogleTranslateUiComponent } from './components/container/ngx-google-translate-ui.component'
import { TranslationResultsComponent } from './components/translation-results/translation-results.component'

@NgModule({
	declarations: [NgxGoogleTranslateUiComponent, TranslationResultsComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatListModule,
		MatDividerModule,
		MatButtonModule,
		MatCardModule,
		MatTooltipModule,
		MatIconModule,
		MatSnackBarModule,
		MatDialogModule,
		MatSliderModule,
		MatSlideToggleModule,
		ClipboardModule
	],
	exports: [NgxGoogleTranslateUiComponent]
})
export class NgxGoogleTranslateUiModule {}
