# ngx-google-translate-ui

An Angular Material UI for Google Translate（based on Cloud Translation API).

<p align="start">
    <a href="https://travis-ci.com/dineeek/ngx-google-translate-ui"><img src="https://travis-ci.com/dineeek/ngx-google-translate-ui.svg?token=YSspYgvLPX2y3Q9zRFxp&branch=main" /></a>
    <a href="https://www.npmjs.com/package/ngx-google-translate-ui"><img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/ngx-google-translate-ui.svg?style=flat-square"></a>
    <a href="https://www.npmjs.com/package/ngx-google-translate-ui"><img alt="npm version" src="https://img.shields.io/npm/v/ngx-google-translate-ui.svg?style=flat-square"></a>
</p>

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdineeek%2Fngx-google-translate-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdineeek%2Fngx-google-translate-ui?ref=badge_shield)

# Feature

- Text translation
- Auto language detection
- Multiple language translation
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com/) uses

# Install

```shell
npm install --save ngx-google-translate-ui
```

# Usage

To use this library you need to provide Google API key.

Process of translation is analog as in the real Google translator.

![Translator UI](https://github.com/dineeek/ngx-google-translate-ui/blob/main/ui.png?raw=true)

The output of translation can be separately copied to clipboard to manipulate or it can be coped as raw JSON data.

This library can be used in your project as MatDialog. Provide data as type of `GoogleTranslateDialogModel`. The required data is Google API key and optional translationText.
In that way the input field for a API key won't be visible and it will be remembered for fetching translations.

Without providing dialog configuration data, the API key input field will be visible.

```typescript
import {NgxGoogleTranslateUiComponent} from 'ngx-google-translate-ui';
...
openDialog() {
    const dialogConfig: GoogleTranslateDialogModel = {
        apiKey: 'YOUR_GOOGLE_API_KEY',
	    translationText?: 'My hand is broken!"; //Optional
    }

    const dialogRef = this.dialog.open(NgxGoogleTranslateUiComponent, {data: dialogConfig});
}
...
```

There is also exported service for fetching translation using POST method.

```typescript
import { GoogleTranslationService } from 'ngx-google-translate-ui';
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

Apache License

Copyright (c) 2021 Dino Klicek
