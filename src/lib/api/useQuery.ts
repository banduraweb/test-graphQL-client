import {useState, useEffect} from 'react';
import {server} from './server';


interface State<TData> {
	data: TData | null
}

export const useQuery = <TData= any> (query: string) => {

	const [state, setState] = useState<State<TData>>({
		data: null
	});

	useEffect(()=>{
		(async ()=>{
			const {data} = await server.fetch<TData>({query});
			console.log(data);
			setState({data});
		})()
	},[query]);

	return state

};