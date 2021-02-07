import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleTranslationBodyModel } from '../models/google-translation-body.model';
import { GoogleTranslationService } from '../util/google-translation.service';
import { LANGS } from '../util/languages';

@Component({
  selector: 'lib-ng-google-translate-ui',
  templateUrl: './ng-google-translate-ui.component.html',
  styleUrls: ['./ng-google-translate-ui.component.scss'],
})
export class NgGoogleTranslateUiComponent {
  languages = LANGS;

  translations: { [key: string]: string } = {};

  multiTranslateForm = new FormGroup({
    apiKey: new FormControl('', Validators.required),
    sourceText: new FormControl('', Validators.required),
    targetLangs: new FormControl([], Validators.required),
  });

  constructor(private googleService: GoogleTranslationService) {}

  onSearch(): void {
    this.translations = {};

    this.multiTranslateForm
      .get('targetLangs')
      ?.value.forEach(async (targetLang: string) => {
        const body: GoogleTranslationBodyModel = {
          q: this.multiTranslateForm.get('sourceText')?.value,
          target: targetLang,
        };

        const translation = await this.googleService
          .getTranslations(this.multiTranslateForm.get('apiKey')?.value, body)
          .toPromise();

        this.translations[targetLang.toUpperCase()] =
          translation.translatedText;
      });
  }
}
