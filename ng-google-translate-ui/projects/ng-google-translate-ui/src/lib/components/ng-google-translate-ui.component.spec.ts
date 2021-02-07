import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgGoogleTranslateUiComponent } from './ng-google-translate-ui.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

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
