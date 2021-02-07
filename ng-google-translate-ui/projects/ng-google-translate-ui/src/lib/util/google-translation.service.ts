import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GoogleTranslation,
  GoogleTranslationBodyModel,
} from '../models/google-translation.model';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GoogleTranslationService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';

  constructor(private httpClient: HttpClient) {}

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
