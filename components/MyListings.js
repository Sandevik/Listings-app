import React, { useEffect, useState } from 'react'
import { useListings } from '../controllers/useListings'
import {useSession} from "next-auth/react"
import ListingCard from "./ListingCard"
import main from "../styles/pages/Home.module.css";
import styles from "../styles/pages/Mylistings.module.css";
import Link from 'next/link';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function MyListings({active}) {
    const {data: session} = useSession();
    const {listings} = useListings();
    const [filtered, setFiltered] = useState([]);
    useEffect(()=>{
        const filter = async () => {
            setFiltered( listings.filter(listing => (listing?.ownerEmail === session?.user?.email)));
        }
        filter();
    },[listings, session])

    const handleDelete = async (listing) => {
        const response = prompt("Type \"DELETE\" to confirm")
        if (response === "DELETE" && listing.ownerEmail === session?.user?.email){
            await deleteDoc(doc(db, "listings", listing?.id))
            alert("Delete successful");
        }else{
            alert("Statment did not match, aborted");
        }
    }

  return (
    <div className={`${main.listings} ${main.top}`}>{filtered.map(listing => (
    <div key={listing?.id}>
        <ListingCard listing={listing}/>
        <div className={styles.wrapper}>
            <Link rel="no-follow" href={`/edit-listing/${listing?.id}`}><button className={styles.button}>Edit</button></Link>
            <button onClick={()=>handleDelete(listing)} className={styles.button}>Remove</button>
        </div>
    </div>
    ))}</div>
  )
}

export default MyListings
