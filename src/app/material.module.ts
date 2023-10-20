import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
   MatToolbarModule,
   MatButtonModule,
   MatIconModule,
   MatSidenavModule,
   MatListModule,
   MatDividerModule,
   MatCardModule,
   MatTableModule,
   MatDialogModule,
   MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: []
})
export class MaterialModule { }
