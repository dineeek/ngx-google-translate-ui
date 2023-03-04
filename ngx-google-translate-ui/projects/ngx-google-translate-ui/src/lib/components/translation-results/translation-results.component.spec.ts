import { ClipboardModule } from '@angular/cdk/clipboard'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { TranslationResultsComponent } from './translation-results.component'

export const GoogleTranslationMock = {
	Croatian: 'Pozdrav svijete!',
	Deutsche: 'Hallo Welt!'
}

describe('TranslationResultsComponent', () => {
	let component: TranslationResultsComponent
	let fixture: ComponentFixture<TranslationResultsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TranslationResultsComponent],
			imports: [
				MatSnackBarModule,
				ClipboardModule,
				MatIconModule,
				MatListModule
			]
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(TranslationResultsComponent)
		component = fixture.componentInstance
		component.translations = GoogleTranslationMock
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should open snackbar', () => {
		spyOn(component, 'openSnackBar')
		component.openSnackBar('de')

		expect(component.openSnackBar).toHaveBeenCalledTimes(1)
		expect(component.openSnackBar).toHaveBeenCalledWith('de')
	})

	it('should stringify forwarded translations', () => {
		const translationJSON = component.onCopyAll()

		expect(translationJSON).toEqual(JSON.stringify(GoogleTranslationMock))
	})
})
