import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
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
    private productService: ProductService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response['productInfo'];
    })
    // this.loadproduct();
  }

  loadproduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOneFirebase(id as string).subscribe(data => {
      this.currentProduct = data as IProductResponse
      console.log(this.currentProduct);

    })

  }

}
