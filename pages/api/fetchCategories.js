import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"

export default function handler(req, res) {
    
    const doc = collection(db, "listings");
    const observer = onSnapshot(doc, snapshot => {
        let listings = [];
        snapshot.forEach(snap => {
            listings.push({id: snap.id, ...snap.data()})
        })
        const categories = findCategories(listings);
        observer();
        res.status(200).json({categories})
    })
}

const findCategories = (listings) => {
    let array = [];
    listings.forEach((listing) => {
      listing.category.forEach((category) => {
          if (array.includes(category)) return;
          else array.push(category);
      });
    });
    array.sort((a, b)=> a.localeCompare(b));
    return array;
  };