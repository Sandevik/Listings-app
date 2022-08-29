import Link from 'next/link'
import React, { useState } from 'react'
import styles from "../styles/components/SideMenu.module.css"
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {useSession, signOut, signIn} from "next-auth/react"

function MenuSideBar({active, setActive}) {
  const {data: session} = useSession()



  
  return (
    <div onClick={()=>setActive(!active)} className={!active ? `${styles.container}` : `${styles.container} ${styles.active}`}>
      {session ? <div>Logged in as: {session?.user?.name}</div> : ""}
      <div className={styles.firstSec}>
        <Link href="/about"><div className={`${styles.textAndIcon} ${styles.additional}`}>About us <InfoIcon className={styles.icon} /></div></Link>
        {!session ? 
        <div onClick={signIn} className={styles.textAndIcon}>Log in <LoginIcon /></div>
        : <div onClick={signOut} className={`${styles.textAndIcon} ${styles.nullifyBtn}`}>Log out <LogoutIcon /></div>}
        <Link rel="no-follow" href="/my-account">{session ? <div className={styles.textAndIcon}> My Account <AccountCircleIcon /></div> : <div className={styles.textAndIcon}> My Account <LockIcon /></div>}</Link>
      </div>
      <div onClick={()=>alert("There are no sesstings to change.")} className={styles.textAndIcon}>Settings <SettingsIcon className={styles.icon} /></div>
    </div>
  )
}

export default MenuSideBar