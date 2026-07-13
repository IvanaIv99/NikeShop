import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";
import { ICartItem } from '../../../cart/interfaces/i-cart-item';
import {CartService} from "../../../cart/business-logic/services/cart.service";
import {IProduct} from "../../interfaces/i-product";
import {BlProductsRequestService} from "../../../admin/products/bussiness-logic/requests/bl-products-request.service";
import {SnackbarService} from "../../../shared/business-logic/services/common/snackbar/snackbar.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {

  protected products: IProduct[] = [];
  protected searchTerm: string = '';
  protected total = 0;
  protected loading = false;

  private page = 1;
  private readonly perPage = 12;
  private searchChange$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    public requestService: BlProductsRequestService,
    public cartService: CartService,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.searchChange$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(term => {
        this.searchTerm = term;
        this.resetAndLoad();
      });

    this.resetAndLoad();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onSearchChange(term: string): void {
    this.searchChange$.next(term);
  }

  protected loadMore(): void {
    if (!this.hasMore) return;
    this.page++;
    this.loadProducts();
  }

  protected get hasMore(): boolean {
    return this.products.length < this.total;
  }

  protected addProductToCart(product: any) {
    const size = product.selectedSize;
    const color = product.selectedColor;
    if (!size || !color) {
      this.snackbarService.showError('Pick a size and a color.');
      return;
    }

    const variant = product.variants?.find(
      (v: any) => v.size.id === size.id && v.color.id === color.id
    );
    if (!variant || variant.stock <= 0) {
      this.snackbarService.showError('Selected combination is out of stock.');
      return;
    }

    let item: ICartItem = {
      variantId: variant.id,
      product: product,
      quantity: 1,
      total: product.price,
      size,
      color,
    };

    this.cartService.addToCart(item);
  }

  private resetAndLoad(): void {
    this.page = 1;
    this.products = [];
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading = true;
    this.requestService.getAllProducts({
      search: this.searchTerm || null,
      page: this.page,
      perPage: this.perPage
    }).subscribe({
      next: (response) => {
        this.products = this.page === 1 ? response.data : [...this.products, ...response.data];
        this.total = response.meta.total;
        this.loading = false;
      },
      error: () => {
        this.snackbarService.showError("Error loading products.");
        this.loading = false;
      }
    });
  }

}
