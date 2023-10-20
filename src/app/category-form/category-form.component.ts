import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  @Input() public actionName = 'Editar';

  public categoryForm!: FormGroup;

  @Output() closeModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() public editableCategory!: Category;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [this.editableCategory != null ? this.editableCategory.name : '', Validators.required],
    });
  }

  public cancel(){
    console.log('Cancelar clicado');
    this.closeModalEventEmitter.emit(true);
  }

  public save(){
    console.log('Salvar clicado');
    this.closeModalEventEmitter.emit(true);
  }
}
