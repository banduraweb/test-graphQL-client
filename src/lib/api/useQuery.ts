import { useState, useEffect, useCallback } from 'react';
import {server} from './server';


interface State<TData> {
	data: TData | null,
	loading: boolean,
	error: boolean
}

interface QueryResults<TData> extends State<TData> {
	refetch: () => void
}


export const useQuery = <TData = any>(query: string):QueryResults<TData> => {

	const [state, setState] = useState<State<TData>>({
		data: null,
		loading: false,
		error: false
	});


	const fetch = useCallback(() => {
			(async () => {
				try {
					setState(prev => ({
						...prev,
						loading: true
					}));
					const { data, errors } = await server.fetch<TData>({ query });

					if (errors && errors.length) {
						throw new Error('Query error')

					}

					setState(prev => ({
						...prev,
						data: data,
						loading: false
					}));
				} catch (e) {
					setState(prev => ({
						...prev,
						error: true,
						loading: false

					}));
					throw console.error(e);
				}

			})();

		}, [query])
	;

	useEffect(()=>{
		fetch();
	}, [fetch]);

	return { ...state, refetch: fetch };

};