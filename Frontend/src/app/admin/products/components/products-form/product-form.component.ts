import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first, Observable} from "rxjs";
import {SnackbarService} from "../../../../shared/business-logic/services/common/snackbar/snackbar.service";
import {BlProductsRequestService} from "../../bussiness-logic/requests/bl-products-request.service";
import {IProduct} from "../../../../shop/interfaces/i-product";

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  id?: string;
  loading = false;
  submitting = false;
  submitted = false;
  title!: string;
  fileName: any;
  image:any;

  categoriesList: any;
  sizesList: any;
  colorsList: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private productService: BlProductsRequestService,
      private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.getSizes();
    this.getCategories();
    this.getColors();
    this.form = this.createForm();

    this.id = this.route.snapshot.params['id'];
    this.title = this.id ? 'Edit Product' : 'Add Product';

    if (this.id) {
     this.loading = true;
      this.productService.getOneProduct(this.id)
          .subscribe(response => {
            let product = response['data'];
            this.form.patchValue({
              name: product.name,
              description: product.description,
              price: product.price,
              categories: product.categories.map(category => category['pivot']['category_id']),
              colors: product.colors.map(color => color['pivot']['color_id']),
              sizes: product.sizes.map(size => size['pivot']['size_id'])
            });

            this.loading = false;
          });
    }
  }

  onSubmit(productId?: any) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;

    this.saveProduct(productId)
        .pipe(first())
        .subscribe({
          next: () => {
            this.snackbarService.showSuccess('Saved.');
          },
          error: error => {
            this.snackbarService.showError(error);
            this.submitting = false;
          }
        })
  }
  private saveProduct(productId?: any): Observable<IProduct> {
    const formData = new FormData();
    formData.append('name', this.form.value['name'])
    formData.append('description', this.form.value['description'])
    formData.append('price', this.form.value['price'])
    formData.append('image', this.image, this.image.name)
    formData.append('categories', this.form.value['categories'])
    formData.append('colors', this.form.value['colors'])
    formData.append('sizes', this.form.value['sizes'])

    return productId ?
      this.productService.update(formData, productId) :
      this.productService.create(formData);
  }

  private getSizes(): any
  {
    this.productService.getSizes().subscribe({
      next: (data) => {
        this.sizesList = data[0];
      },
      error: (e) => console.error(e)
    });
  }

  private getCategories(): any
  {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categoriesList = data[0];
      },
      error: (e) => console.error(e)
    });
  }

  private getColors(): any
  {
    this.productService.getColors().subscribe({
      next: (data) => {
        this.colorsList = data[0];
      },
      error: (e) => console.error(e)
    });
  }

  onFileSelected(event) {
    this.image = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  private createForm(){
    return this.formBuilder.group({
      name: [null],
      description: [null],
      price: [null],
      image: [null],
      categories: [null],
      colors: [null],
      sizes: [null]
    });
  }
}
