import { ClipboardModule } from '@angular/cdk/clipboard';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslationResultsComponent } from './translation-results.component';

describe('TranslationResultsComponent', () => {
	let component: TranslationResultsComponent;
	let fixture: ComponentFixture<TranslationResultsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TranslationResultsComponent],
			imports: [MatSnackBarModule, ClipboardModule, MatIconModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TranslationResultsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
