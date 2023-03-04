import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { GoogleTranslationBodyModel, GoogleTranslation } from '../../models'

@Injectable({ providedIn: 'root' })
export class GoogleTranslationService {
	url = 'https://translation.googleapis.com/language/translate/v2?key='

	constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

	/**
	 * @param   apiKey - User's Google API key.
	 * @param   transBody - Body to use in POST method.
	 * @returns Observable - Fetched translations as Observable of type GoogleTranslation.
	 */
	getTranslations(
		apiKey: string,
		transBody: GoogleTranslationBodyModel
	): Observable<GoogleTranslation> {
		return this.httpClient.post(`${this.url}${apiKey}`, transBody).pipe(
			map((response: any) => {
				return {
					translatedText: response.data.translations[0].translatedText,
					detectedSourceLanguage:
						response.data.translations[0].detectedSourceLanguage
				} as GoogleTranslation
			}),
			catchError(error => {
				this.snackBar.open(
					`Something went wrong on contacting Cloud Translation API!`,
					'X',
					{
						duration: 5000
					}
				)

				return throwError(error)
			})
		)
	}
}
