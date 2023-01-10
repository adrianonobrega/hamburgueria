import {FiShoppingCart} from 'react-icons/fi'
import { useContext } from 'react';
import { CartContex, CartProps } from '../../provider/cart';
import { ProductContex } from '../../provider/product';
import { ProductProps } from '../../interfaces/product';

export function Header() {
  const {cart} = useContext(CartContex)
  const {search,setSearch} = useContext(ProductContex)
    let quantity = cart.reduce(function(soma,item:CartProps) {
      return soma + item.quantity
    },0)

    
  return (
    <>
    <div className='flex  h-20 bg-gray '>
      <div className='mt-[12px] ml-[109.19px] flex font-serif'>
      <h1 className='mr-[5px] text-[30px] text-black '>Burguer</h1>
      <h2 className='text-pink mt-[15px]'>Kenzie</h2>
      </div>
      <div>
      <h6>{quantity}</h6>
      <FiShoppingCart/>
      </div>
      <div>
        <input type="text" onChange={(ev) => setSearch(ev.target.value)} value={search}/>
      </div>
    
    </div>
      
    </>
  );
}
