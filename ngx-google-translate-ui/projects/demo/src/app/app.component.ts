import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
	GoogleTranslateDialogModel,
	NgxGoogleTranslateUiComponent
} from 'ngx-google-translate-ui'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private dialog: MatDialog) {}

	openTranslationDialog() {
		const dialogConfig: GoogleTranslateDialogModel = {
			googleApiKey: 'asdfnasfn',
			translationText: 'My dialog translation'
		}
		this.dialog.open(NgxGoogleTranslateUiComponent, {
			data: dialogConfig,
			panelClass: 'custom-dialog-container'
		})
	}
}
