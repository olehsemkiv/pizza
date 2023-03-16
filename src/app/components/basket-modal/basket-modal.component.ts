import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-basket-modal',
  templateUrl: './basket-modal.component.html',
  styleUrls: ['./basket-modal.component.scss']
})
export class BasketModalComponent implements OnInit {

  public basket: Array<IProductResponse> = [];
  public totalPrice = 0;
  public totalCount = 0;

  constructor(
    private orderService: OrdersService
  ) { }
  ngOnInit(): void {

    this.loadBasket();
    this.updateBasket();
  }
  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }
  getTotalCount(): void {
    this.totalCount = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
    else if (!value && product.count > 1) {
      --product.count
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
    this.updateBasket();
    this.orderService.changeBasket.next(true);
  }

  deleteCartItem(product: IProductResponse): void {
    if (this.basket.some(prod => prod.id === product.id)) {
      const index = this.basket.findIndex(prod => prod.id === product.id);
      this.basket.splice(index, 1);
      console.log(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket))
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }

  }
}
