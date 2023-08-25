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

  getAll(): Promise<Product[]>{
    return firstValueFrom(
      this.http
        .get<{ products: ProductHttp[], total: number}>(this.baseApiUrl+'products')
        .pipe(
          map(response => response.products.map(pH => Product.fromProductHttpToProduct(pH)))
        )
    )
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


  getAllByCategory(category: Category): Promise<Product[]>{
    return firstValueFrom(
      this.http
        .get<{ products: ProductHttp[] }>(this.baseApiUrl + 'products/category/' + category)
        .pipe(
          map(response => response.products.map(pH => Product.fromProductHttpToProduct(pH)))
        )
    )
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
}
