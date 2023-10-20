import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  public actionName = 'Editar';
  public categoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.categoryForm = formBuilder.group({
      name: 'Carlos',
      age: '33',
      profession: 'Programador',
    });
  }

  public cancel(){
    console.log('Cancelar clicado');
  }

  public save(){
    console.log('Salvar clicado');
  }
}
