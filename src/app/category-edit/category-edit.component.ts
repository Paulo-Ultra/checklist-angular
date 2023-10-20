import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../_models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {

public editableCategory!: Category;
public actionName: string = 'Editar';

  constructor(private dialogRef: MatDialogRef<CategoryEditComponent>,
              @Inject(MAT_DIALOG_DATA) dialogData: any){

      if(dialogData.editableCategory != null) {
        this.editableCategory = dialogData.editableCategory;
      }
      if(dialogData.actionName != null) {
        this.actionName = dialogData.actionName;
      }
  }

  public closeModalWindow($event: any){
    if($event) this.dialogRef.close();
  }
}
