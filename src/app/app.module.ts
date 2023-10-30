import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryComponent } from './category/category.component';
import { ChecklistEditComponent } from './checklist-edit/checklist-edit.component';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { DialogComponent } from './dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    DialogComponent,
    CategoryEditComponent,
    CategoryFormComponent,
    ChecklistComponent,
    ChecklistEditComponent,
    ChecklistFormComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    /*{ provide: LOCALE_ID, useValue: 'pt-BR'}*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
