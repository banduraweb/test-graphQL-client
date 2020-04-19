import React from 'react';
import {server, useQuery} from '../../lib/api';
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

  const {data} = useQuery<ListingsData>(LISTINGS);



  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>(
      {
        query: DELETE_LISTING,
        variables: {
          id
        }
      });

  };


const listings = data ? data.listings : null;

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