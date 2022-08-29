import React from 'react'
import loader from "../styles/components/Loader.module.css";

function Loader() {
  return (
    <div className={loader.container}>
        <div className={loader.loader}></div>
    </div>
  )
}

export default Loader