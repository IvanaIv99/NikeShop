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

interface VariantInput {
  sizeId: number;
  colorId: number;
  stock: number;
}

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

  selectedSizeIds: number[] = [];
  selectedColorIds: number[] = [];
  stockMatrix: Record<string, number> = {};

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
      next: ({categories, colors, sizes}) => {
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
        categories: product.categories.map(c => c['id']),
      });

      this.selectedSizeIds = Array.from(new Set(product.variants.map(v => v.size.id)));
      this.selectedColorIds = Array.from(new Set(product.variants.map(v => v.color.id)));
      this.stockMatrix = {};
      for (const v of product.variants) {
        this.stockMatrix[this.cellKey(v.size.id, v.color.id)] = v.stock;
      }

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
    });
  }

  cellKey(sizeId: number, colorId: number): string {
    return `${sizeId}:${colorId}`;
  }

  isSizeSelected(sizeId: number): boolean {
    return this.selectedSizeIds.includes(sizeId);
  }

  isColorSelected(colorId: number): boolean {
    return this.selectedColorIds.includes(colorId);
  }

  sizeLabel(sizeId: number): string | number {
    return this.sizesList.find(s => s.id === sizeId)?.size ?? sizeId;
  }

  colorLabel(colorId: number): string {
    return this.colorsList.find(c => c.id === colorId)?.name ?? String(colorId);
  }

  toggleSize(sizeId: number, checked: boolean): void {
    this.selectedSizeIds = checked
      ? [...this.selectedSizeIds, sizeId]
      : this.selectedSizeIds.filter(id => id !== sizeId);
  }

  toggleColor(colorId: number, checked: boolean): void {
    this.selectedColorIds = checked
      ? [...this.selectedColorIds, colorId]
      : this.selectedColorIds.filter(id => id !== colorId);
  }

  onStockChange(sizeId: number, colorId: number, value: any): void {
    const n = parseInt(value, 10);
    this.stockMatrix[this.cellKey(sizeId, colorId)] = isNaN(n) || n < 0 ? 0 : n;
  }

  getStock(sizeId: number, colorId: number): number {
    return this.stockMatrix[this.cellKey(sizeId, colorId)] ?? 0;
  }

  private buildVariants(): VariantInput[] {
    const out: VariantInput[] = [];
    for (const sizeId of this.selectedSizeIds) {
      for (const colorId of this.selectedColorIds) {
        out.push({sizeId, colorId, stock: this.getStock(sizeId, colorId)});
      }
    }
    return out;
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
    if (this.selectedSizeIds.length === 0 || this.selectedColorIds.length === 0) {
      this.snackbar.showError('Pick at least one size and one color.');
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

    this.buildVariants().forEach((v, i) => {
      formData.append(`variants[${i}][sizeId]`, String(v.sizeId));
      formData.append(`variants[${i}][colorId]`, String(v.colorId));
      formData.append(`variants[${i}][stock]`, String(v.stock));
    });

    return productId
      ? this.productService.update(formData, productId)
      : this.productService.create(formData);
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
