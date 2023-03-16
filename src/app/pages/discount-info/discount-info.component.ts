import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public currentDiscount!: discountElementResponse;


  constructor(
    private activatedRoute: ActivatedRoute,
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(response => {
      this.currentDiscount = response['discountInfo'];
    })
    window.scrollTo(0, 0);
  }

}
