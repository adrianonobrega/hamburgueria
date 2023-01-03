import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateUserDto {
    
    @IsOptional()
    name?: string

    @ApiProperty({example: 'paulosalvatore@gmail.com',})
    @IsOptional()
    email?:string

    @IsOptional()
    password?: string

    @IsOptional()
    cpf?:string

    @ApiProperty({example: '(83)989851234',})
    @IsOptional()
    phone?: string

    @IsOptional()
    birthdate?: string

}
