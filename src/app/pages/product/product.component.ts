import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public userProducts: Array<IProductResponse> = [];
  public categoryProductName!: string;
  private eventSubscription!: Subscription;




  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrdersService,
    private toastr: ToastrService


  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllFirebase().subscribe(data => {
      let categoryProducts = data.filter(item => item['category']['path'] == categoryName);
      this.userProducts = categoryProducts as IProductResponse[];
    })

    if (categoryName == 'pizza') {
      this.categoryProductName = 'Піца'
    }
    else if (categoryName == 'salads') {
      this.categoryProductName = 'Салати'
    }
    else if (categoryName == 'drinks') {
      this.categoryProductName = 'Напої'
    }
    else if (categoryName == 'deserts') {
      this.categoryProductName = 'Десерти'
    }
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
    this.toastr.success(`${product.name} - успішно додано`);
  }


  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

}
