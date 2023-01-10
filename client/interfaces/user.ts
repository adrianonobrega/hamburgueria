export interface Login {
   email:string
   password:string
  }

export interface User {
   id: string
   name:string
	email:string
	password:string
	cpf:string
	phone:string
	address:{
		address:string
		cep:string
		state:string
		city:string
		number:string
		complement:string
		country:string
	}
}  

export interface Decode{
   email: string
   role: string
   sub: string
}