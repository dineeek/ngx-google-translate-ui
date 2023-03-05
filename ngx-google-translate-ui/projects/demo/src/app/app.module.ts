import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { BrowserModule } from '@angular/platform-browser'
import { NgxGoogleTranslateUiModule } from 'ngx-google-translate-ui'

import { AppComponent } from './app.component'

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		MatButtonModule,
		NgxGoogleTranslateUiModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
