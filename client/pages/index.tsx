import { Header } from '../components/Header'
import { Product } from '../components/Product'
import { Cart } from '../components/Cart'

export default function Home() {
  return (
    <>
   <Header/>
   <div className='flex'>
   <Product/>
   </div>
   
    </>
  )
}
