import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Category } from '../_models/category';
import { CategoryService } from '../service/category.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  @Input() public actionName = 'Editar';

  public categoryForm!: FormGroup;

  @Output() closeModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() public editableCategory!: Category;


  @ViewChild('categoryFormDirective') public categoryFormDirective!: FormGroupDirective;

  public isFormReady = false;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private snackBarService: SnackBarService){}

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [this.editableCategory != null ? this.editableCategory.name : '', Validators.required],
    });
  }

  public cancel(){
    this.closeModalEventEmitter.emit(true);
  }

  public save(){


    if((this.categoryForm.valid)){
      if(this.actionName === 'Editar'){

        var updatedCategory = {
          guid: this.editableCategory.guid,
          name: this.categoryForm.value.name
        }
          this.categoryService.updateCategory(updatedCategory).subscribe(
            (resp: any) => {
              this.closeModalEventEmitter.emit(true);
            }, (err: any) =>{
              this.snackBarService.showSnackBar('Não foi possível atualizar a categoria. Tente novamente!', 'Ok');
            });
      }else{
        this.categoryService.saveCategory(this.categoryForm.value).subscribe(
          (resp: any) => {
            this.closeModalEventEmitter.emit(true);
          }, (err: any) =>{
            this.snackBarService.showSnackBar('Não foi possível criar uma nova categoria. Tente novamente!', 'Ok');
          });
      }
    }
  }

  public clearForm(){
    this.categoryForm.reset();
    this.categoryFormDirective.resetForm();
  }
}
