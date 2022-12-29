import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUser {

    @ApiProperty({example: 'paulo@gmail.com',})
    @IsString()
    email:string

    @ApiProperty({
        example: '@Adri123456',})
    @IsString()
    password: string

}