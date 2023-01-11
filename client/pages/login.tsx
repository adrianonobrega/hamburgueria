import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { Api } from '../services/api';
import { Login } from '../interfaces/user';
import { toast } from 'react-toastify'
import { useRouter } from "next/router"
import { UserContex } from '../provider/user';
import jwtDecode from 'jwt-decode';
import { Decode } from '../interfaces/user';

function Login(){
  
  const { getUser,user } = useContext(UserContex);
  const navigate = useRouter()

  const onFinish = (values: Login) => {
    Api.post(`login`,values)
    .then((res) => {
      localStorage.setItem('token',res.data.access_token)
      const decode = jwtDecode(res.data.access_token)
      getUser(decode,res.data.access_token)
      toast.success("Login efetuado com sucesso")
      navigate.push("/")
    })
    .catch((err) => {
      toast.error("Email ou senha invalidos")
      console.log(err)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <h1 className='flex justify-center'>Login</h1>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Informe o seu email" },{type: "email", message: "Informe um email valido"}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: 'Informe a sua senha' }]}
      > 
         
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className='bg-[red]' type="primary" htmlType="submit">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;