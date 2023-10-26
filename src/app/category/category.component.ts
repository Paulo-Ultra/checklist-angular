import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Category } from '../_models/category';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryService } from '../service/category.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = [];

  constructor(private dialog: MatDialog,
              private categoryService: CategoryService,
              private snackBarService: SnackBarService){}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      (resp: Category[]) => {
        this.dataSource = resp;
      });
    }

  public editCategory(inputCategory: Category) {
    this.dialog.open(CategoryEditComponent, { disableClose: true, data: {
      editableCategory: inputCategory
    }}).afterClosed().subscribe( resp => {
        console.log('Modal Editar Fechada');
        if (resp) {
          this.snackBarService.showSnackBar('Categoria editada com sucesso!', 'Ok');
        }
      });
  }

  public deleteCategory(category: Category) {
  this.dialog.open(DialogComponent, { disableClose: true, data: {
    dialogMsg: 'Você tem certeza que gostaria de apagar a categoria?',
     leftButtonLabel: 'Cancelar', rightButtonLabel: 'Ok'
  }}).afterClosed().subscribe(resp => {
    console.log('Modal Apagar Fechada');
    if (resp) {
      this.snackBarService.showSnackBar('Categoria apagada com sucesso!', 'Ok');
    }

  });
}

  public createNewCategory(){
    console.log('create new category clicked');

    this.dialog.open(CategoryEditComponent, { disableClose: true, data: {actionName: 'Criar'}
  }).afterClosed().subscribe( resp => {
        console.log('Modal Criar Fechada');
        if (resp) {
          this.snackBarService.showSnackBar('Categoria criada com sucesso!', 'Ok');
        }
      });
  }
}
