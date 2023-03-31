import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { IProductTypeResponse } from 'src/app/shared/interfaces/product/productType.interface';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { ProductTypeService } from 'src/app/shared/services/product-type/product-type.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homePizza: Array<IProductResponse> = [];
  public userProducts: Array<IProductResponse> = [];
  public typesPizza: Array<IProductTypeResponse> = [];
  public searchValue!: string;

  constructor(
    private productServica: ProductService,
    private orderService: OrdersService,
    private pType: ProductTypeService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.loadHomePizza();
    window.scrollTo(0, 0);
    this.loadTypes();

  }

  loadHomePizza(): void {
    this.productServica.getAllFirebase().subscribe(data => {
      this.userProducts = data as IProductResponse[];
      for (const product of this.userProducts) {
        if (product.category.path == 'pizza') {
          this.homePizza.push(product)
        }
      }
    })
  }

  loadTypes(): void {
    this.pType.getAllFirebase().subscribe(data => {
      this.typesPizza = data as IProductTypeResponse[];
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
    this.toastr.success(`${product.name} - успішно додано`);
  }

  pizzaFilter(value: string): void {
    this.searchValue = value;
  }
}
