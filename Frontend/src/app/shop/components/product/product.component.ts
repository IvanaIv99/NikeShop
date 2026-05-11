import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {ShopService} from "../../business-logic/services/shop.service";
import {ISize} from "../../interfaces/i-size";
import {IColor} from "../../interfaces/i-color";
import {IProduct} from "../../interfaces/i-product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;
  @Output() productAdded = new EventEmitter();

  protected selectedAttributes: {
    size: ISize | null;
    color: IColor | null;
  } = {
    size: null,
    color: null
  };

  protected availableSizes: ISize[] = [];
  protected availableColors: IColor[] = [];

  constructor(
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.recomputeAvailability();
  }

  protected addProductToCart(product: IProduct): void {
    if (!this.canAddToCart()) return;
    this.shopService.addProductToCart(product, this.productAdded);
  }

  protected canAddToCart(): boolean {
    if (!this.selectedAttributes.size || !this.selectedAttributes.color) return false;
    return this.stockFor(this.selectedAttributes.size.id, this.selectedAttributes.color.id) > 0;
  }

  protected onSelectedAttribute(attribute: 'size' | 'color', value: any): void {
    this.shopService.onSelectedAttribute(value, attribute, this.product);
    this.selectedAttributes[attribute] = value;

    if (attribute === 'size' && this.selectedAttributes.color
        && !this.colorAvailableForSize(this.selectedAttributes.color.id, value.id)) {
      this.selectedAttributes.color = null;
    }
    if (attribute === 'color' && this.selectedAttributes.size
        && !this.sizeAvailableForColor(this.selectedAttributes.size.id, value.id)) {
      this.selectedAttributes.size = null;
    }
  }

  protected isSizeDisabled(size: ISize): boolean {
    const colorId = this.selectedAttributes.color?.id;
    if (colorId === undefined) {
      return !this.product.variants.some(v => v.size.id === size.id && v.stock > 0);
    }
    return !this.sizeAvailableForColor(size.id, colorId);
  }

  protected isColorDisabled(color: IColor): boolean {
    const sizeId = this.selectedAttributes.size?.id;
    if (sizeId === undefined) {
      return !this.product.variants.some(v => v.color.id === color.id && v.stock > 0);
    }
    return !this.colorAvailableForSize(color.id, sizeId);
  }

  protected get categoryString(): string {
    return this.product.categories.map(c => c.name || c).join(' | ') || '';
  }

  private recomputeAvailability(): void {
    const sizesMap = new Map<number, ISize>();
    const colorsMap = new Map<number, IColor>();
    for (const v of this.product.variants) {
      if (v.stock > 0) {
        sizesMap.set(v.size.id, v.size);
        colorsMap.set(v.color.id, v.color);
      }
    }
    this.availableSizes = Array.from(sizesMap.values());
    this.availableColors = Array.from(colorsMap.values());
  }

  private stockFor(sizeId: number, colorId: number): number {
    return this.product.variants.find(v => v.size.id === sizeId && v.color.id === colorId)?.stock ?? 0;
  }

  private sizeAvailableForColor(sizeId: number, colorId: number): boolean {
    return this.stockFor(sizeId, colorId) > 0;
  }

  private colorAvailableForSize(colorId: number, sizeId: number): boolean {
    return this.stockFor(sizeId, colorId) > 0;
  }
}
