import { baseUrl, type MangaByIdResponse, type MangaFeedResponse } from '../../../types/manga';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const mangaParams = {
		['includes[]']: 'cover_art'
	};

	const reponse = await fetch(
		baseUrl + '/manga' + '/' + params.id + '?' + new URLSearchParams(mangaParams).toString()
	);
	const mangaResponse = (await reponse.json()) as MangaByIdResponse;

	return {
		data: {
			manga: mangaResponse
		}
	};
};
