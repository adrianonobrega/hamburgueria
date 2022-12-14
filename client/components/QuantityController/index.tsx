import { CartContex, CartProps } from '../../provider/cart';
import { useContext } from 'react';
import { ProductProps } from '../../interfaces/product';



export const QuantityController = ({ product }) => {
  const {addProduct,removeProduct } = useContext(CartContex)


  return (
    <>
      <button onClick={() => removeProduct(product.id)}> - </button>
      <span>{product.quantity}</span>
      <button onClick={() => addProduct(product.id)}> + </button>
    </>
  );
};