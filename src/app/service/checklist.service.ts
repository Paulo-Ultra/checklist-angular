import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Category } from '../_models/category';
import { ChecklistItem } from '../_models/checklist_item';

export const CHECKLIST_DATA = [
  { guid: 'aaa-bbb-ccc-ddd', completed: false, description: 'Ir ao oftamologista',
  deadline: new Date, postDate: new Date, category: {guid: 'aaaa-bbbb-cccc-dddd', name: 'Saúde'}},

    { guid: 'aaa-bbb-ccc-ddd', completed: true, description: 'Reunião com gerente regional',
    deadline: new Date, postDate: new Date, category: {guid: 'aaaa-bbbb-cccc-dddd', name: 'Trabalho'}},
];

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor() { }

  public getAllChecklistItems(): Observable<ChecklistItem[]>{
     return of(CHECKLIST_DATA);
  }

}
