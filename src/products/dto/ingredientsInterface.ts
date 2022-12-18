import { Product } from "@prisma/client"

export declare type IngredientsInterface = {
    item: string
   
}

export declare type IProductResponse = {
    
    results: Product[]
  }