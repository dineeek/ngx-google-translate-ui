import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxGoogleTranslateUiComponent } from './ngx-google-translate-ui.component';

describe('NgxGoogleTranslateUiComponent', () => {
	let component: NgxGoogleTranslateUiComponent;
	let fixture: ComponentFixture<NgxGoogleTranslateUiComponent>;

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
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
