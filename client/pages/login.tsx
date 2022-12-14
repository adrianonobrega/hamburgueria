import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';

function Login(){
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;