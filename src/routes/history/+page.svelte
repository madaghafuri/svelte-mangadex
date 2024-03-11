<script lang="ts">
	import { onMount } from "svelte";
	import { baseUrl } from "../../types/manga";
	import type { ChapterResponse, MangaHistory } from "../../types/chapter";
	import Card from "../../components/card.svelte";	

    let data: ChapterResponse | undefined;

    async function getChapters(chapters: string[]) {
        if (chapters.length === 0) return ;

        const chapterParams = new URLSearchParams();
        chapterParams.append('includes[]', 'manga');
        chapterParams.append('limit', '100')
        chapterParams.append('order[readableAt]', 'desc')

        // this is necessary
        const contentRating = ['safe', 'suggestive', 'erotica', 'pornographic'];
        contentRating.forEach((val) => {
            chapterParams.append('contentRating[]', val)
        })
        chapters.forEach((value) => {
            chapterParams.append('ids[]', value)
        })

        const response = await fetch(baseUrl + '/chapter' + "?" + chapterParams.toString());
        const body = await response.json();
        return body as ChapterResponse
    }

    onMount(async () => {
        const DATA = localStorage.getItem('history');
	    const parsedData = DATA ? (JSON.parse(DATA) as MangaHistory[]) : [];
        const flatData = parsedData.flatMap((value) => value.chapters);

        const chapters = await getChapters(flatData);
        data = chapters
    })

    function prevPage() {
        history.back();
    }
</script>

<div class="min-h-screen p-5">
    <section class="flex items-center gap-10">
        <button type="button" on:click={prevPage}>
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h1 class="text-2xl font-semibold">Reading History</h1>
    </section>
    <div class="mt-5">
        {#if data}
            <div class="flex flex-col gap-3">
                {#each data.data as chapter}
                    <Card chapter={chapter} ></Card>                 
                {/each}
            </div>
        {:else if !data}
            <p>Empty</p>
        {:else}
            <p class="">Loading...</p>
        {/if} 
    </div>
</div>