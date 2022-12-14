import { ReactNode } from 'react'
import { ProductProvider } from './product'
import { CartProvider } from './cart'

interface ProviderProps {
  children: ReactNode
}

const Providers = ({ children }: ProviderProps) => {
  return(
    <ProductProvider>
      <CartProvider>
      {children}
      </CartProvider>
    </ProductProvider>
    
    )
}

export default Providers