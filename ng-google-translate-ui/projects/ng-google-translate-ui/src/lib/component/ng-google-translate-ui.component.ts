import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleTranslationBodyModel } from '../models/google-translation.model';
import { GoogleTranslationService } from '../util/google-translation.service';
import { LANGS } from '../util/languages';
import { CloudCredentialsMessage } from '../util/tooltips-messages';

@Component({
  selector: 'lib-ng-google-translate-ui',
  templateUrl: './ng-google-translate-ui.component.html',
  styleUrls: ['./ng-google-translate-ui.component.scss'],
})
export class NgGoogleTranslateUiComponent {
  languages = LANGS;

  cloudCredentialsTooltip = CloudCredentialsMessage;

  translations: { [key: string]: string } = {};

  multiTranslateForm = new FormGroup({
    apiKey: new FormControl('', Validators.required),
    sourceText: new FormControl('', Validators.required),
    targetLangs: new FormControl([], Validators.required),
  });

  constructor(
    private googleService: GoogleTranslationService,
    private snackBar: MatSnackBar
  ) {}

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

  onReset(): void {
    this.multiTranslateForm.get('sourceText')?.setValue('');
    this.multiTranslateForm.get('targetLangs')?.setValue([]);
  }

  onCloudCredentialsHelpClick(e: Event): void {
    e.stopPropagation();
    window.open('https://console.cloud.google.com/', 'parent');
  }

  openSnackBar(lang: string): void {
    this.snackBar.open(`Copied translation for ${lang} language!`, 'X', {
      duration: 4000,
    });
  }
}
