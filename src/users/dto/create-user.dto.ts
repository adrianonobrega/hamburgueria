import { User } from "../entities/user.entity";
import {
    IsDate,
    IsEmail,
    IsObject,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto extends User {
    @ApiProperty({example: 'Paulo Salvatore',})
    @IsString()
    name: string;

    @ApiProperty({example: 'paulo@gmail.com',})
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '@Adri123456',
        description:"Senha forte com: minimo 4 caracteres e maximo 20,1 caractere especial,letra maiúscula,letra minúscula e números."
        
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/, {
        message: 'password too weak',
    })
    password: string;
    @ApiProperty({example: '123456789-50',})
    @IsString()

    cpf: string;

    @ApiProperty({example: '(83)992926555',})
    @IsString()
    phone: string;


    @ApiProperty({example:{
        address:"Rua josé bonifácio",
		cep:"58155000",
		state:"Centro",
		city:"Campina grande",
		number:"123",
		complement:"casa",
		country:"Brasil"
    }})
    @IsObject()
    address: {
        
        address: string; 
        cep: string; 
        state: string; 
        city: string; 
        number: string; 
        complement?: string; 
        country: string; 
    };
}
