import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product.model";
import {ProductService} from "../../service/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  product$!: Promise<Product>

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.product$ = this.productService.getById(parseInt(id))
    }
    else{
      this.router.navigateByUrl('/products')
    }
  }


}
