import { useEffect, useState } from "react";
import { useListings } from "./useListings";

export const getCategories = () => {
  const { listings, isLoading } = useListings();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let array = [];
    const findCategories = () => {
      listings.forEach((listing) => {
        listing.category.forEach((category) => {
            if (array.includes(category)) return;
            else array.push(category);
        });
      });
      array.sort((a, b)=> a.localeCompare(b));
      setCategories(array);
    };
    findCategories();
  }, [listings]);

  return categories;
};
