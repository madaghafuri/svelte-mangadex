import type { MangaResponse } from '../types/manga';
import type { PageServerLoad } from './$types';

const baseUrl = 'https://api.mangadex.org';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	const params = {
		limit: '6',
		['includes[]']: 'cover_art'
	};

	const resposne = await fetch(baseUrl + '/manga' + '?' + new URLSearchParams(params).toString(), {
		headers: {
			'access-control-allow-origin': '*'
		}
	});
	const body = await resposne.json();

	return {
		data: body as MangaResponse
	};
};
