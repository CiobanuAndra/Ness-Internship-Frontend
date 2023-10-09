import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  exports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [MatIconRegistry],
})
export class MaterialModule {}
