import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GoogleTranslation,
  GoogleTranslationBodyModel,
} from '../models/google-translation.model';

@Injectable({ providedIn: 'root' })
export class GoogleTranslationService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';

  constructor(private httpClient: HttpClient) {}

  /**
   * @param   apiKey - User's Google API key.
   * @param   transBody - Body to use in POST method.
   * @returns Observable - Fetched translations as Observable of type GoogleTranslation.
   */
  getTranslations(
    apiKey: string,
    transBody: GoogleTranslationBodyModel
  ): Observable<GoogleTranslation> {
    return this.httpClient.post(this.url + apiKey, transBody).pipe(
      map((response: any) => {
        return {
          translatedText: response.data.translations[0].translatedText,
          detectedSourceLanguage:
            response.data.translations[0].detectedSourceLanguage,
        } as GoogleTranslation;
      })
    );
  }
}
