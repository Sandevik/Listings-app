import Head from 'next/head';
import React, { useState } from 'react'
import styles from "../styles/pages/MyAccount.module.css";
import {useSession} from "next-auth/react"
import ListAltIcon from '@mui/icons-material/ListAlt';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MyListings from '../components/MyListings';
import MyInfo from '../components/MyInfo';
import LoginRequired from '../components/LoginRequired';

function MyAccount() {
  const {data: session} = useSession();
  const [page, setPage] = useState("Listings");

  if (!session){
    return <LoginRequired />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Account</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.semiheader}>
            <button onClick={()=>setPage("Listings")} className={page === "Listings" ? `${styles.changeButton} ${styles.btnActive}` : styles.changeButton}> <span>Listings</span> <ListAltIcon /></button>
            <button onClick={()=>setPage("Information")} className={page === "Information" ? `${styles.changeButton} ${styles.btnActive}` : styles.changeButton}> <span>Information</span> <BadgeOutlinedIcon /></button>
        </div>
        <div className={styles.page}>
          {page === "Listings" ? <MyListings active={page === "listings"}/> : ""}
          {page === "Information" ? <MyInfo active={page === "Information"}/> : ""}
        </div>
      </div>
    </div>
  )
}

export default MyAccount