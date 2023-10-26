import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Category } from '../_models/category';
import { ChecklistItem } from '../_models/checklist_item';
import { CategoryService } from '../service/category.service';

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
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      (resp: Category[]) => {
        this.categories = resp;
        this.createForm();
      });
  }

  private createForm(){
    this.checklistForm = this.formBuilder.group({
      completed: [this.checklistItem != null ? this.checklistItem.completed : false,
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
    this.checklistGroupFormDirective.resetForm();
  }

  public save(){
    this.formCloseEvent.emit(true);
  }

  public cancel(){
    this.formCloseEvent.emit(false);
  }

}
