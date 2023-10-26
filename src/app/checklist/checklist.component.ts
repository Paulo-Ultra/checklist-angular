import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChecklistItem } from '../_models/checklist_item';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistService } from '../service/checklist.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {

  public dataSource: ChecklistItem[] = [];
  public displayedColumns: string[] = [
    'id', 'completed', 'description', 'deadline', 'postDate', 'category', 'actions'
  ];

  constructor(private dialog: MatDialog,
              private checklistService: ChecklistService,
              private snackBarService: SnackBarService){}
  ngOnInit() {
    this.checklistService.getAllChecklistItems().subscribe(
      (resp: ChecklistItem[]) => {
        this.dataSource = resp;
      });
  }

  public createNewItem(){
    console.log('Novo Item do checklist clicado');
    this.dialog.open(ChecklistEditComponent, {
      disableClose: true, data: { actionName: 'Criar'},
    }).afterClosed().subscribe(resp => {
      console.log('Fechando modal da criação do item do checklist');
      if (resp) {
        this.snackBarService.showSnackBar('Item do checklist criado com sucesso!', 'Ok');
      }
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
      if (resp) {
        this.snackBarService.showSnackBar('Item do checklist editado com sucesso!', 'Ok');
      }
    });
  }

  public deleteChecklisItem(chelist: ChecklistItem){
    console.log('Item do checklist excluído');
    this.dialog.open(DialogComponent, {
      disableClose: true, data: {dialogMsg: 'Você deseja realmente apagar esse item?',
      leftButtonLabe: 'Cancelar', rightButtonLabel: 'Ok'}
    }).afterClosed().subscribe(resp => {
      console.log('Janela modal confirmar apagar');
      if (resp) {
        this.snackBarService.showSnackBar('Item do checklist apagado com sucesso!', 'Ok');
      }
    });
  }
}
