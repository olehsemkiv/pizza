import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homePizza: Array<IProductResponse> = [];
  public userProducts: Array<IProductResponse> = [];

  constructor(
    private productServica: ProductService
  ) { }

  ngOnInit(): void {
    this.loadHomePizza();

  }

  loadHomePizza(): void {
    this.productServica.getAllFirebase().subscribe(data => {
      this.userProducts = data as IProductResponse[];
      for (const product of this.userProducts) {
        if(product.category.path == 'pizza'){
          this.homePizza.push(product)
        }
      }
    })
    
  }
}
