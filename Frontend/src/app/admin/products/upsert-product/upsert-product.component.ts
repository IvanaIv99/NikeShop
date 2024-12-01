import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first, Observable} from "rxjs";
import {ProductService} from "../../../shop/business-logic/product.service";
import {SnackbarService} from "../../../shared/services/common/snackbar/SnackbarService";
import {ProductModel} from "../../../shop/models/product.model";

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './upsert-product.component.html',
  styleUrls: ['./upsert-product.component.scss']
})
export class UpsertProductComponent implements OnInit {

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
      private router: Router,
      private productService: ProductService,
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
      this.productService.getProducts(this.id)
          .pipe(first())
          .subscribe(product => {
            this.form.patchValue({
              name: product[0].name,
              description: product[0].description,
              price: product[0].price,
              categories: product[0].categories.map(category => category['pivot']['category_id']),
              colors: product[0].colors.map(color => color['pivot']['color_id']),
              sizes: product[0].sizes.map(size => size['pivot']['size_id'])
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
  private saveProduct(productId?: any): Observable<ProductModel> {
    const formData = new FormData();
    formData.append('name', this.form.value['name'])
    formData.append('description', this.form.value['description'])
    formData.append('price', this.form.value['price'])
    formData.append('image', this.image, this.image.name)
    formData.append('categories', this.form.value['categories'])
    formData.append('colors', this.form.value['colors'])
    formData.append('sizes', this.form.value['sizes'])

    return productId ?
      this.productService.updateProduct(formData, productId) :
      this.productService.addProduct(formData);
  }

  private getSizes(): any
  {
    this.productService.getProductSizes().subscribe({
      next: (data) => {
        this.sizesList = data[0];
      },
      error: (e) => console.error(e)
    });
  }

  private getCategories(): any
  {
    this.productService.getProductCategories().subscribe({
      next: (data) => {
        this.categoriesList = data[0];
      },
      error: (e) => console.error(e)
    });
  }

  private getColors(): any
  {
    this.productService.getProductColors().subscribe({
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
      // sizes: [null, Validators.required]
      sizes: [null]
    });
  }
}
