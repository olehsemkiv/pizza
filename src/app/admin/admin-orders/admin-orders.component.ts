import { Component, OnInit } from '@angular/core';
import { IOrderResponse } from 'src/app/shared/interfaces/oreders/order.interface';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  public adminOrders: Array<IOrderResponse> = [];

  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.getData();

  }

  getData(): void {
    this.orderService.getAllFirebase().subscribe(data => {
      this.adminOrders = data as IOrderResponse[];
    })
  }

  confirmOrder(element: IOrderResponse, value: string): void {
    if (confirm("Підтвердити дію")) {
      element.status = value;
      this.orderService.updateFirebase(element, element.id).then(() => {
        this.getData();
      })
    }


  }

}
