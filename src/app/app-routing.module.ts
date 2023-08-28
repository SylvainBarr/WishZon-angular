import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {authGuard} from "./guard/auth/auth.guard";
import {ProfileComponent} from "./view/profile/profile.component";
import {ProductsListComponent} from "./view/products-list/products-list.component";
import {CategoriesListComponent} from "./view/categories-list/categories-list.component";
import {ProductDetailsComponent} from "./view/product-details/product-details.component";
import {NotFoundComponent} from "./view/not-found/not-found.component";

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'products'},
  {path: 'login', component: LoginComponent},
  {path: 'my-profile',canActivate: [authGuard], component: ProfileComponent},
  {path: 'products', children: [
      {path:'', component: ProductsListComponent},
      {path:'page/:pageNumber', component: ProductsListComponent},
      {path: 'categories', children: [
          {path: '', component: CategoriesListComponent},
          {path: ':name', component: ProductsListComponent}
        ]
      },
      {path: ':id', component: ProductDetailsComponent}
    ]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
