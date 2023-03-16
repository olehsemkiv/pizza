import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { ICategoryElementResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketModalComponent } from '../basket-modal/basket-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navMenuStatus = false;
  public basket: Array<IProductResponse> = [];
  public totalCount!: number;
  public totalPrice!: number;

  // ====================================================================================================================================================
  // ====================================================================================================================================================
  public isLogin = false;
  public loginUrl = '';
  // ************************************
  public loginSubscription!: Subscription;


  constructor(
    private categoryService: CategoryService,
    private orderService: OrdersService,
    private accountService: AccountService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.openNavMenu();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdateUserLogin();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalCount();
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.price * prod.count, 0);
  }
  getTotalCount(): void {
    this.totalCount = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }


  // ====================================================================================================================================================
  // ====================================================================================================================================================

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
    }
  }

  checkUpdateUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  // ====================================================================================================================================================
  // ====================================================================================================================================================

  ngOnDestroy(): void {
    // this.loginSubscription.unsubscribe()
    if (this.loginSubscription) { this.loginSubscription.unsubscribe() }
  }
  // ====================================================================================================================================================
  // ====================================================================================================================================================

  openNavMenu(): void {
    // this.navMenuStatus = !this.navMenuStatus
    const iconMenu = document.querySelector('.menu__icon') as HTMLElement;
    const menuBody = document.querySelector('.header__menu') as HTMLElement;
    if (iconMenu) {
      iconMenu.addEventListener('click', function (e): void {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
      })
    }
    const menuItems = document.querySelectorAll('.menu__link');
    if (menuItems.length > 0) {
      menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', function (e) {
          if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
          }
        })
      })
    }
  }
  // ====================================================================================================================================================
  // ====================================================================================================================================================
  // ====================================================================================================================================================

  openDialogAuth(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back'
    })
  }
  openDialogBasket(): void {
    this.dialog.open(BasketModalComponent, {
      autoFocus: false
    });
  }
}




