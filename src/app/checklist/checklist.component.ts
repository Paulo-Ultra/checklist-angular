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
    'id', 'isCompleted', 'description', 'deadline', 'postDate', 'category', 'actions'
  ];

  constructor(private dialog: MatDialog,
              private checklistService: ChecklistService,
              private snackBarService: SnackBarService){}
  ngOnInit() {
    this.loadAllChecklistItems();
  }

  private loadAllChecklistItems(){
    this.checklistService.getAllChecklistItems().subscribe(
      (resp: ChecklistItem[]) => {
        this.dataSource = resp;
      }, (error: any) => {
        console.log(`Ocorreu um erro ao chamar a API: ${error}`);
      });
  }

  public createNewItem(){
    this.dialog.open(ChecklistEditComponent, {
      disableClose: true, data: { actionName: 'Criar'},
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.loadAllChecklistItems();
      }
    });
  }

  public updateCompleteStatus(guid: string, status: boolean){
    this.checklistService.updateCompleteStatus(guid, status).subscribe(
      (resp: any) => {
        this.snackBarService.showSnackBar('Item atualizado com sucesso!', 'Ok');
        this.loadAllChecklistItems();
      }, error => {
        this.snackBarService.showSnackBar('Erro ao atualizar status do item do checklist. Tente novamente!', 'Ok');
      }
    );
  }

  public updateChecklistItem(checklistItem: ChecklistItem){
    this.dialog.open(ChecklistEditComponent, {
      disableClose: true, data: { updatableChecklistItem: checklistItem, actionName: 'Editar'},
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.loadAllChecklistItems();
      }
    });
  }

  public deleteChecklisItem(checklistItem: ChecklistItem){
    this.dialog.open(DialogComponent, {
      disableClose: true, data: {dialogMsg: 'Você deseja realmente apagar esse item?',
      leftButtonLabe: 'Cancelar', rightButtonLabel: 'Ok'}
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.checklistService.deleteChecklistItems(checklistItem.guid).subscribe(
          (resp: any) => {
            this.snackBarService.showSnackBar('Item do checklist apagado com sucesso!', 'Ok');
            this.loadAllChecklistItems();
          }, (error: any) => {
            this.snackBarService.showSnackBar('Erro ao apagar item do checklist. Tente novamente!', 'Ok');
          });
      }
    });
  }
}
