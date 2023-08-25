import {Component, OnInit} from '@angular/core';
import {Category} from "../../model/category.model";
import {CategoryService} from "../../service/category/category.service";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit{

  categories$!: Promise<Category[]>

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll()
  }

}
