import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { FaqComponent } from './pages/faq/faq.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountComponent,
    DiscountInfoComponent,
    ProductComponent,
    ProductInfoComponent,
    DeliveryComponent,
    AboutComponent,
    NewsComponent,
    FaqComponent,
    OfertaComponent,
    ContactsComponent,
    CheckoutComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminNewsComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
