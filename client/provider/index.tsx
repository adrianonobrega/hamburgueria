import { ReactNode } from 'react'
import { ProductProvider } from './product'
import { CartProvider } from './cart'
import { UserProvider } from './user'
import { AuthProvider } from './auth'

interface ProviderProps {
  children: ReactNode
}

const Providers = ({ children }: ProviderProps) => {
  return(
    <AuthProvider>
      <ProductProvider>
      <UserProvider>
      <CartProvider>
      {children}
      </CartProvider>
      </UserProvider>
      </ProductProvider>
    </AuthProvider>
    
    
    )
}

export default Providers