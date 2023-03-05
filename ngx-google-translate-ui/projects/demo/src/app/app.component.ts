import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
	INgxGoogleTranslateUiDialogData,
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
		const dialogConfig: INgxGoogleTranslateUiDialogData = {
			googleApiKey: 'asdfnasfn',
			translationText: 'My dialog translation'
		}
		const dialogRef = this.dialog.open(NgxGoogleTranslateUiComponent, {
			data: dialogConfig,
			panelClass: 'custom-dialog-container',
			minWidth: '600px'
		})
	}
}
