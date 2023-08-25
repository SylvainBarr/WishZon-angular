import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Environment} from "../../environment/environment";
import {Category, CategoryHttp} from "../../model/category.model";
import {firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseApiUrl: string
  constructor(private http: HttpClient) {
    this.baseApiUrl = Environment.API_URL
  }

  getAll(): Promise<Category[]>{
    return firstValueFrom(this.http
      .get<CategoryHttp[]>(this.baseApiUrl + 'products/categories')
      .pipe(
        map(categoriesHttp => categoriesHttp.map(cH => Category.fromCategoryHttpToCategory(cH)))
      )
    )
  }
}
