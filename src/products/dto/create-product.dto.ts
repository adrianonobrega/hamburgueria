import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber, IsString } from "class-validator"
import { IngredientsInterface } from "./ingredientsInterface"

export class CreateProductDto {
    @ApiProperty({example: 'x-burguer',})
    @IsString()
    name: string

    @ApiProperty({example: 'https://comeonburger.com.br/wp-content/uploads/2019/12/xburger.jpg',})
    @IsString()
    img: string

    @ApiProperty({example: 'Sanduiches',})
    @IsString()
    category: string

    @ApiProperty({example: 15,})
    @IsNumber()
    price: number

    @ApiProperty({
        example:[
            {
                item: "carne de hamburguer"
            },
            {
                item: "ovo"
            },
            {
                item: "queijo mussarela"
            },
            {
                item: "presunto"
            },
            {
                item: "molho especial"
            },
        ]
    })
    @IsArray()
    ingredients?: IngredientsInterface[]
}
