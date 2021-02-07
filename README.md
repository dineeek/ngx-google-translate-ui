# ng-google-translate-ui

An Angular Material UI for Google Translate（based on Cloud Translation API).

# Feature

- Text translation
- Auto language detection
- Multiple language translation
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com/) uses

# Install

```shell
npm install --save ng-google-translate-ui
```

# Usage

To use this library you need to provide Google API key.

Process of translation is analog as in the real Google translator.

![Translator UI](https://github.com/dineeek/ng-google-translate-ui/blob/dev/ui.png?raw=true)

The output of translation can be separately copied to clipboard to manipulate or it can be coped as raw JSON data.

This library can be used in your project as MatDialog.

```typescript
import {NgGoogleTranslateUiComponent} from 'ng-google-translate-ui';
...
openDialog() {
    const dialogRef = this.dialog.open(NgGoogleTranslateUiComponent);
}
...
```

There is also exported service for fetching translation using POST method.

```typescript
import { GoogleTranslationService } from 'ng-google-translate-ui';
...
constructor(private googleService: GoogleTranslationService){

}

const body: GoogleTranslationBodyModel {
    q: 'Vehicle',
    target: 'de'
}

this.googleService.getTranslations('your_api_key', body); // returns Observable of GoogleTranslation (translatedText and detectedSourceLanguage)
...
```

# License

MIT License

Copyright (c) 2021 Dino Klicek
