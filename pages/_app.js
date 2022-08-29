import { useState } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header'
import MenuSideBar from '../components/MenuSideBar'
import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"



function MyApp({ Component, ...pageProps }) {
  const [menuActive, setMenuActive] = useState(false);
  return (
  <SessionProvider session={pageProps.session}>
    <Header menuActive={menuActive} setMenuActive={setMenuActive}/>
    <MenuSideBar active={menuActive} setActive={setMenuActive}/>
    <Component {...pageProps} />
    <Footer />
  </SessionProvider>
  )
}

export default MyApp
