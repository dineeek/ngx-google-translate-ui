import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core'
import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick
} from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { By } from '@angular/platform-browser'

import { of } from 'rxjs'
import { NgxGoogleTranslateUiComponent } from './ngx-google-translate-ui.component'
import { TranslationResultsComponent } from './../translation-results/translation-results.component'
import { GoogleTranslationService } from '../../services'
import { GoogleTranslateDialogModel } from '../../models'

export const GoogleServiceResponseMock = {
	translatedText: 'Hallo Welt',
	detectedSourceLanguage: 'en'
}

export const MatDialogDataMock: GoogleTranslateDialogModel = {
	apiKey: 'jkaskjd215najsndkj14asn',
	translationText: 'Hello World!'
}

export const GoogleTranslationMock = {
	Croatian: 'Pozdrav svijete!',
	Deutsche: 'Hallo Welt!'
}

describe('NgxGoogleTranslateUiComponent', () => {
	let component: NgxGoogleTranslateUiComponent
	let fixture: ComponentFixture<NgxGoogleTranslateUiComponent>
	let debugElement: DebugElement
	let googleService: GoogleTranslationService

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxGoogleTranslateUiComponent],
			imports: [HttpClientTestingModule, MatIconModule, ReactiveFormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxGoogleTranslateUiComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
		debugElement = fixture.debugElement
	})

	afterEach(() => {
		fixture.destroy()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should have have title and labels', () => {
		const headerContent =
			debugElement.nativeElement.querySelector('mat-card-title').textContent
		const subheaderContent =
			debugElement.nativeElement.querySelector('mat-card-subtitle').textContent

		const apiKeyFieldContent = debugElement.query(By.css('#apiKey'))
			.nativeElement.textContent

		expect(headerContent).toContain('Translator')
		expect(subheaderContent).toContain('Cloud Translation API')
		expect(apiKeyFieldContent).toBeFalsy()
	})

	it('should reset inserted values', () => {
		const apiKey = debugElement.query(By.css('#apiKey')).nativeElement
		const textarea = debugElement.query(By.css('#transText')).nativeElement
		const dropdown = debugElement.query(By.css('#dropdown')).nativeElement

		expect(textarea.value).toBeFalsy()
		expect(textarea.value).toBeFalsy()
		expect(dropdown.value).toEqual([])

		apiKey.value = 'asdnahsfhasn2134njas'
		apiKey.dispatchEvent(new Event('input'))
		textarea.value = 'My translations'
		textarea.dispatchEvent(new Event('textarea'))
		dropdown.value = ['af', 'hr']
		dropdown.dispatchEvent(new Event('dropdown'))

		expect(apiKey.value).toContain('asdnahsfhasn2134njas')
		expect(textarea.value).toContain('My translations')
		expect(dropdown.value).toEqual(['af', 'hr'])

		const resetButton = debugElement.query(By.css('#reset')).nativeElement
		resetButton.click()

		expect(apiKey.value).toContain('asdnahsfhasn2134njas')
		expect(textarea.value).toBeFalsy()
		expect(dropdown.value).toEqual([])
	})

	it('should fetch translations', fakeAsync(() => {
		googleService = TestBed.inject(GoogleTranslationService)

		spyOn(googleService, 'getTranslations').and.returnValue(
			of(GoogleServiceResponseMock)
		)

		component.apiKey?.setValue('hgsdfa515as1f5as1f')
		component.translationText?.setValue('Hello world')
		component.targetLangs?.setValue(['de'])

		fixture.detectChanges()

		const apiKey = debugElement.query(By.css('#apiKey')).nativeElement
		const textarea = debugElement.query(By.css('#transText')).nativeElement
		const dropdown = debugElement.query(By.css('#dropdown')).nativeElement
		const searchButton = debugElement.query(By.css('#search')).nativeElement

		expect(apiKey.value).toContain('hgsdfa515as1f5as1f')
		expect(textarea.value).toContain('Hello world')
		expect(dropdown.value).toEqual(['de'])

		expect(component.multiTranslateForm.valid).toBeTruthy()
		expect(component.translations).toEqual({})

		searchButton.click()
		tick()

		expect(Object.keys(component.translations)).toContain('German')
		expect(Object.values(component.translations)).toContain('Hallo Welt')
	}))

	it('should send fetched translations to child component', fakeAsync(() => {
		googleService = TestBed.inject(GoogleTranslationService)

		spyOn(googleService, 'getTranslations').and.returnValue(
			of(GoogleServiceResponseMock)
		)

		component.apiKey?.setValue('hgsdfa515as1f5as1f')
		component.translationText?.setValue('Hello world')
		component.targetLangs?.setValue(['de'])

		fixture.detectChanges()

		const searchButton = debugElement.query(By.css('#search')).nativeElement

		searchButton.click()
		tick()

		expect(Object.keys(component.translations)).toContain('German')
		expect(Object.values(component.translations)).toContain('Hallo Welt')
		expect(component.emptyTranslationsFlag).toEqual(false)

		fixture.detectChanges()

		const transResultsComponent: TranslationResultsComponent =
			debugElement.query(
				By.css('lib-google-translation-results')
			).componentInstance

		expect(Object.keys(transResultsComponent.translations)).toContain('German')
		expect(Object.values(transResultsComponent.translations)).toContain(
			'Hallo Welt'
		)
	}))
})

