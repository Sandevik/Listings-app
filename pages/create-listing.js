import React, { useEffect, useState } from 'react'
import {useRouter} from "next/router"
import {useSession} from "next-auth/react"
import styles from "../styles/pages/Createlisting.module.css";
import ListingCard from "../components/ListingCard";
import {getCategories} from "../controllers/getCategories"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Head from 'next/head';
import LoginRequired from "../components/LoginRequired";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import preview from "../styles/pages/Listing.module.css"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import Image from 'next/image';


function Createlisting() {
    const router = useRouter();
    const {data: session} = useSession();
    const email = session?.user?.email;
    console.log(email);
    const [temp, setTemp] = useState("");
    const [activeImage, setActiveImage] = useState(0);
    const [image, setImage] = useState("");
    const [form, setForm] = useState({
        ownerEmail: "",
        title: "",
        price: "",
        category: [],
        desc: "",
        availableFrom: "",
        availableUntil: "",
        images: [],
        type: "other",
        location: ""
    });
    const types = getCategories()

    const createListing = async() => {
        if (form.title && form.price && form.category.length > 0 && form.desc && form.images.length > 0 && form.type && form.location && session?.user != undefined){
            const successful = await addDoc(collection(db, "listings"), {...form, ownerEmail: session?.user?.email});
            if (successful){
                router.push("/my-account");
            }
        }else{
            throw new Error("All fields are not filled or user not logged in, try again.");
        }
    }




    const handleAddCategory = () => {
        setForm({...form, category: [...form.category, temp]});
        setTemp("");
    }
    const handleAddImages = () => {
        setForm({...form, images: [...form.images, image]});
        setImage("");
    }

    if (!session){
        return <LoginRequired />;
    }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <fieldset className={styles.form}>
                <legend>Create a new listing</legend>
            <div className={styles.group}>
                <label htmlFor="">Title:</label>
                <input type="text" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})}/>
            </div>
            <div className={styles.group}>
                <label htmlFor="">Price:</label>
                <input type="text" value={form.price} onChange={(e)=>setForm({...form, price: e.target.value})}/>
            </div>
            <div className={styles.group}>
                <label htmlFor="">Category:</label>
                <input type="text" value={temp} onChange={(e)=>setTemp(e.target.value)}/>
                <button onClick={handleAddCategory}>Add category</button>
            </div>
            <div className={styles.group}>
                <label htmlFor="description">Desc:</label>
                <textarea name="description" cols="30" rows="10" onChange={(e)=>setForm({...form, desc: e.target.value})}>{form.desc}</textarea>
            </div>
            
            <div className={styles.group}>
                <label htmlFor="">Type of listing:</label>
                <select value={form.type} className={styles.select} onChange={(e) => setForm({...form, type: e.target.value})}>
                    {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                    <option value={"other"}>Other</option>
                </select>
            </div>

            <div className={styles.group}>
                <label htmlFor="">Available from:</label>
                <input type="date" value={form.availableFrom} onChange={(e)=>setForm({...form, availableFrom: e.target.value})}/>
            </div>
            <div className={styles.group}>
                <label htmlFor="">Available until:</label>
                <input type="date" value={form.availableUntil} onChange={(e)=>setForm({...form, availableUntil: e.target.value})}/>
            </div>

            <div className={styles.group}>
                <label htmlFor="">Images:</label>
                <input type="text" value={image} placeholder="URL" onChange={(e)=>setImage(e.target.value)}/>
                <button onClick={handleAddImages}>Add image</button>
            </div>

            <div className={styles.group}>
                <label htmlFor="">Location:</label>
                <input type="text" value={form.location} onChange={(e)=>setForm({...form, location: e.target.value})}/>
            </div>


            <button onClick={createListing}>Create Listing</button>

            </fieldset>

            {form.title && form.price && form.images.length > 0 && form.location && form.availableFrom && form.availableUntil && form.category && form.desc && form.type ? 
            <div className={styles.preview}>
            <div className={preview.upper}>
                <div className={preview.image}>
                    <Image priority src={form?.images?.[activeImage]} alt={form?.title} layout="responsive" width={"470px"} height={"300px"}/>
                    {form?.images?.length > 1 ?  <div onClick={()=>handleImageChange("+")} className={preview.next}><PlayCircleFilledIcon /></div> : ""}
                    {form?.images?.length > 1 ?  <div onClick={()=>handleImageChange("-")} className={preview.prev}><PlayCircleFilledIcon /></div> : ""}
          
                    {form?.images?.length > 1 ? 
                        <div className={preview.dotContainer}>
                        {form?.images?.map((iteration, i) => (
                        activeImage === i ? <span className={`${preview.dot} ${preview.on}`}></span> : <span className={preview.dot}></span>
                    ))}
                        </div>
                    : ""}
                 </div>
         <div className={preview.desc}>
            <h3>Description: </h3>
            <hr />
            <span>{form?.desc}</span>
         </div>
        </div>

        <div className={preview.text}>
            <div className={preview.location}><span>{form?.location}</span></div>
            <span className={preview.type}>{form?.type} | {form?.title}</span>
            <div className={preview.price}><span>{form?.price}</span> <span>kr/month</span></div>
            {!form?.availableFrom && !form?.availableUntil ? <div className={preview.date}><span>-</span> <NavigateNextIcon /> <span>-</span> </div> : <div className={preview.date}><span>{form?.availableFrom}</span> <NavigateNextIcon /> <span>{form?.availableUntil}</span> </div>}
            </div>
            </div>
            :
            ""
            }



            
        </div>
    </div>
  )
}

export default Createlisting