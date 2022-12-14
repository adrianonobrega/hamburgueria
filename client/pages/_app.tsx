import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '../provider'
import React from 'react';
import 'antd/dist/reset.css';

export default function App({ Component, pageProps }: AppProps) {
  return(
  <Providers>
    <Component {...pageProps} />
  </Providers>
  
  )
}
