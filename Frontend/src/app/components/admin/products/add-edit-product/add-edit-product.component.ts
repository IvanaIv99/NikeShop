import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../../services/product/product.service";
import {first} from "rxjs";

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {

  form!: FormGroup;
  id?: string;
  loading = false;
  submitting = false;
  submitted = false;
  title!: string;

  categoriesList: any;
  sizesList: any;
  colorsList: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      name: [''],
      description: [''],
      // image: new FormControl('', [Validators.required]),
      price: [''],
      categories: [''],
      colors: [''],
      sizes: [''],
    });

    this.getSizes();
    this.getCategories();
    this.getColors();

    this.title = 'Add Product';
    if (this.id) {
      // edit mode
      this.title = 'Edit Product';
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

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(productId?: any) {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveProduct(productId)
        .pipe(first())
        .subscribe({
          next: () => {
            // this.alertService.success('User saved', { keepAfterRouteChange: true });
            // this.router.navigateByUrl('/prod');
          },
          error: error => {
            // this.alertService.error(error);
            this.submitting = false;
          }
        })
  }
  private saveProduct(productId?: any) {
    // create or update user based on id param
    // console.log(this.form.value);
    // return this.id
    //     ? this.prod.update(this.id!, this.form.value)
    //     : this.accountService.register(this.form.value);
    if(productId){
      return this.productService.updateProduct(this.form.value, productId);
    }
    return this.productService.addProduct(this.form.value);
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

}
