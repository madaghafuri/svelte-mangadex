import type { ChapterListResponse } from './chapter';

export const baseUrl = 'https://api.mangadex.org';

export interface MangaResponse {
	result: string;
	response: string;
	data: Manga[];
	limit: number;
	offset: number;
	total: number;
}

export interface MangaByIdResponse {
	result: string;
	response: string;
	data: Manga;
}

export interface Manga {
	id: string;
	type: string;
	attributes: MangaAttributes;
	relationships: Relationship[];
}

export interface MangaAttributes {
	title: {
		en: string;
		[key: string]: string;
	};
	altTitles: {
		[key: string]: string;
	}[];
	description: {
		en: string;
		[key: string]: string;
	};
	isLocked: boolean;
	links: {
		[key: string]: string;
	};
	originalLanguage: string;
	lastVolume: string;
	lastChapter: string;
	publicationDemographic: string;
	status: string;
	year: number;
	contentRating: string;
	tags: Tag[];
	state: string;
	chapterNumbersResetOnNewVolume: false;
	createdAt: string;
	updatedAt: string;
	version: number;
	availableTranslatedLanguages: string[];
	latestUploadedChapter: string;
}

export interface Tag {
	id: string;
	type: string;
	attributes: {
		name: {
			en: string;
			[key: string]: string;
		};
		description: {
			en: string;
			[key: string]: string;
		};
		group: string;
		version: number;
		relationships: [];
	};
}

export interface Relationship {
	id: string;
	type: string;
	attributes: CoverArtAttributes;
}

export interface CoverArtAttributes {
	description: string;
	volume: string;
	fileName: string;
	locale: string;
	createdAt: string;
	updatedAt: string;
	version: number;
}

export interface MangaFeedResponse {
	result: string;
	response: string;
	data: MangaFeed[];
	limit: number;
	offset: number;
	total: number;
}

export interface MangaFeed {
	id: string;
	type: string;
	attributes: MangaFeedAttributes;
	relationships: any[];
}

export interface MangaFeedAttributes {
	volume: string;
	chapter: string;
	title: string;
	translatedLanguage: string;
	externalUrl: string;
	publishAt: string;
	readableAt: string;
	createdAt: string;
	updatedAt: string;
	pages: number;
	version: number;
}

export interface MangaFeedRelationship {}

export interface ReadingHistory {
	manga_id: string;
	chapters: string[];
	created_at: string;
	updated_at: string;
}
