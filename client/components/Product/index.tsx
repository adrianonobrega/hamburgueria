import { useContext, useEffect, useState } from 'react';
import {ProductContex} from '../../provider/product'
import { ProductProps } from '../../interfaces/product';
import { Button } from '../Button';
import { CartContex } from '../../provider/cart';

export function Product() {
  const {filter} = useContext(ProductContex)
  const {cart,setCart,addCart} = useContext(CartContex)


   

  return (
   <div className='w-[1078px] mt-[32px] ml-[115px]  flex-wrap'>
   
    <ul className='flex w-[1078px] space-x-4 flex-wrap justify-between '>
    {filter.map((item: ProductProps) => (
      <li key={item.id} className='w-[300px] h-[346px] border-2 border-[gray] mb-[10px]'>
        <div className='bg-gray flex justify-center'>
        <img className='w-[150px] h-[150px]' src={item.img}/>
        </div> 
        
        <h4 className='font-bold text-[18px] font-[Inter] ml-[21px] mt-[27px]'>{item.name}</h4>
        <h4 className='font-normal text-[12px] font-[Inter] ml-[22px] mt-[10px] text-category '>{item.category}</h4>
        <h4 className='font-semibold text-[14px] font-[Inter] ml-[22px] mt-[14px] text-green '>R$ {item.price}</h4>
        <Button md={false} onClick={() => addCart(item.id)}>Adicionar</Button>
      </li>
    ))}
    </ul>
   </div>
  );
}
