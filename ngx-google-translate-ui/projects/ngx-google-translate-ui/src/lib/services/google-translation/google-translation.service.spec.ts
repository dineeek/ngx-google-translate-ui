import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GoogleServiceResponseMock } from 'assets/tests/mocks';
import { of } from 'rxjs';
import { GoogleTranslationBodyModel } from '../../models/google-translation.model';
import { GoogleTranslationService } from './google-translation.service';

describe('GoogleTranslationService', () => {
	let service: GoogleTranslationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		service = TestBed.inject(GoogleTranslationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have Cloud Translation API url', () => {
		expect(service.url).toEqual(
			'https://translation.googleapis.com/language/translate/v2?key='
		);
	});

	it('should fetch translations', () => {
		spyOn(service, 'getTranslations').and.returnValue(
			of(GoogleServiceResponseMock)
		);

		const body: GoogleTranslationBodyModel = {
			q: 'Hello World!',
			target: 'de'
		};

		service.getTranslations('ajsf214asd12', body).subscribe(response => {
			expect(response).toBeTruthy();
		});
	});
});
