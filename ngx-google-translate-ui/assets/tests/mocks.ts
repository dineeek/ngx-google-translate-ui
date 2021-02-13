import { GoogleTranslateDialogModel } from 'projects/ngx-google-translate-ui/src/public-api';

export const GoogleServiceResponseMock = {
	translatedText: 'Hallo Welt',
	detectedSourceLanguage: 'en'
};

export const MatDialogDataMock: GoogleTranslateDialogModel = {
	apiKey: 'jkaskjd215najsndkj14asn',
	translationText: 'Hello World!'
};

export const GoogleTranslationMock = {
	Croatian: 'Pozdrav svijete!',
	Deutsche: 'Hallo Welt!'
};
