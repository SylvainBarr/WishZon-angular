import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../model/product.model";
import {ProductService} from "../../service/product/product.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy{

  products$!: Promise<{ products: Product[], total: number }>
  token$!:Observable<string>
  total!: number
  productsList!: Product[]
  pages!: any[]
  subscription$!: Subscription


  constructor(private productService: ProductService, private route: ActivatedRoute, private authService: AuthService) {
  }


  ngOnInit() {
    this.token$ = this.authService.token$

    this.subscription$ = this.route.params
      .subscribe((e: any)=>{
        if (e.name){
          this.products$ = this.productService.getAllByCategory(e.name)
        }
        else {
          this.products$ = this.productService.getAll(e.pageNumber)
        }

        this.products$.then(response => {
          this.total = response.total
          this.productsList = response.products
          const pageNumber = Math.ceil(this.total/30)
          this.pages = new Array(pageNumber)
        })
      } )

  }

  ngOnDestroy() {
    this.subscription$.unsubscribe()
  }


}
