import React, { useEffect, useState } from 'react'
import { useListings } from '../controllers/useListings';
import styles from "../styles/pages/Home.module.css";
import ListingCard from "./ListingCard";

function Recommendations({ category, location, id}) {
    const {listings} = useListings();
    const [filtered, setFiltered] = useState([]);
    useEffect(()=>{
        const fetchListings = () => {
            setFiltered(listings.filter(listing => (listing.category.includes(category) && listing.id !== id && listing.location === location)));
        }
        fetchListings()
    }, [listings, id, category, location])

  return (
    <>
    {filtered.length > 0 ? 
    <>
      <h3 className={styles.rec}>We also recommend these </h3>
      <div className={styles.listings}>
          {filtered.map(listing => (
           <ListingCard listing={listing} key={listing.id+"recom"}/>))}
      </div>
    </> 
    :
    ""}
    </>
  )
}

export default Recommendations