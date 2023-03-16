import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public currentProduct!: IProductResponse;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrdersService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response['productInfo'];
    })
    window.scrollTo(0, 0);
  }

  loadproduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOneFirebase(id as string).subscribe(data => {
      this.currentProduct = data as IProductResponse
      console.log(this.currentProduct);
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count
    }
    else if (!value && product.count > 1) {
      --product.count
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product)
      }
    } else {
      basket.push(product)
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

}
