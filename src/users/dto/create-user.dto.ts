import { Role } from "./role.enum"

export class CreateUserDto {
    id?: string
    name : string
    email:string
    password: string
    cpf:string
    phone: string
    birthdate?: string
    role: Role[]
    address:{
    address: string
    cep: string
    state: string
    city: string
    number: string
    complement?: string
    country: string
    }
}