describe('NgxGoogleTranslateUiComponent as a dialog', () => {
	let component: NgxGoogleTranslateUiComponent
	let fixture: ComponentFixture<NgxGoogleTranslateUiComponent>
	let debugElement: DebugElement
	let googleService: GoogleTranslationService

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxGoogleTranslateUiComponent],
			imports: [HttpClientTestingModule, MatIconModule, ReactiveFormsModule],
			providers: [{ provide: MAT_DIALOG_DATA, useValue: MatDialogDataMock }],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxGoogleTranslateUiComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
		debugElement = fixture.debugElement
	})

	afterEach(() => {
		fixture.destroy()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should have have title and labels', () => {
		const headerContent =
			debugElement.nativeElement.querySelector('mat-card-title').textContent
		const subheaderContent =
			debugElement.nativeElement.querySelector('mat-card-subtitle').textContent

		const apiKeyField = debugElement.query(By.css('#apiKey'))

		expect(headerContent).toContain('Translator')
		expect(subheaderContent).toContain('Cloud Translation API')
		expect(apiKeyField).toBeFalsy()
	})

	it('should have stored forwarded data when using as a dialog', () => {
		const apiKeyField = debugElement.query(By.css('#apiKey'))
		const textareaContent = debugElement.query(
			By.css('#transText')
		).nativeElement

		expect(apiKeyField).toBeFalsy()
		expect(textareaContent.value).toEqual(MatDialogDataMock.translationText)
	})

	it('should reset edited values', () => {
		const textInput = debugElement.query(By.css('#transText'))
		const dropdownInput = debugElement.query(By.css('#dropdown'))
		const textarea = textInput.nativeElement
		const dropdown = dropdownInput.nativeElement

		expect(textarea.value).toEqual(MatDialogDataMock.translationText)
		expect(dropdown.value).toEqual([])

		textarea.value = 'My new translation text'
		textarea.dispatchEvent(new Event('textarea'))
		dropdown.value = ['af', 'hr']
		dropdown.dispatchEvent(new Event('dropdown'))

		expect(textarea.value).toContain('My new translation text')
		expect(dropdown.value).toEqual(['af', 'hr'])

		const resetButton = debugElement.query(By.css('#reset')).nativeElement
		resetButton.click()

		expect(textarea.value).toBeFalsy()
		expect(dropdown.value).toEqual([])
	})

	it('should fetch translations', fakeAsync(() => {
		googleService = TestBed.inject(GoogleTranslationService)

		spyOn(googleService, 'getTranslations').and.returnValue(
			of(GoogleServiceResponseMock)
		)

		component.targetLangs?.setValue(['de'])

		fixture.detectChanges()

		const apiKey = debugElement.query(By.css('#apiKey'))
		const textarea = debugElement.query(By.css('#transText')).nativeElement
		const dropdown = debugElement.query(By.css('#dropdown')).nativeElement
		const searchButton = debugElement.query(By.css('#search')).nativeElement

		expect(apiKey).toBeFalsy()
		expect(component.apiKey?.value).toEqual(MatDialogDataMock.apiKey)
		expect(textarea.value).toContain(MatDialogDataMock.translationText)
		expect(dropdown.value).toEqual(['de'])

		expect(component.multiTranslateForm.valid).toBeTruthy()
		expect(component.translations).toEqual({})

		searchButton.click()
		tick()

		expect(Object.keys(component.translations)).toEqual(['German'])
		expect(Object.values(component.translations)).toEqual(['Hallo Welt'])
	}))
})
