import Link from 'next/link'
import React from 'react'
import styles from "../styles/components/Categorybar.module.css"
import {getCategories} from "../controllers/getCategories"

function CategoryBar() {
  const categories = getCategories();
  return (
    <ul className={styles.main}>
        {categories.map(category => (
        <Link key={category} href={`/category/${category}`}>
            <li>{category}</li>
        </Link>
        ))}
    </ul>
  )
}

export default CategoryBar