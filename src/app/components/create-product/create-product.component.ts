import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  constructor(
    private productService: ProductsService,
    private modalService: ModalService
  ) {}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  get title() {
    return this.form.controls.title as FormControl;
  }
  submit() {
    console.log(this.form.value);
    this.productService
      .create({
        title: this.form.value.title as string,
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
        rating: {
          rate: 42,
          count: 3,
        },
      })
      .subscribe(() => {
        this.modalService.close();
      });
  }
}
