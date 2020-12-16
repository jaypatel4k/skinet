import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false}) searchTerm!: ElementRef;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  shopparams = new ShopParams();
  totalCount = 0;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price : Low to High', value: 'priceAsc'},
    {name: 'Price: Hih to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void
  {
    this.shopService.getProducts(this.shopparams).subscribe(response => {
    this.products = response.data;
    this.shopparams.pageNumber = response.pageIndex;
    this.shopparams.pageSize = response.pageSize;
    this.totalCount = response.count;
   }, error => {
     console.log(error);
   });
  }
  getBrands(): void
  {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(): void
  {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name : 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandIdSelected(brandId: number): void
  {
    this.shopparams.brandId = brandId;
    this.shopparams.pageNumber = 1;
    this.getProducts();
  }
  onTypeIdSelected(typeId: number): void
  {
    this.shopparams.typeId = typeId;
    this.shopparams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(e: any): void
  {
    this.shopparams.sort = e.target.value;
    this.getProducts();
  }
  onPageChanged(event: any): void
  {
    if (this.shopparams.pageNumber !== event.page)
    {
      this.shopparams.pageNumber = event.page;
      this.getProducts();
    }
  }
  onSearch(): void
  {
    this.shopparams.search = this.searchTerm.nativeElement.value;
    this.shopparams.pageNumber = 1;
    this.getProducts();
  }
  onReset(): void
  {
    this.searchTerm.nativeElement.value = '';
    this.shopparams = new ShopParams();
    this.getProducts();

  }
}
