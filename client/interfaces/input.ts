export interface InputProps {
    icon:string
    name: string
    placeholder: string | any
    type: string
    error: string | any
    label: string
}

export interface InputRegistrationProps {
    cpf: string
    email:string
    name:string
    birth_date: string
    password: string
    cep: string,
    address: string
    number: string
    complement: string
    state: string
    city: string
    country: string
    phone: string
}

export interface InputLogin {
    email:string
    password:string
}