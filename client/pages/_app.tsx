import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '../provider'
import React from 'react';
import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return(
  <Providers>
    <ToastContainer/>
    <Component {...pageProps} />
  </Providers>
  
  )
}
