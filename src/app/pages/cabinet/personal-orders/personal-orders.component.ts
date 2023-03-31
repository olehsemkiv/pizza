import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrderResponse } from 'src/app/shared/interfaces/oreders/order.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-personal-orders',
  templateUrl: './personal-orders.component.html',
  styleUrls: ['./personal-orders.component.scss']
})
export class PersonalOrdersComponent implements OnInit {
  public currentUser!: any;
  public personalOrderList: Array<IOrderResponse> = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private orderService: OrdersService,
    
  ) { }

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
     
      this.personalOrderList = JSON.parse(this.currentUser.orders);
      console.log(this.personalOrderList);
     

    }
  }

  reOrder(value: any): void {
    localStorage.setItem('basket', JSON.stringify(value));
    this.orderService.changeBasket.next(true);
    this.router.navigate(['/checkout']);

    
  }
}
