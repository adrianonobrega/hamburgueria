import { ApiProperty } from "@nestjs/swagger"


export class UpdateAddressDto{
    
    id: string
    @ApiProperty({example: "Rua Alberto Lima",})
    address?: string

    @ApiProperty({example: "22775550",})
    cep?: string

    @ApiProperty({example: "RJ",})
    state?: string

    @ApiProperty({example: "Rio de janeiro",})
    city?: string

    @ApiProperty({example: "21",})
    number?: string

    @ApiProperty({example: "casa",})
    complement?: string

    @ApiProperty({example: "Brasil",})
    country?: string
}
