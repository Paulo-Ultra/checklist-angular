import { Component, Inject } from '@angular/core';
import { CATEGORY_DATA } from '../category/category.component';
import { ChecklistItem } from '../_models/checklist_item';
import { DialogComponent } from '../dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';

export const CHECKLIST_DATA = [
  { guid: 'aaa-bbb-ccc-ddd', completed: false, description: 'Ir ao oftamologista',
  deadline: Date.now(), postDate: Date.now(), category: CATEGORY_DATA.find(
    x => x.name == 'Saúde' )},

    { guid: 'aaa-bbb-ccc-ddd', completed: true, description: 'Reunião com gerente regional',
    deadline: Date.now(), postDate: Date.now(), category: CATEGORY_DATA.find(
      x => x.name == 'Trabalho' )},
];


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {

  public dataSource = CHECKLIST_DATA;
  public displayedColumns: string[] = [
    'id', 'completed', 'description', 'deadline', 'postDate', 'category', 'actions'
  ];

  constructor(private dialog: MatDialog){}

  public createNewItem(){
    console.log('Novo Item do checklist clicado');
    this.dialog.open(ChecklistEditComponent, {
      disableClose: true, data: { actionName: 'Criar'},
    }).afterClosed().subscribe(resp => {
      console.log('Fechando modal da criação do item do checklist');
    });
  }

  public updateCompleteStatus(status: boolean){
    console.log(`Status do item do checklist atualizado para ${status}`);

  }
  public updateChecklistItem(checklistItem: ChecklistItem){
    console.log('Item do checklist atualizado');
    this.dialog.open(ChecklistEditComponent, {
      disableClose: true, data: { updatableChecklistItem: checklistItem, actionName: 'Editar'},
    }).afterClosed().subscribe(resp => {
      console.log('Fechando modal da edição do item do checklist');
    });
  }

  public deleteChecklisItem(chelist: ChecklistItem){
    console.log('Item do checklist excluído');
    this.dialog.open(DialogComponent, {
      disableClose: true, data: {dialogMsg: 'Você deseja realmente apagar esse item?',
      leftButtonLabel: 'Cancelar', rightButtonLabel: 'Ok'}
    }).afterClosed().subscribe(resp => {
      console.log('Janela modal confirmar apagar')
    });
  }
}
