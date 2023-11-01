import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

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

  constructor(private httpClient: HttpClient) { }

  public getAllChecklistItems(): Observable<ChecklistItem[]>{
      return this.httpClient.get<ChecklistItem[]>(`${environment.apiBaseEndpointUrl}checklist-items`);
  }

  public saveChecklistItem(checklistItem: ChecklistItem): Observable<string>{
    return this.httpClient.post<string>(`${environment.apiBaseEndpointUrl}checklist-items`, checklistItem);
  }

  public updateChecklistItems(checklistItem: ChecklistItem): Observable<void>{
    return this.httpClient.put<void>(`${environment.apiBaseEndpointUrl}checklist-items`, checklistItem);
  }

  public deleteChecklistItems(guid: string): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiBaseEndpointUrl}checklist-items/${guid}`);
  }

}
