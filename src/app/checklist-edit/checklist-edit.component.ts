import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ChecklistItem } from '../_models/checklist_item';

@Component({
  selector: 'app-checklist-edit',
  templateUrl: './checklist-edit.component.html',
  styleUrls: ['./checklist-edit.component.css']
})
export class ChecklistEditComponent {

  public actionName = 'Editar';
  public checklistItem!: ChecklistItem;

  constructor(public modalRef: MatDialogRef<ChecklistEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      if(data.updatableChecklistItem != null){
        this.checklistItem = data.updatableChecklistItem;
      }

      if(data.actionName != null){
        this.actionName = data.actionName;
      }
     }

  public closeForm($event: any){
    this.modalRef.close($event);
  }

}
