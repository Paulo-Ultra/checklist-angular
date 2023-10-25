import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { ChecklistItem } from '../_models/checklist_item';
import { Category } from '../_models/category';
import { CATEGORY_DATA } from '../category/category.component';

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

  public categories: Category[] = CATEGORY_DATA;

  public checklistForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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
