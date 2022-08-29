import React from 'react'
import Link from "next/link"
import styles from "../styles/components/Header.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Header({menuActive, setMenuActive}) {
  return (
    <div className={styles.wrapper}>
        <div className={styles.navlinks}>
            <Link href="/"><div className={styles.navlink}>RentMe</div></Link>
            <Link href="/about"><div className={`${styles.navlink} ${styles.additional}`}>About</div></Link>
            <Link rel="no-follow" href="/create-listing"><div className={styles.navlink}>Create listing</div></Link>
        </div>
        <button className={!menuActive ? `${styles.menuBtn}` : `${styles.menuBtn} ${styles.menuActive}`} onClick={()=>setMenuActive(!menuActive)}>{!menuActive ? <MenuIcon />: <CloseIcon />}</button>
    </div>
  )
}

export default Header