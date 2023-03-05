import { ClipboardModule } from '@angular/cdk/clipboard'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSliderModule } from '@angular/material/slider'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { NgxGoogleTranslateUiComponent } from './components/container/ngx-google-translate-ui.component'
import { TranslationResultsComponent } from './components/presentation/translation-results/translation-results.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

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
		NoopAnimationsModule,
		ClipboardModule
	],
	exports: [NgxGoogleTranslateUiComponent]
})
export class NgxGoogleTranslateUiModule {}
