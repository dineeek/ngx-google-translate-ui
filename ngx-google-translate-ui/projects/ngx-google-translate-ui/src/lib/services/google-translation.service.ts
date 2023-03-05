import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import {
	IGoogleTranslationRequest,
	IGoogleTranslationResponse,
	IGoogleTranslationsData
} from '../models'

const GOOGLE_TRANSLATION_URL =
	'https://translation.googleapis.com/language/translate/v2?key='

@Injectable({ providedIn: 'root' })
export class GoogleTranslationService {
	constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

	/**
	 * @param   apiKey - User's Google API key.
	 * @param   targetLang - Language code used in translation - (ISO-639 codes).
	 * @param   text - Text to translate - one or multiple strings.
	 * @param   errorCallback - Optional, custom error callback function. Defaulted to snackbar message and rethrow error.
	 *
	 *
	 * @returns Observable - Returns texts translated into target language.
	 */
	getTranslation$(
		apiKey: string,
		targetLang: string,
		text: string | string[],
		errorCallback?: () => Observable<any>
	): Observable<IGoogleTranslationsData> {
		const requestBody: IGoogleTranslationRequest = {
			q: text,
			target: targetLang
		}

		return this.httpClient
			.post<IGoogleTranslationResponse>(
				`${GOOGLE_TRANSLATION_URL}${apiKey}`,
				requestBody
			)
			.pipe(
				map((response: IGoogleTranslationResponse) => response.data),
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
