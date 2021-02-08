import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { NgxGoogleTranslateUiComponent } from './ngx-google-translate-ui.component';

describe('NgxGoogleTranslateUiComponent', () => {
	let component: NgxGoogleTranslateUiComponent;
	let fixture: ComponentFixture<NgxGoogleTranslateUiComponent>;
	let debugElement: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxGoogleTranslateUiComponent],
			imports: [HttpClientTestingModule, MatIconModule, ReactiveFormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxGoogleTranslateUiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		debugElement = fixture.debugElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have have title and labels', () => {
		const header = debugElement.nativeElement.querySelector('mat-card-title')
			.textContent;
		const subheader = debugElement.nativeElement.querySelector(
			'mat-card-subtitle'
		).textContent;

		const apiKey = debugElement.query(By.css('#apiKey')).nativeElement
			.textContent;

		expect(header).toContain('Translator');
		expect(subheader).toContain('Cloud Translation API');
		expect(apiKey).toBeFalsy();
	});

	it('should reset initial values', () => {
		const textInput = debugElement.query(By.css('#transText'));
		const dropdownInput = debugElement.query(By.css('#dropdown'));
		const textarea = textInput.nativeElement;
		const dropdown = dropdownInput.nativeElement;

		expect(textarea.value).toBeFalsy();
		expect(dropdown.value).toEqual([]);

		textarea.value = 'My translations';
		textarea.dispatchEvent(new Event('textarea'));
		dropdown.value = ['af', 'hr'];
		dropdown.dispatchEvent(new Event('dropdown'));

		expect(textarea.value).toContain('My translations');
		expect(dropdown.value).toEqual(['af', 'hr']);

		const resetButton = debugElement.query(By.css('#reset')).nativeElement;
		resetButton.click();

		expect(textarea.value).toBeFalsy();
		expect(dropdown.value).toEqual([]);
	});
});
