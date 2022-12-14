
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { InputRegistrationProps } from "../interfaces/input";
import { Header } from "../components/Header";
import { Button, Form, Input, Checkbox } from "antd";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai'
import { CiCalendarDate } from "react-icons/ci"



function Register() {

  const onFinish = ({ email, password, name, phone, birth_date, cpf, cep, address, number, complement, country, city, state
  }: InputRegistrationProps) => {
    const obj = {
      email: email,
      password: password,
      name: name,
      phone: phone,
      birth_date: birth_date,
      cpf: cpf,
      cep: cep,
      address: address,
      number: number,
      complement: complement,
      country: country,
      city: city,
      state: state
    }
    console.log(obj)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <h1 className='text-center'>Cadastrar Usuario</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 5 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className='ml-[150px]'

      >


          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Informe o seu email" }, { type: "email", message: "Informe um email valido" }]}
          >  
            <Input  placeholder='mail@mail.com' />
          </Form.Item>

          <Form.Item
            label="CPF"
            name="cpf"
            rules={[{ required: true, message: "Informe o seu CPF" }]}
          >
           
            <Input  placeholder='123.456.789-90' />
          </Form.Item>
          <Form.Item
            label="Nome Completo"
            name="name"
            rules={[{ required: true, message: "Informe o seu nome completo" }]}
          >
           
            <Input  placeholder='Ex: João Figueiredo Costa' />
          </Form.Item>
          <Form.Item
            label="Data de Nascimento"
            name="birth_date"

          >
            
            <Input  placeholder='10/01/2000' />
          </Form.Item>
          <Form.Item
            label="Senha (mínimo 6 caracteres)"
            name="password"
            rules={[{ required: true, message: 'Informe a sua senha' }]}
          >
            <Input.Password />
          </Form.Item>
          <h2 className='flex justify-center'>Endereço</h2>

          <div>
            <Form.Item
              label="CEP"
              name="cep"
              rules={[{ required: true, message: "Informe o seu cep" }]}
            >
             
              <Input  placeholder='Ex: 12365-500' />
            </Form.Item>
          </div>
          <Form.Item
            label="Endereço"
            name="address"
            rules={[{ required: true, message: "Informe o seu endereço" }]}
          >
           
            <Input placeholder='Rua joão figueiredo' />
          </Form.Item>
          <Form.Item
            label="Número"
            name="number"
            rules={[{ required: true, message: "Informe o seu número" }]}
          > 
            <Input placeholder='26 ou s/n' />
          </Form.Item>
          <Form.Item
            label="Complemento"
            name="complement"
          > 
            <Input  placeholder='Ex: casa' />
          </Form.Item>

          <Form.Item
            label="Bairro"
            name="country"
            rules={[{ required: true, message: "Informe o seu Bairro" }]}

          >
           
            <Input  placeholder='Ex: Jacarepagua' />
          </Form.Item>
          <Form.Item
            label="Cidade"
            name="city"
            rules={[{ required: true, message: "Informe a sua cidade" }]}
          > 
            <Input  placeholder='Ex: Rio de janeiro' />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="state"
            rules={[{ required: true, message: "Informe o seu Estado" }]}
          > 
            <Input placeholder='Ex: RJ' />
          </Form.Item>
          <Form.Item
            label="Telefone"
            name="phone"
            rules={[{ required: true, message: "Informe o seu numero de telefone" }]}
          >
            
            <Input  placeholder='Ex: (21)99999-9999' />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>



        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='bg-[red] w-[200px]' type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </>

  )
}
export default Register