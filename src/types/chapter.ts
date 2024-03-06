import type { MangaAttributes } from './manga';

export interface ChapterListResponse {
	result: string;
	baseUrl: string;
	chapter: ChapterImages;
}

export interface ChapterImages {
	hash: string;
	data: string[];
	dataSaver: string[];
}

export interface ChapterAttributes {
	chapter: string;
	createdAt: string;
	externalUrl: string;
	pages: number;
	publishAt: string;
	readableAt: string;
	title: string;
	translatedLanguage: string;
	updatedAt: string;
	version: number;
	volume: string;
}

export interface ChapterRelationship {
	id: string;
	type: string;
	attributes?: any;
}

export interface ChapterData {
	attributes: ChapterAttributes;
	id: string;
	relationships: ChapterRelationship[];
	type: 'chapter';
}

export interface ChapterResponse {
	data: ChapterData[];
	limit: number;
	offset: number;
	response: string;
	result: string;
	total: number;
}

export interface MangaHistory {
	chapters: string;
	created_at: string;
	updated_at: string;
}
