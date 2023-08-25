
export type CategoryHttp = string

export type Category = string


export namespace Category{
  export function fromCategoryHttpToCategory(categoryHttp: CategoryHttp): Category {
    return categoryHttp
  }
}
