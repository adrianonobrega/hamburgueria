import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Header } from '../components/Header'
import { Product } from '../components/Product'
import { Cart } from '../components/Cart'

export default function Home() {
  return (
    <>
   <Header/>
   <div className='flex'>
   <Product/>
   <Cart/>
   </div>
   
    </>
  )
}
