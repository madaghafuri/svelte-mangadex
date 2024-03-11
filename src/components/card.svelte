<script lang="ts">
	import { onMount } from "svelte";
	import type { ChapterData } from "../types/chapter";
	import { baseUrl, type MangaByIdResponse, type MangaResponse } from "../types/manga";
	import ImageSkeleton from "./image-skeleton.svelte";

    export let chapter: ChapterData;
    let manga: MangaByIdResponse;

    onMount(async () => {
        const mangaParams = new URLSearchParams();
        mangaParams.append('includes[]', 'cover_art');

        const response = await fetch(baseUrl + '/manga/' + chapter.relationships.find(value => value.type === 'manga')?.id + '?' + mangaParams.toString());
        const body = await response.json() as MangaByIdResponse;

        manga = body
    })
</script>

<div class="bg-soft rounded-md flex flex-col gap-2 p-2">
    <section class="font-bold text-base">{chapter.relationships.find((val) => val.type === 'manga')?.attributes.title.en}</section>
    <div class="w-full border-t-[0.5px] border-gray-500"></div>
    <div class="flex gap-2">
        <div>
            {#if manga}
            <img class="rounded-md" width="64" src="https://uploads.mangadex.org/covers/{manga.data.id}/{manga.data.relationships.find(value => value.type === 'cover_art')?.attributes.fileName}" alt="Cover Art">
            {/if}
        </div>
        <div class="flex flex-col grow">
            <p class="font-bold">Ch. {chapter.attributes.chapter}</p>
        </div>
    </div>
</div>