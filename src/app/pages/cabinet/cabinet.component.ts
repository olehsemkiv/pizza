import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  public currentUser!: any;


  constructor(
    private router: Router,
    private accountService: AccountService,
    private orderService: OrdersService
  ) { }


  ngOnInit(): void {
    this.orderService.getOneUser('ncUZ1YgQL3egCfcxFphd5KR32PN2').subscribe(data => {
      this.currentUser = data;
      // console.log(JSON.parse(this.currentUser.orders));
      

    })
  }

  unLogin(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
    this.accountService.isUserLogin$.next(true);
  }
}
