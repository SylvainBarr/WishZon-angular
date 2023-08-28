import { Injectable } from '@angular/core';
import {Environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Product, ProductHttp} from "../../model/product.model";
import {firstValueFrom, map} from "rxjs";
import {Category} from "../../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseApiUrl: string
  constructor(private http: HttpClient) {
    this.baseApiUrl = Environment.API_URL
  }

  getAll(page: number = 1): Promise<{ products: Product[], total: number }> {
    return firstValueFrom(
      this.http
        .get<{ products: ProductHttp[], total: number }>(this.baseApiUrl + 'products?skip='+ ((page-1)*30))
        .pipe(
          map(response => ({
            products: response.products.map(pH => Product.fromProductHttpToProduct(pH)),
            total: response.total
          }))
        )
    );
  }


  getById(productId: number): Promise<Product>{
    return firstValueFrom(
      this.http
        .get<ProductHttp>(this.baseApiUrl+"products/"+ productId)
        .pipe(
          map(productHttp => Product.fromProductHttpToProduct(productHttp))
        )
    )
  }


  getAllByCategory(category: Category): Promise<{ products: Product[], total: number }> {
    return firstValueFrom(
      this.http
        .get<{ products: ProductHttp[], total: number }>(this.baseApiUrl + 'products/category/' + category)
        .pipe(
          map(response => ({
            products: response.products.map(pH => Product.fromProductHttpToProduct(pH)),
            total: response.total
          }))
        )
    );
  }


  getAllByPage(page: string): Promise<Product[]> {
    return firstValueFrom(
      this.http
        .get<{ products: ProductHttp[] }>(this.baseApiUrl+'products?skip'+((parseInt(page)-1)*30))
        .pipe(
          map(response => response.products.map(pH => Product.fromProductHttpToProduct(pH)))
        )
    )
  }

  getByPartial(searchText: string) {
    return firstValueFrom(
      this.http
        .get<{ products: ProductHttp[] }>(this.baseApiUrl+'products/search?q='+searchText)
        .pipe(
          map(response => ({
            products: response.products.map(pH => Product.fromProductHttpToProduct(pH)),
          }))
        )
    )
  }
}
