import { CartContex } from "../../provider/cart";
import { useContext, useState } from "react";
import { FiTrash2 } from 'react-icons/fi'
import { CartProps } from "../../provider/cart";
import { QuantityController } from "../QuantityController";
import { Button } from 'antd';
import { Api } from "../../services/api";
import { UserContex } from "../../provider/user";
import { ProductProps } from "../../interfaces/product"
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface IOrder {
  name: string
  id: string
}

interface IItem {
  id: string
  quantity: number
  status: string
  total: number
}

export function Cart() {
  const { cart, removeCart, total, clearCart } = useContext(CartContex)
  const { user } = useContext(UserContex)
  const token = localStorage.getItem('token')
  const navigate = useRouter()
  
  function Order() {

    const orderData = {
      table: 1,
      name: user.name,
      
    }
    Api.post(`orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.id,"deucerto")
        cart.map((items: IItem) => {
          const item = {
            product_id: items.id,
            amount: items.quantity
          }
          Api.post(`order/items/${res.data.id}`, item, {

            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const update = {
            status: "Aguardando pagamento",
            total: total
          }
          Api.put(`orders/${res.data.id}`,update,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => navigate.push("/"))
        })
      })
      .catch((err) => console.log(err))
      
      toast.success("Pedido realizado com sucesso!")
      

  }

  return (

    <div className="w-[365px]">
      <div className="w-[365px] h-[65px] bg-[#27AE60] flex justify-center text-center ">
        <h2>Carrinho de compras</h2>
      </div>
      <div className="">
        <ul className="">

          {cart.length === 0 ? (<h2>Carrinho esta vazio</h2>) : cart.map((item: CartProps) => (
            <li key={item.id} className="w-[600px] flex h-[200px] border-2 border-[gray] mb-[10px]">
              {/* <FiTrash2 onClick={() => removeCart(item.id)} /> */}

              <div className='bg-gray flex justify-center w-[70px] h-[70px]'>

                <img className='w-[150px] h-[150px]' src={item.img} />
              </div>
              <QuantityController product={item} />
              <h4 className='font-bold text-[18px] font-[Inter] ml-[21px] mt-[27px]'>{item.name}</h4>
              <h4 className='font-normal text-[12px] font-[Inter] ml-[22px] mt-[10px] text-category '>{item.category}</h4>
              <h4 className='font-semibold text-[14px] font-[Inter] ml-[22px] mt-[14px] text-green '>R$ {item.price}</h4>
            </li>

          ))}
        </ul>

      </div>
      <h2 className="mt-[50px]">Valor Total R$ {total.toFixed(2)}</h2>
      <Button onClick={Order} type="primary" className="bg-[red]">Pedido</Button>
      <Button type='primary' onClick={clearCart}>Limpar Carrinho</Button>
    </div>


  );
}