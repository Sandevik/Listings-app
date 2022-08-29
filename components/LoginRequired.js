import React from 'react'
import styles from "../styles/components/Loginrequired.module.css"
import {signIn} from "next-auth/react"

function LoginRequired() {
  return (
    <div className={styles.container}>
        <span>Login required to view this page.</span>
        <button onClick={signIn}>Login</button>
    </div>
  )
}

export default LoginRequired