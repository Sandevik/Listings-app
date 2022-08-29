import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import {app} from "../firebase"

export const useListings = () => {
    const [info, setInfo] = useState({listings: [], isLoading: false})
    useEffect(()=>{
        setInfo({listings: info.listings, isLoading: true})
        onSnapshot(collection(getFirestore(app), "listings"), snapshot => {
            setInfo({ 
                    listings: snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})), 
                }
            )
        })
        setInfo({listings: info.listings, isLoading: false})
    },[])

    return info;
}
