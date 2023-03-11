import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
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

  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void { }

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


  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

}
