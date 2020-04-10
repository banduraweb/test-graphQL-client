export interface IListings {
	id: string;
	title: string;
	image: string;
	address: string;
	price: number;
	numOfGuests: number;
	numOfBeds: number;
	numOfBaths: number;
	rating: number;
}
export interface ListingsData {
	listings: IListings[]
}

export interface DeleteListingsData {
	deleteListings: IListings;
}

export interface DeleteListingsVariables {
	id: string
}
