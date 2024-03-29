import React,{useEffect} from 'react';
import {ReactNode, useState } from 'react';
import { ProductProps } from '../../interfaces/product';
import axios from 'axios';
import { Api } from '../../services/api';


interface ProductContextValue {
  product: ProductProps[] | undefined | any;
  setProduct: (data: ProductProps[] | undefined | any) => void;
  search: string
  setSearch: (data: ProductProps[] | undefined | any) => void;
  filter:[]
}

interface Props {
  children: ReactNode
}

const ProjectInitial: ProductContextValue = {
  product: [
    {
      img: '',
      name: '',
      category: '',
      price: '',
    }
  ],
  setProduct: data => { },
  search: '',
  setSearch: (data: any) => { },
  filter: [],
}

export const ProductContex = React.createContext<ProductContextValue>(ProjectInitial)



export const ProductProvider = ({ children }: Props) => {
  const [product, setProduct] = useState(ProjectInitial.product)
  const [search,setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState();

  useEffect(() => {
    Api.get(`products/pages?`)
  .then((res) => {
    setProduct(res.data.results)
      
  })
  .catch((err) => {console.log(err)})
  }, []);

  const filter = product.filter((item:ProductProps) => {
    return item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search)
  })
    
  return (
    <ProductContex.Provider value={{ product, setProduct,search,setSearch,filter}}>
      {children}
    </ProductContex.Provider>
  );
};