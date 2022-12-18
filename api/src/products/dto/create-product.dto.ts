import { IngredientsInterface } from "./ingredientsInterface"

export class CreateProductDto {
    name: string
    img: string
    category: string
    price: number
    ingredients: IngredientsInterface[]
}
