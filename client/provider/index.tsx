import { ReactNode } from 'react'
import { ProductProvider } from './product'
import { CartProvider } from './cart'
import { UserProvider } from './user'

interface ProviderProps {
  children: ReactNode
}

const Providers = ({ children }: ProviderProps) => {
  return(
    <ProductProvider>
      <UserProvider>
      <CartProvider>
      {children}
      </CartProvider>
      </UserProvider>
      
    </ProductProvider>
    
    )
}

export default Providers