import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgGoogleTranslateUiComponent } from './ng-google-translate-ui.component';

describe('NgGoogleTranslateUiComponent', () => {
	let component: NgGoogleTranslateUiComponent;
	let fixture: ComponentFixture<NgGoogleTranslateUiComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgGoogleTranslateUiComponent],
			imports: [HttpClientTestingModule, MatIconModule, ReactiveFormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgGoogleTranslateUiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
