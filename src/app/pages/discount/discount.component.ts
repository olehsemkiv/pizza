import { Component, OnInit } from '@angular/core';
import { discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  public userDiscounts: Array<discountElementResponse> = [];


  constructor(
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.loadDiscount()
  }

  loadDiscount(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.userDiscounts = data as discountElementResponse[];
    })
  }

}
