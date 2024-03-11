<script lang="ts">
	import { afterUpdate, onMount } from "svelte";
	import Tag from "../../../components/tag.svelte";
    import { baseUrl, type Manga, type MangaFeed, type MangaFeedResponse, type ReadingHistory } from "../../../types/manga";
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import { writable } from "svelte/store";
	import type { MangaHistory } from "../../../types/chapter";

    export let data: PageData;
    const manga = data.data.manga.data

    function getGenre(manga: Manga) {
        const genres = manga.attributes.tags.filter((value) => value.attributes.group == "genre")
        return genres
    }

    let feed: MangaFeedResponse;
    let pageCount = 1;
    let offsetPage = 0;

    const pagination = writable({
        page: 1,
        offset: 0,
    })

    const fetchMangaFeed = async (offset: number = 0) => {
        const params = {
            limit: (50).toString(),
            ['order[chapter]']: 'desc',
            ['order[volume]']: 'desc',
            offset: (offset).toString(),
            ['translatedLanguage[]']: 'en'
        }

        const res = await fetch(baseUrl + "/manga/" + $page.params.id + '/feed' + "?" + new URLSearchParams(params).toString())
        const body = await res.json() as MangaFeedResponse;
        return body;
    }

    onMount(async () => {
        feed = await fetchMangaFeed();
    })
    pagination.subscribe(async ({offset, page}) => {
        feed = await fetchMangaFeed(offset);
        pageCount = page;
        offsetPage = offset;
    })

    function nextPage() {
        pagination.update(({ page, offset }) => ({page: page += 1, offset: offset += 50}))
    }

    function prevPage() {
        if (pageCount == 1 || offsetPage == 0) return

        pagination.update(({ page, offset }) => ({page: page -= 1, offset: offset -= 50}))
    }

    const recordHistory = (mangaId: string, chapterId: string) => {
        const history = localStorage.getItem('history');
        const parsedData = history && JSON.parse(history) as MangaHistory[];
        const updatedData: MangaHistory = {chapters: chapterId, created_at: new Date().toUTCString(), updated_at: ""}
        parsedData && parsedData.unshift(updatedData);
        console.log(parsedData)
        localStorage.setItem('history', JSON.stringify(parsedData))
    }
</script>

<style>
    .banner {
        background: linear-gradient(to bottom, rgba(25, 26, 28, 0.6), rgba(25, 26, 28, 1));
    }
</style>

<div>
    <section>
        <div class="relative h-[300px]">
            {#each manga.relationships as relationship}
            {#if relationship.type == "cover_art"}
                <img src="https://uploads.mangadex.org/covers/{manga.id}/{relationship.attributes.fileName}" alt="Loading" class="object-cover h-full w-full">
                <div class="absolute inset-0 banner"></div>
                <div class="absolute inset-0 px-5 pt-16 flex flex-col gap-3">
                    <section class="flex gap-3">
                        <img src="https://uploads.mangadex.org/covers/{manga.id}/{relationship.attributes.fileName}" alt="Loading" width="128" class="rounded-md">
                        <div class="flex flex-col justify-start gap-2">
                            <h3 class="text-2xl font-bold">{manga.attributes.title.en}</h3>
                            <h5 class="text-lg">{''}</h5>
                        </div>
                    </section>
                    <div class="flex flex-wrap gap-2 overflow-hidden">
                        {#each getGenre(manga) as genre}
                            <Tag title={genre.attributes.name.en} />
                        {/each}
                    </div>
                </div>
            {/if}
            {/each}
        </div>
        <div class="px-5 grid grid-cols-[15%,15%,auto] gap-3">
            <button class="bg-orange-600 rounded-sm px-3 py-2"></button>
            <button class="bg-soft rounded-sm px-3 py-2"></button>
            <button class="bg-soft px-3 py-2 rounded-sm font-bold">Read</button>
        </div>
    </section>
    <div class="p-5">
        <details>
            <summary>see more</summary>
            <p>{manga.attributes.description.en}</p>
        </details>
    </div>
    <div class="p-5 flex flex-col gap-3">
        {#if feed}
        {#each feed.data as chapter}
            <a href="/chapter/{chapter.id}" on:click={() => recordHistory(manga.id, chapter.id)}>
                <div class="p-2 bg-soft rounded-md">
                    <p class="font-bold text-base">Ch. - {chapter.attributes.chapter}</p>
                </div>    
            </a>
        {/each}
        {/if}
    </div>
    <div class="p-5 flex items-center justify-between">
        <button class="p-2 rounded-md bg-soft" on:click={prevPage}>Prev</button>
        {pageCount}
        <button class="p-2 rounded-md bg-soft" on:click={nextPage}>Next</button>
    </div>
</div>