import React from 'react'
import styles from "../styles/components/Footer.module.css"
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className={styles.footer}>
      <a className={styles.link} href="https://www.linkedin.com/in/simon-sandevik/"><span>Simon Sandevik 2022</span> <LinkedInIcon /></a>
    </div>
  )
}

export default Footer