import type { ChapterListResponse } from '../../../types/chapter';
import { baseUrl } from '../../../types/manga';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, url }) => {
	const resp = await fetch(baseUrl + '/at-home/server/' + params.id);
	const body = (await resp.json()) as ChapterListResponse;

	const page = url.searchParams.get('page') || '1';

	return {
		data: body
	};
};
