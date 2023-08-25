import {Category, CategoryHttp} from "./category.model";

export interface ProductHttp{
  id: number,
  title: string,
  brand: string,
  price: number,
  category: CategoryHttp,
  description: string,
  thumbnail: string,
  rating: number,
  stock: number
}

export interface Product{
  id: number,
  title: string,
  brand: string,
  price: number,
  category: Category,
  description: string,
  thumbnail: string,
  rating: number,
  stock: number
}

export namespace Product{
  import fromCategoryHttpToCategory = Category.fromCategoryHttpToCategory;

  export function fromProductHttpToProduct(productHttp: ProductHttp): Product {
    return {
      id: productHttp.id,
      title: productHttp.title,
      brand: productHttp.brand,
      price: productHttp.price,
      category: Category.fromCategoryHttpToCategory(productHttp.category),
      description: productHttp.description,
      thumbnail: productHttp.thumbnail,
      rating: productHttp.rating,
      stock: productHttp.stock
    }
  }
}
