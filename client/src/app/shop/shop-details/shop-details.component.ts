import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
  product : IProduct;
  constructor(private shopService: ShopService, private activateRoot: ActivatedRoute,
              private bcService: BreadcrumbService ) { 
                this.bcService.set('@productDetails','');
              }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void
  {
      this.shopService.getProduct(+this.activateRoot.snapshot.paramMap.get('id')).subscribe(product => {
        this.product = product;
        this.bcService.set('@productDetails', product.name);
      });
  }

}
