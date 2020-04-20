import React from 'react';
import {gql} from 'apollo-boost'
import { useQuery, useMutation} from 'react-apollo';
import {Listings as ListingsData} from './__generated__/Listings';
import {DeleteListings as DeleteListingsData, DeleteListingsVariables} from './__generated__/DeleteListings';
import { List } from 'antd';
import './styles/Listings.scss'

const LISTINGS = gql`
  query Listings {
    listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
    }
  }
`;

const DELETE_LISTING = gql`
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
  await deleteListings({variables: {id}});
    refetch();
  };


const listings = data ? data.listings : null;
  console.log(listings);
  const listingsList = listings ? (
  <List itemLayout="horizontal"
        dataSource={listings}
        renderItem={listing => (
          <List.Item>
            <List.Item.Meta
             title={listing.title}
             description={listing.address}
            />
          </List.Item>
        )}

  />
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
   <div className="listings">
     <h1>Hotel list</h1>
     {listingsList}
     {loadingMessage}
     {errorDeleteMessage}
    </div>
   )
};