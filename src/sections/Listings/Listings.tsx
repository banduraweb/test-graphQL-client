import React from 'react';
import { useQuery, useMutation} from '../../lib/api';
import { ListingsData, DeleteListingsData, DeleteListingsVariables } from './types';

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

  const {data, loading, refetch, error} = useQuery<ListingsData>(LISTINGS);
  const [deleteListings,
    {loading: deleteLoading, error: deleteError}
    ] = useMutation<DeleteListingsData, DeleteListingsVariables>(DELETE_LISTING);

  const handleDeleteListings = async (id: string) => {
  await deleteListings({id});
    refetch();
  };


const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map(listing=>(
        <li key={listing.id}>
          {listing.title}
        <button onClick={()=>handleDeleteListings(listing.id)}>delete</button>
        </li>
      ))}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Uh oh! Something went wrong - please try again later</h2>
  }


  const loadingMessage = deleteLoading ? <h4>Deletion in progress...</h4> : null;
  const errorDeleteMessage = deleteError ? <h4>Uh oh! Something went wrong - please try again later</h4> : null;

 return (
   <>
     <h1>Hotel list</h1>
     {listingsList}
     {loadingMessage}
     {errorDeleteMessage}
    </>
   )
};