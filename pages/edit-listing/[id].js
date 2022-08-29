import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from "../../styles/pages/Listing.module.css"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {useListings} from "../../controllers/useListings"
import Image from 'next/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useSession} from "next-auth/react";
import CategoryBar from "../../components/CategoryBar"
import Head from 'next/head';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import LoginRequired from '../../components/LoginRequired';

function Listing() {
    const router = useRouter();
    const {data: session} = useSession()
    const {id} = router.query
    const [activeImage, setActiveImage] = useState(0);
    const {listings} = useListings()
    const listing = listings.filter(listing => (listing.id === id));
    const [canEdit, setCanEdit] = useState(false);
    const [form, setForm] = useState({});
    const [tempUrl, setTempUrl] = useState("");


    useEffect(()=>{
      const check = () => {
        setCanEdit(listing[0]?.ownerEmail === session?.user?.email)
      }
      check();
    },[listing, session])

    useEffect(()=>{
      setForm(listings[0])
    }, [listings])

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

  const handleUrl = () =>{
    setForm({...form, images: [...form.images, tempUrl]});
    setTempUrl("");
  }

  const handleSubmit = async() => {
    setDoc(doc(db, "listings", form.id), form);
    alert("Edit successful")
    router.push("/my-account");
  }


  if (!canEdit){
    return <LoginRequired />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{listing[0]?.title + " | Edit"}</title>
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
            <textarea className={styles.textarea} cols="30" rows="10" value={form?.desc} onChange={(e)=>setForm({...form, desc: e.target.value})}></textarea>
            <div className={styles.options}>
              <button onClick={handleSubmit} className={styles.actions}>Submit edit</button>
            </div>
         </div>
        </div>

        <div className={styles.text}>
            <div className={styles.location} ><input type="text" className={styles.input} value={form?.location}  onChange={(e)=>setForm({...form, location: e.target.value})}/></div>
            <span className={styles.type}>{form?.type} | <input type="text" className={styles.input} value={form?.title}  onChange={(e)=>setForm({...form, title: e.target.value})}/></span>
            <div className={styles.price}><input type="number" className={styles.input} value={form?.price}  onChange={(e)=>setForm({...form, price: e.target.value})}/> <span>kr/month</span></div>
            {!form?.availableFrom && !form?.availableUntil ? 
            <div className={styles.date}><span>-</span> <NavigateNextIcon /> <span>-</span> </div> : 
            <div className={styles.date}><input type="date" className={styles.input} value={form?.availableFrom}  onChange={(e)=>setForm({...form, availableFrom: e.target.value})} id="" /> <NavigateNextIcon /> <input type="date" className={styles.input} value={form?.availableUntil} onChange={(e)=>setForm({...form, availableUntil: e.target.value})} id="" />
            </div>}
            <label htmlFor="">Add more images</label>
            <input type="text" className={styles.input} placeholder='URL:' onChange={(e)=>setTempUrl(e.target.value)}/>
            <button className={styles.actions} onClick={handleUrl}>Add image</button>
            
        </div>
      </div>
    </div>
  )
}

export default Listing
