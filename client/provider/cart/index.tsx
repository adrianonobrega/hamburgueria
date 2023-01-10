import { createContext, ReactNode, useContext, useState, useCallback } from 'react';
import { ProductProps } from '../../interfaces/product';
import { ProductContex } from '../product';


interface CartContextValue {
  cart: []
  setCart: (data: {} | undefined | any) => void;
  addCart: any
  removeCart: any
  count: number
  setCount: (data: {} | undefined | any) => void;
  addProduct: any
  removeProduct: any
  total: number
  clearCart: any
}

interface Props {
  children: ReactNode
}

const CartInitial: CartContextValue = {

  cart: [],
  setCart: (data: any) => { },
  addCart: (id: number) => { },
  removeCart: (id: number) => { },
  count: 0,
  setCount: (id: number) => { },
  addProduct: (id: number) => { },
  removeProduct: (id: number) => { },
  total: 0,
  clearCart: (id: number) => { },
}

export interface CartProps {
  id: string | any
  img: string | any
  name: string | any
  category: string | any
  price: string | any
  quantity: number
}

interface Cart {
  id: string | any
  img: string | any
  name: string | any
  category: string | any
  price: string | any
  quantity: number

}

export const CartContex = createContext<CartContextValue>(CartInitial)


export const CartProvider = ({ children }: Props) => {
  const { product } = useContext(ProductContex)
  const [cart, setCart] = useState([])
  const [count, setCount] = useState(CartInitial.count)


  function addCart(id: string) {

    const carrinho = product.find((item: CartProps) => item.id === id);
    console.log(carrinho, "carrinho")
    const obj = {
      id: carrinho.id,
      img: carrinho.img,
      name: carrinho.name,
      category: carrinho.category,
      price: carrinho.price,
      quantity: 1
    }

    const estarNoCarrinho = cart.find((item: CartProps) => item.id === obj.id);
    
    if (estarNoCarrinho === undefined) {
      setCart([...cart, obj]);
    }


  }

  function addProduct(id: CartProps) {
    const copy = [...cart]
    const item = copy.find((item: CartProps) => item.id === id);
    if (!item) {
      copy.push({
        id: item.id,
        img: item.img,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: 1
      })
    }
    else {
      item.quantity = item.quantity + 1
    }
    setCart(copy)
  }

  function removeProduct(id: CartProps) {
    const copy = [...cart]
    const item = copy.find((item: CartProps) => item.id === id);

    if (item.quantity > 1) {
      item.quantity = item.quantity - 1
      setCart(copy)
    }
    else {
      const filter = copy.filter((product) => product.id !== id)
      setCart(filter)
    }
  }

  function removeCart(id: number) {
    const remove = cart.filter((item) => {
      return item.id !== id
    })
    setCart(remove)
  }

  function clearCart() {
    setCart([])
  }

  const total = !cart.length ? 0 : cart.reduce(function (valor, lista) {
    let a = lista.price * lista.quantity
    return valor + a
  }, 0);


  return (
    <CartContex.Provider value={{ cart, setCart, addCart, removeCart, count, setCount, addProduct, removeProduct, total, clearCart }}>
      {children}
    </CartContex.Provider>
  );
};