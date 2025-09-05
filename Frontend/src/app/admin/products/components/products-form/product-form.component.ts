import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {firstValueFrom, forkJoin, Observable} from "rxjs";
import {SnackbarService} from "../../../../shared/business-logic/services/common/snackbar/snackbar.service";
import {BlProductsRequestService} from "../../bussiness-logic/requests/bl-products-request.service";
import {IProduct} from "../../../../shop/interfaces/i-product";
import {ICategory} from "../../../../shop/interfaces/i-category";
import {ISize} from "../../../../shop/interfaces/i-size";
import {IColor} from "../../../../shop/interfaces/i-color";
import {
  allowedExtensionsValidator,
  allowedFormValuesValidator,
} from "../../../../shared/validators/allowed-form-values.validator";

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  id?: string;
  loading = true;
  submitting = false;
  submitted = false;
  title!: string;
  fileName: string | null = null;
  image: File | null = null;

  categoriesList: ICategory[] = [];
  sizesList: ISize[] = [];
  colorsList: IColor[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: BlProductsRequestService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.title = this.id ? 'Edit Product' : 'Add Product';

    this.loadListsAndInitForm();
  }

  private loadListsAndInitForm(): void {
    forkJoin({
      categories: this.productService.getCategories(),
      colors: this.productService.getColors(),
      sizes: this.productService.getSizes()
    }).subscribe({
      next: ({ categories, colors, sizes }) => {
        this.categoriesList = categories;
        this.colorsList = colors;
        this.sizesList = sizes;

        this.form = this.createForm();

        if (this.id) this.loadProduct(this.id);
        else this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  private loadProduct(productId: string): void {
    this.productService.getOneProduct(productId).subscribe(product => {
      this.form.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.categories.map(c => c['pivot']['category_id']),
        colors: product.colors.map(c => c['pivot']['color_id']),
        sizes: product.sizes.map(s => s['pivot']['size_id'])
      });
      this.fileName = product.image;
      this.loading = false;
    });
  }

  private createForm(): FormGroup {
    const imageValidator = !this.id ? [Validators.required, allowedExtensionsValidator(['jpg', 'jpeg', 'png'])] : [];
    return this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
      price: [null, [Validators.required, Validators.min(1)]],
      image: [null, imageValidator],
      categories: [[], [Validators.required, allowedFormValuesValidator(this.categoriesList.map(c => c.id))]],
      colors: [[], [Validators.required, allowedFormValuesValidator(this.colorsList.map(c => c.id))]],
      sizes: [[], [Validators.required, allowedFormValuesValidator(this.sizesList.map(s => s.id))]]
    });
  }

  onFileSelected(event: any): void {
    let file = event.target.files[0];
    this.image = file;
    this.fileName = this.image?.name || null;

    this.form.get('image')?.setValue(file);
    this.form.get('image')?.updateValueAndValidity();
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (!this.form || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    try {
      await firstValueFrom(this.saveProduct(this.id));
      this.snackbar.showSuccess('Saved.');
    } catch (error: any) {
      this.snackbar.showError(error);
      this.submitting = false;
    }
  }

  private saveProduct(productId?: string): Observable<IProduct> {
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);
    if (this.image) formData.append('image', this.image, this.image.name);
    this.form.value.categories.forEach((c: any) => formData.append('categories[]', c));
    this.form.value.colors.forEach((c: any) => formData.append('colors[]', c));
    this.form.value.sizes.forEach((s: any) => formData.append('sizes[]', s));

    return productId ?
      this.productService.update(formData, productId) :
      this.productService.create(formData);
  }

  getFormErrors(controlName: string): string[] {
    const control = this.form.get(controlName);
    if (!control || !control.errors || (!control.touched && !this.submitted)) return [];
    return Object.keys(control.errors).map(error => {
      switch (error) {
        case 'required': return 'This field is required';
        case 'minlength': return `Minimum ${control.errors['minlength'].requiredLength} characters`;
        case 'maxlength': return `Maximum ${control.errors['maxlength'].requiredLength} characters`;
        case 'min': return `Minimum value is ${control.errors['min'].min}`;
        case 'invalidValues': return 'Some selected values are invalid';
        case 'invalidExtension': return 'Invalid file extension. Allowed: JPEG | JPG | PNG';
        default: return 'Invalid value';
      }
    });
  }
}
