import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Category } from '../_models/category';
import { ChecklistItem } from '../_models/checklist_item';
import { CategoryService } from '../service/category.service';
import { SnackBarService } from '../service/snack-bar.service';
import { ChecklistService } from '../service/checklist.service';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent {

  @Input() public actionName = 'Editar';
  @Input() public checklistItem!: ChecklistItem;
  @Output() public formCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(FormGroupDirective) checklistGroupFormDirective!: FormGroupDirective;

  public categories: Category[] = [];

  public checklistForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private snackBarService: SnackBarService,
              private checklistService: ChecklistService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      (resp: Category[]) => {
        this.categories = resp;
        this.createForm();
      }, (error: any)=> {
        this.snackBarService.showSnackBar('Erro ao carregar categorias. Tente novamente!', 'OK');
      });
  }

  private createForm(){
    this.checklistForm = this.formBuilder.group({
      isCompleted: [this.checklistItem != null ? this.checklistItem.isCompleted : false,
        Validators.required],
      description: [this.checklistItem != null ? this.checklistItem.description : '',
        Validators.required],
      deadline: [this.checklistItem != null ? new Date(this.checklistItem.deadline) : new Date(),
        Validators.required],
      category: [this.checklistItem != null ? this.checklistItem.category : null,
        Validators.required],
    });
  }

  public clearForm(){
    this.checklistForm.reset();
  }

  public save(){
    if(this.checklistForm.valid){
      if(this.actionName == 'Editar'){

        const updateableItem = {
          guid: this.checklistItem.guid,
          isCompleted: this.checklistForm.value.isCompleted,
          description: this.checklistForm.value.description,
          deadline: this.checklistForm.value.deadline,
          category: this.checklistForm.value.category
        }

        this.checklistService.updateChecklistItems(updateableItem as ChecklistItem).subscribe(
          (resp: any) =>{
            this.snackBarService.showSnackBar('Item do checklist atualizado com sucesso!', 'OK');
            this.formCloseEvent.emit(true);
          }, (error: any) => {
            this.snackBarService.showSnackBar('Erro ao atualizar item do checklist. Tente novamente!', 'OK');
          });
      } else{
        this.checklistService.saveChecklistItem(this.checklistForm.value).subscribe(
          (resp: any) =>{
            this.snackBarService.showSnackBar('Item do checklist criado com sucesso!', 'OK');
            this.formCloseEvent.emit(true);
          }, (error: any) => {
            this.snackBarService.showSnackBar('Erro ao criar item do checklist. Tente novamente!', 'OK');
          });
      }
    }
  }

  public cancel(){
    this.formCloseEvent.emit(false);
  }

  public compareCategories(categoryOne: Category, categoryTwo: Category): boolean{
    return (categoryOne != null && categoryTwo != null) &&
            (categoryOne.guid === categoryTwo.guid) &&
            (categoryOne.name === categoryTwo.name);
  }
}
