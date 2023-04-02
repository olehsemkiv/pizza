import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public basket: Array<IProductResponse> = [];
  public totalPrice = 0;
  public totalCount = 0;

  public orderForm!: FormGroup;
  public callbackStatus = false;
  public commentkStatus = false;

  constructor(
    private orderService: OrdersService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadBasket();
    this.updateBasket();
    this.initOrderForm();




  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }
  getTotalCount(): void {
    this.totalCount = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
    else if (!value && product.count > 1) {
      --product.count
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
    this.updateBasket();
    this.orderService.changeBasket.next(true);
  }

  deleteCartItem(product: IProductResponse): void {
    if (this.basket.some(prod => prod.id === product.id)) {
      const index = this.basket.findIndex(prod => prod.id === product.id);
      this.basket.splice(index, 1);
      console.log(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket))
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }

  }

  // ====================================================================================================================================================
  // ====================================================================================================================================================
  // ====================================================================================================================================================

  initOrderForm(): void {
    const d = new Date();
    const date = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`;


    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser') as string);
      this.orderForm = this.fb.group({
        name: [user.firstName, Validators.required],
        phone: [user.phoneNumber, Validators.required],
        email: [user.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
        street: [user.street, Validators.required],
        house: [user.house, Validators.required],
        entrance: [user.entrance, Validators.required],
        paymentMethod: [null, Validators.required],
        totalPrice: [this.totalPrice, Validators.required],
        callback: [this.callbackStatus],
        message: [null],
        date: date,
        orders: [this.basket],
        status: ['waiting']
      })
    } else {
      this.orderForm = this.fb.group({
        name: [null, Validators.required],
        phone: [null, Validators.required],
        email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
        street: [null, Validators.required],
        house: [null, Validators.required],
        entrance: [null, Validators.required],
        paymentMethod: [null, Validators.required],
        totalPrice: [this.totalPrice, Validators.required],
        callback: [this.callbackStatus],
        message: [null],
        date: date,
        orders: [this.basket],
        status: ['waiting']
      })
    }



  }

  changeCallBack(): void {
    if (this.callbackStatus == false) {
      this.callbackStatus = true;
    } else if (this.callbackStatus) {
      this.callbackStatus = false;
    }

  }

  changeComment(): void {
    if (this.commentkStatus == false) {
      this.commentkStatus = true;
    } else if (this.commentkStatus) {
      this.commentkStatus = false;
    }

  }

  submitOrder(): void {
    this.orderService.createFirebase(this.orderForm.value).then(() => {
      console.log('work');

    })



    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {

      const user = JSON.parse(localStorage.getItem('currentUser') as string);

      let currentUserOrderList = JSON.parse(user.orders);
      currentUserOrderList.push(this.orderForm.value)
      console.log(currentUserOrderList);
      user.orders = JSON.stringify(currentUserOrderList);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.orderService.updateFirebaseUserOrders(user, user.uid).then(() => {
        console.log('success order');

      })

    }


    localStorage.setItem('basket', '[]');
    this.orderService.changeBasket.next(true);
    window.scrollTo(0, 0);
    this.toastr.success('Замовлення успішно відправлено')
    this.router.navigate(['success-order']);
  }


}
