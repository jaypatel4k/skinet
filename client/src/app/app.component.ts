import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { IPagination } from './models/pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products: IProduct[] = [];
  constructor(private http: HttpClient)
  {

  }
  ngOnInit(): void {
    this.getCandies().subscribe(
      (prod) => {
        this.products = prod.data;
      },
      (err) =>
      { console.error(err);
    });
  }
    getCandies(): Observable<IPagination<IProduct[]>>{
      return this.http.get<IPagination<IProduct[]>>('https://localhost:5001/api/products?pageSize=50');
    }
}
