import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';

const routes: Routes = [
  {path: '', component: ShopComponent },
  {path: ':id', component: ShopDetailsComponent, data: {breadcrumb:{alias: 'productDetails'}}},
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
