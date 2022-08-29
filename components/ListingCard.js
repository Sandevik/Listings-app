import React, { useEffect, useState } from 'react'
import styles from "../styles/components/Listingcard.module.css";
import Image from 'next/image';
import Link from 'next/link';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function ListingCard({listing}) {
    const [activeImage, setActiveImage] = useState(0);
    const [available, setAvailable] = useState({
        from: listing?.availableFrom,
        until: listing?.availableUntil,
    })
    const handleImageChange = (sign) =>{
        if (sign === "+" ){
            if (activeImage >= listing?.images?.length - 1){
                setActiveImage(0);
            }else if (activeImage < listing?.images?.length - 1){
                setActiveImage(activeImage+1);
            }
        }else if (sign === "-" ){
            if (activeImage <= 0){
                setActiveImage(listing?.images?.length - 1);
            }else if (activeImage > 0){
                setActiveImage(activeImage-1);
            }
        }
    }



  return (
    <div className={styles.container}>
        <Link href={`/listing/${listing?.id}`}>
            <Image priority className={styles.image} src={listing?.images?.[activeImage]} alt={listing?.title} layout="responsive" width={"300px"} height={"300px"}/>
        </Link>
        {listing?.images?.length > 1 ?  <div onClick={()=>handleImageChange("+")} className={styles.next}><PlayCircleFilledIcon /></div> : ""}
        {listing?.images?.length > 1 ?  <div onClick={()=>handleImageChange("-")} className={styles.prev}><PlayCircleFilledIcon /></div> : ""}
        
        {listing?.images?.length > 1 ? 
            <div className={styles.dotContainer}>
            {listing[0]?.images?.map((iteration, i) => (
              activeImage === i ? <span className={`${styles.dot} ${styles.on}`}></span> : <span className={styles.dot}></span>
            ))}
            </div>
          : ""}

        <Link href={`/listing/${listing?.id}`}>
        <div className={styles.text}>
            <div className={styles.location}><span>{listing?.location}</span></div>
            <span className={styles.type}>{listing?.type} | {listing?.title}</span>
            <div className={styles.price}><span>{listing?.price}</span> <span>kr/month</span></div>
            {!available.from && !available.until ? <div className={styles.date}><span>-</span> <NavigateNextIcon /> <span>-</span> </div> : <div className={styles.date}><span>{available.from}</span> <NavigateNextIcon /> <span>{available.until}</span> </div>}
        </div>
        </Link>
    </div>
  )
}

export default ListingCard