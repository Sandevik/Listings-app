import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from "../../styles/pages/Listing.module.css"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {useListings} from "../../controllers/useListings"
import Image from 'next/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useSession} from "next-auth/react";
import CategoryBar from "../../components/CategoryBar"
import Recommendations from '../../components/Recommendations';
import Head from 'next/head';
import Link from 'next/link';

function Listing() {
    const router = useRouter();
    const {data: session} = useSession()
    const {id} = router.query
    const [activeImage, setActiveImage] = useState(0);
    const {listings} = useListings()
    const listing = listings.filter(listing => (listing.id === id));
    const [canEdit, setCanEdit] = useState(false);

    useEffect(()=>{
      const check = () => {
        setCanEdit(listing[0]?.ownerEmail === session?.user?.email)
      }
      check();
    },[listing, session])


    const handleImageChange = (sign) =>{
      if (sign === "+" ){
          if (activeImage >= listing[0]?.images?.length - 1){
              setActiveImage(0);
          }else if (activeImage < listing[0]?.images?.length - 1){
              setActiveImage(activeImage+1);
          }
      }else if (sign === "-" ){
          if (activeImage <= 0){
              setActiveImage(listing[0]?.images?.length - 1);
          }else if (activeImage > 0){
              setActiveImage(activeImage-1);
          }
      }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>{listing[0]?.title + " | Listing"}</title>
      </Head>
      <CategoryBar />
      <div className={styles.wrapper}>
        <div className={styles.upper}>
        <div className={styles.image}>
          <Image priority src={listing[0]?.images?.[activeImage]} alt={listing[0]?.title} layout="responsive" width={"470px"} height={"300px"}/>
          {listing[0]?.images?.length > 1 ?  <div onClick={()=>handleImageChange("+")} className={styles.next}><PlayCircleFilledIcon /></div> : ""}
          {listing[0]?.images?.length > 1 ?  <div onClick={()=>handleImageChange("-")} className={styles.prev}><PlayCircleFilledIcon /></div> : ""}
          
          {listing[0]?.images?.length > 1 ? 
            <div className={styles.dotContainer}>
            {listing[0]?.images?.map((iteration, i) => (
              activeImage === i ? <span className={`${styles.dot} ${styles.on}`}></span> : <span className={styles.dot}></span>
            ))}
            </div>
          : ""}
        </div>
         <div className={styles.desc}>
            <h3>Description: </h3>
            <hr />
            <span>{listing[0]?.desc}</span>
            <div className={styles.options}>
              <button className={styles.actions}>Contact</button>
              {canEdit ? 
              <Link href={`/edit-listing/${listing[0]?.id}`}>
                <button className={styles.actions}>Edit Listing</button>
              </Link>
              : ""}
            </div>
         </div>
        </div>

        <div className={styles.text}>
            <div className={styles.location}><span>{listing[0]?.location}</span></div>
            <span className={styles.type}>{listing[0]?.type} | {listing[0]?.title}</span>
            <div className={styles.price}><span>{listing[0]?.price}</span> <span>kr/month</span></div>
            {!listing[0]?.availableFrom && !listing[0]?.availableUntil ? <div className={styles.date}><span>-</span> <NavigateNextIcon /> <span>-</span> </div> : <div className={styles.date}><span>{listing[0]?.availableFrom}</span> <NavigateNextIcon /> <span>{listing[0]?.availableUntil}</span> </div>}
        </div>
        <Recommendations category={listing[0]?.category[0]} location={listing[0]?.location} id={listing[0]?.id}/>
      </div>
    </div>
  )
}

export default Listing
