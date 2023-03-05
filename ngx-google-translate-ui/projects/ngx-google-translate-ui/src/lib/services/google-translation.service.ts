import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import {
	IGoogleTranslationRequest,
	IGoogleTranslationResponse
} from '../models'

const BASE_URL = 'https://translation.googleapis.com/language/translate/v2?key='

@Injectable({ providedIn: 'root' })
export class GoogleTranslationService {
	constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

	/**
	 * @param   apiKey - User's Google API key.
	 * @param   targetLang - Language code used in translation.
	 * @param   text - Text to translate.
	 *
	 * @returns Observable - Returns text translated into target language.
	 */
	getTranslation$(
		apiKey: string,
		targetLang: string,
		text: string,
		errorCallback?: () => Observable<any>
	): Observable<IGoogleTranslationResponse> {
		const requestBody: IGoogleTranslationRequest = {
			q: text,
			target: targetLang
		}

		return this.httpClient.post(`${BASE_URL}${apiKey}`, requestBody).pipe(
			map((response: any) => {
				return {
					translatedText: response.data.translations[0].translatedText,
					detectedSourceLanguage:
						response.data.translations[0].detectedSourceLanguage
				} as IGoogleTranslationResponse
			}),
			catchError((error: HttpErrorResponse) => {
				return errorCallback
					? errorCallback()
					: this.showErrorSnackbarMessage(error)
			})
		)
	}

	private showErrorSnackbarMessage(
		error: HttpErrorResponse
	): Observable<never> {
		this.snackBar.open(
			`Something went wrong on contacting Cloud Translation API!`,
			'X',
			{
				duration: 5000
			}
		)

		return throwError(() => error)
	}
}
