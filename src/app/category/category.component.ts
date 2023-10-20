import { Component } from '@angular/core';
import { Category } from '../_models/category';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

export const CATEGORY_DATA = [
  { name: 'Educação', guid: 'aaa-bbb-ccc-ddd' },
  { name: 'Saúde', guid: 'aaa-bbb-ccc-ddd' },
  { name: 'Trabalho', guid: 'aaa-bbb-ccc-ddd' },
  { name: 'Outros', guid: 'aaa-bbb-ccc-ddd' }
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(private dialog: MatDialog){}

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = CATEGORY_DATA;


  public editCategory(inputCategory: Category) {
    this.dialog.open(CategoryEditComponent, { disableClose: true, data: {
      editableCategory: inputCategory
    }}).afterClosed().subscribe(
      resp => {
        if(resp) {
          console.log('Categoria apagada com sucesso!');
        } else{
        console.log('Categoria não apagada!');
        }
      }
    )
  }


  public deleteCategory(category: Category) {
  this.dialog.open(DialogComponent, { disableClose: true, data: {
    dialogMsg: 'Você tem certeza que gostaria de apagar a categoria?',
     leftButtonLabel: 'Cancelar', rightButtonLabel: 'Ok'
  }}).afterClosed().subscribe(
    resp => {
      if(resp) {
        console.log('Categoria apagada com sucesso!');
      } else{
      console.log('Categoria não apagada!');
      }
    }
  )
}

  public createNewCategory(){
    console.log('create new category clicked');
  }
}
