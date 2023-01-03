import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString } from "class-validator"

export class CreateItemDto {
    
    @ApiProperty({example: '399eeb87-43d1-4762-936e-a8a97944153a',})
    @IsString()
    product_id: string

    @ApiProperty({example: 1,})
    @IsInt()
    amount: number
}
