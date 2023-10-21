import { Component } from '@angular/core';
import { CATEGORY_DATA } from '../category/category.component';

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

  public createNewItem(){
    console.log('Novo Item do checklist clicado');
  }
}
