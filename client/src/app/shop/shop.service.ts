import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import {map} from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseurl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  // getProducts(): Observable<IPagination<IProduct[]>>
  // {
  //   return this.http.get<IPagination<IProduct[]>>(this.baseurl + 'products?pageSize=50');
  // }

  getProducts(shopParams: ShopParams): Observable<IPagination<IProduct[]>>
  {
    let params = new HttpParams();
    if (shopParams.brandId !== 0)
    {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0 )
    {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.search)
    {
      params = params.append('search', shopParams.search);
    }
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination<IProduct[]>>(this.baseurl + 'products', {observe: 'response', params})
    .pipe(
      map((response: any  ) => {
        return response.body;
      })
    );
    // return this.http.get<IPagination<IProduct[]>>(this.baseurl + 'products?pagesize=50');
  }

  getProduct(id: number): Observable<IProduct>
  {
    return this.http.get<IProduct>(this.baseurl + 'products/' + id);
  }
  getBrands(): Observable<IBrand[]>
  {
    return this.http.get<IBrand[]>(this.baseurl + 'products/brands');
  }

  getTypes(): Observable<IType[]>
  {
    return this.http.get<IType[]>(this.baseurl + 'products/types');
  }
}
