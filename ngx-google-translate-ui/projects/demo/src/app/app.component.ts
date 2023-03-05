import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { NgxGoogleTranslateUiComponent } from 'ngx-google-translate-ui'
import { INgxGoogleTranslateUiDialogData } from 'projects/ngx-google-translate-ui/src/public-api'

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
		this.dialog.open(NgxGoogleTranslateUiComponent, {
			data: dialogConfig,
			panelClass: 'custom-dialog-container'
		})
	}
}
