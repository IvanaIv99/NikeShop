import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {AppComponent} from "../../app.component";
import {CartService} from "../../services/cart/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent extends AppComponent{
  constructor(
    private cartService: CartService
  ) {
    super();
  }

  countCart: any = this.cartService.count;


  ngOnInit(){
     this.cartService.countInCart().subscribe(count => {
        this.countCart = count
      }
    );
  }

}
