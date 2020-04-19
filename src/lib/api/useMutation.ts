import { useState } from 'react';
import {server} from './server';


interface State<TData> {
	data: TData | null,
	loading: boolean,
	error: boolean
}

type MutationTuple <TData,  TVariables> = [
	(variables?: TVariables | undefined)=>Promise<void>, State<TData>
	]


export const useMutation = <TData = any, TVariables = any>(query: string):MutationTuple <TData,  TVariables>=>{

	const [state, setState] = useState<State<TData>>({
		data: null,
		loading: false,
		error: false
	});


	const fetch = async (variables?:TVariables)=>{
		try {
			setState(prev => ({
				...prev,
				loading: true,
			}));
			const {data, errors} = await server.fetch<TData, TVariables>({query, variables});

			if (errors && errors.length) {
				throw new Error('Mutation error')
			}

			setState(prev=>({
				...prev,
				data: data,
				error: false,
				loading: false
			}));

		}catch (e) {
			setState(prev => ({
				...prev,
				error: true,
				loading: false
			}));
			throw console.error(e)
		}
	};


	return [fetch, state]

};