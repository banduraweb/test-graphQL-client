import React from 'react';
import {server} from '../../lib/api';
import {ListingsData} from './types'

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

export const Listings = () => {
 const fetchListings = async ()=> {
  const {data} = await server.fetch<ListingsData>({query: LISTINGS});
  console.log(data);
 };
 return (
   <>
   <h1>Hello</h1>
    <button onClick={fetchListings}>Fetch listings</button>
    </>
   )


};