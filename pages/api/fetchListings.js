import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"

export default function handler(req, res) {
    
    const doc = collection(db, "listings");
    const observer = onSnapshot(doc, snapshot => {
        let listings = [];
        snapshot.forEach(snap => {
            listings.push({id: snap.id, ...snap.data()})
        })
        observer();
        res.status(200).json({listings})
    })
}