# ngx-google-translate-ui

Angular Material UI library for Google Translate based on Cloud Translation API.

<p align="start">
    <a href="https://travis-ci.com/dineeek/ngx-google-translate-ui"><img src="https://travis-ci.com/dineeek/ngx-google-translate-ui.svg?token=YSspYgvLPX2y3Q9zRFxp&branch=main" /></a>
    <a href="https://www.npmjs.com/package/ngx-google-translate-ui"><img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/ngx-google-translate-ui.svg?style=flat-square"></a>
    <a href="https://www.npmjs.com/package/ngx-google-translate-ui"><img alt="npm version" src="https://img.shields.io/npm/v/ngx-google-translate-ui.svg?style=flat-square"></a>
</p>

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdineeek%2Fngx-google-translate-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdineeek%2Fngx-google-translate-ui?ref=badge_shield)

# Features

- Text translation
- Auto language detection
- Multiple language translation
- Fast and reliable – uses the Google translate servers
- Copy translation result copied to clipboard per language or
- Copy all translations to clipboard as raw JSON data

**[View live demo on StackBlitz](https://ngx-google-translate-ui.stackblitz.io)**

<p align="center">
  <img src="https://github.com/dineeek/ngx-google-translate-ui/blob/main/assets/ngx-google-translate-ui.png" alt="Google translate" />
</p>

# Install

```shell

npm install ngx-google-translate-ui

```

# Usage

<b>Google Translation API key is required to use this library.</b>

The translation process is analogous to Google Translate.

**[Google cloud console](https://console.cloud.google.com)**

## Standalone component

```html
<ngx-google-translate-ui></ngx-google-translate-ui>
```

Library can be used as an standalone component without requiring any input
values.

## Dialog component

This library can be used as a dialog component.

Use `INgxGoogleTranslateUiDialogData` interface to provide initial dialog data.

```typescript

import { NgxGoogleTranslateUiComponent } from 'ngx-google-translate-ui';

openDialog () {
  const dialogConfig: INgxGoogleTranslateUiDialogData = {
    googleApiKey: '<YOUR_GOOGLE_API_KEY>',
    translationText: 'How you doin?'
  };

  const dialogRef = this.dialog.open(NgxGoogleTranslateUiComponent, {
			data: dialogConfig,
			minWidth: '600px'
	})
}

```

## Google translation service

Library exports `GoogleTranslationService` so it can be used separately from
components.

The `getTranslation$` method is used to fetch translations. It requires three
parameters:

- apiKey - User's Google API key.
- targetLang - Language code used in translation - ISO-639 codes.
- text - Text to translate - one or multiple strings.

```typescript

import { GoogleTranslationService } from 'ngx-google-translate-ui';

constructor (private googleTranslationService: GoogleTranslationService){}

this.googleTranslationService.getTranslations$(
			'<YOUR_GOOGLE_API_KEY>',
			'en',
			['Whats up?', 'Nothing much!']
)

```

## Exposed resources

Following resources can be imported from library:

- NgxGoogleTranslateUiModule
  - NgxGoogleTranslateUiComponent
  - INgxGoogleTranslateUiDialogData
- GoogleTranslationService
  - IGoogleTranslationsData & IGoogleTranslation

# Contributing

Contributions are welcome!

# License

Apache License

Copyright (c) 2023 Dino Klicek
