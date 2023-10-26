import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Category } from '../_models/category';

export const CATEGORY_DATA = [
  { name: 'Educação', guid: 'aaa-bbb-ccc-ddd' },
  { name: 'Saúde', guid: 'aaa-bbb-ccc-ddd' },
  { name: 'Trabalho', guid: 'aaa-bbb-ccc-ddd' },
  { name: 'Outros', guid: 'aaa-bbb-ccc-ddd' }
];

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  public getAllCategories(): Observable<Category[]> {
    return of(CATEGORY_DATA);
  }
}
