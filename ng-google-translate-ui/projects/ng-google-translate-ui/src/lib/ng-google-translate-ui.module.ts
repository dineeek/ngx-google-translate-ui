import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NgGoogleTranslateUiComponent } from './component/ng-google-translate-ui.component';

@NgModule({
  declarations: [NgGoogleTranslateUiComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
  ],
  exports: [NgGoogleTranslateUiComponent],
})
export class NgGoogleTranslateUiModule {}
