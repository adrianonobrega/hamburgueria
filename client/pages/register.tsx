import { InputRegistrationProps } from "../interfaces/input";
import { Button, Form, Input, Checkbox } from "antd";
import { Api } from '../services/api';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function Register() {
  const { register, handleSubmit } = useForm();
  const [form] = Form.useForm();
  const [cep,setCep] = useState()
  const navigate = useRouter()
  
  const onFinish = (values: InputRegistrationProps) => {
  
    const value = {
      email: values.email,
      cpf: values.cpf,
      name: values.name,
      birth_date: values.birth_date,
      password: values.password,
      phone: values.phone,
      address:{
        address: values.address,
        cep: cep,
        state: values.state,
        city: values.city,
        number: values.number,
        complement: values.complement,
        country: "Brasil"
      }
    }
    Api.post('users', value)
      .then((res) => {
        toast.success("Usuario cadastrado com sucesso")
        navigate.push("/login")
      })
      .catch((err) => {
        toast.error("Não foi possivel cadastrar usuario, tente novamente mais tarde")
        console.log(err)
      })
  }

  const checkCep = (e: any) => {
    if (e !== undefined) {
      const cep = e.target.value.replace(/\D/g, '');

      if (cep.length !== 8) {
        return
      }

      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => {
          setCep(res.data.cep)
          form.setFieldsValue({
            cep: res.data.cep,
            address: res.data.logradouro,
            state: res.data.uf,
            city: res.data.localidade,
          });
        })
        .catch((err) => console.log(err))
    }
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
        form={form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Informe o seu email" }, { type: "email", message: "Informe um email valido" }]}
        >
          <Input placeholder='mail@mail.com' />
        </Form.Item>

        <Form.Item
          label="CPF"
          name="cpf"
          rules={[{ required: true, message: "Informe o seu CPF" }]}
        >

          <Input placeholder='123.456.789-90' />
        </Form.Item>
        <Form.Item
          label="Nome Completo"
          name="name"
          rules={[{ required: true, message: "Informe o seu nome completo" }]}
        >

          <Input placeholder='Ex: João Figueiredo Costa' />
        </Form.Item>
        <Form.Item
          label="Data de Nascimento"
          name="birth_date"

        >

          <Input placeholder='10/01/2000' />
        </Form.Item>
        <Form.Item
          label="Senha (mínimo 6 caracteres)"
          name="password"
          rules={[{ required: true, message: 'Informe a sua senha' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Telefone"
          name="phone"
          rules={[{ required: true, message: "Informe o seu email" }]}
          >
            
            <Input placeholder="(83)99999-9999"/>
          </Form.Item>

        <div
          onClick={() => handleSubmit(checkCep)}
          >
         

          <Form.Item
          label="CEP"
          >
            
            <Input className='cep' {...register('cep')} onBlur={checkCep} />
          </Form.Item>
          <Button type='primary'>Pesquisar</Button>
        </div>


        <Form.Item
          label="Endereço"
          name="address"

          rules={[{ required: true, message: "Informe o seu endereço completo" }]}
        >

          <Input placeholder='Ex: Rua Alberto Lima' />
        </Form.Item>

        <Form.Item
          label="Estado"
          name='state'

          rules={[{ required: true, message: "Informe o seu estado" }]}
        >

          <Input
            
            onChange={checkCep}

          />

        </Form.Item>

        <Form.Item
          label="Cidade"
          name="city"
          rules={[{ required: true, message: "Informe a sua cidade" }]}
        >

          <Input placeholder='Ex: Rio de janeiro' />
        </Form.Item>

        <Form.Item
          label="Numero"
          name="number"
          rules={[{ required: true, message: "Informe o numero da residencia" }]}
        >

          <Input placeholder='Ex: 1234' />
        </Form.Item>

        <Form.Item
          label="Complemento"
          name="complement"
        >

          <Input placeholder='Ex: casa' />
        </Form.Item>

        <Form.Item
          label="País"
          name="country"
        >

          <Input placeholder='Ex: Brasil' />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Button type='primary' htmlType='submit'>Cadastrar</Button>
      </Form>
    </>
  )
}
export default Register