import React, { useState, useEffect } from 'react';
import {server} from '../../lib/api';
import { ListingsData, DeleteListingsData, DeleteListingsVariables, IListings } from './types';

const LISTINGS = `
  query Listings {
    listings {
    id
    title
    image
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListings($id: ID!) {
    deleteListings(id: $id) {
    id
    }
  }
`;

export const Listings = () => {

  const [listings, setListings] = useState<IListings[]>([]);
  useEffect(()=>{
    fetchListings()
  }, []);

 const fetchListings = async ()=> {
  const {data} = await server.fetch<ListingsData>({query: LISTINGS});
   setListings(data.listings);
 };

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>(
      {
        query: DELETE_LISTING,
        variables: {
          id
        }
      });
    fetchListings()
  };




  const listingsList = listings ? (
    <ul>
      {listings.map(listing=>(
        <li key={listing.id}>
          {listing.title}
        <button onClick={()=>deleteListings(listing.id)}>delete</button>
        </li>
      ))}
    </ul>
  ) : null;

 return (
   <>
     {listingsList}
    </>
   )
};