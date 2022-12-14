import { CartContex } from "../../provider/cart";
import { useContext, useState } from "react";
import {FiTrash2} from 'react-icons/fi'
import { CartProps } from "../../provider/cart";
import { QuantityController } from "../QuantityController";
import { Button } from "../Button";

export function Cart() {
  const {cart,removeCart,total,clearCart} = useContext(CartContex)
  
  return (

   <div className="w-[365px]">
    <div className="w-[365px] h-[65px] bg-[#27AE60] flex justify-center text-center ">
        <h2>Carrinho de compras</h2>
    </div>
   <div>
    <ul>
      
    {cart.length === 0 ? (<h2>Carrinho esta vazio</h2>) : cart.map((item : CartProps) => (
      <li key={item.id} className="w-[350px] h-[200px] border-2 border-[gray] mb-[10px]">
        <FiTrash2 onClick={() => removeCart(item.id)}/>
        <QuantityController product={item}/>
        <div className='bg-gray flex justify-center w-[70px] h-[70px]'>
        {console.log(item,"product")}
        <img className='w-[150px] h-[150px]' src={item.img}/>
        </div> 
        <h4 className='font-bold text-[18px] font-[Inter] ml-[21px] mt-[27px]'>{item.name}</h4>
        <h4 className='font-normal text-[12px] font-[Inter] ml-[22px] mt-[10px] text-category '>{item.category}</h4>
        <h4 className='font-semibold text-[14px] font-[Inter] ml-[22px] mt-[14px] text-green '>R$ {item.price}</h4>
      </li>
      
    ))}
    </ul>
    
   </div>
   <h2 className="mt-[50px]">Valor Total R$ {total.toFixed(2)}</h2>
   <Button md={true} onClick={clearCart}>Limpar Carrinho</Button>
   </div>
     
    
  );
}