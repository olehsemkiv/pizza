import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { PolicyComponent } from './pages/policy/policy.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  {
    path: 'discount/:id', component: DiscountInfoComponent, resolve: {
      discountInfo: DiscountInfoResolver
    }
  },
  { path: 'product/:category', component: ProductComponent },
  {
    path: 'product/:category/:id', component: ProductInfoComponent, resolve: {
      productInfo: ProductInfoResolver
    }
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'policy', component: PolicyComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'news', component: AdminNewsComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'category' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
