<script lang="ts">
	import type { PageData } from "./$types";
    import Carousel from "../components/carousel.svelte";
	import Tag from "../components/tag.svelte";
	import type { Manga } from "../types/manga";
	import { onMount } from "svelte";

    export let data: PageData;

    function getTheme(manga: Manga) {
        const themes = manga.attributes.tags.filter((value) => value.attributes.group == "genre")
        return themes
    }

    onMount(() => {
        const readingHistory = localStorage.getItem('history');

        if (!readingHistory) {
            localStorage.setItem('history', JSON.stringify([]))
        }
    })
</script>

<style>
    .embla__slide {
        flex: 0 0 100%;
    }

    .banner {
        background: linear-gradient(to bottom, rgba(25, 26, 28, 0.6), rgba(25, 26, 28, 1));
    }

    .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
    }

    @keyframes skeleton-loading {
        0% {
            background-color: hsl(200, 20%, 70%);
        }

        100% {
            background-color: hsl(200, 20%, 95%);
        }
    }
</style>

<div>
    <section>
        <Carousel>
            {#each data.data.data as manga}
                {#each manga.relationships as relationship}
                    {#if relationship.type == "cover_art"}
                        <div class="embla__slide h-[300px] md:h-[400px] relative">
                            <img src="https://uploads.mangadex.org/covers/{manga.id}/{relationship.attributes.fileName}" loading="lazy" alt="Loading" class="w-[100%] object-cover">
                            <div class="absolute inset-0 banner"></div>
                            <div class="absolute inset-0 flex flex-col gap-3 px-5 pt-16">
                                <section class="flex gap-3">
                                    <img src="https://uploads.mangadex.org/covers/{manga.id}/{relationship.attributes.fileName}" loading="lazy" alt="Loading" width="128" class="rounded-md skeleton">
                                    <h3 class="text-2xl font-bold">{manga.attributes.title.en}</h3>
                                </section>
                                <div class="flex flex-wrap gap-2">
                                    <!-- {#each getTheme(manga) as tag}
                                        <Tag title={tag.attributes.name.en} />
                                    {/each} -->
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            {/each}
        </Carousel>
    </section>
    <section class="p-5 md:px-20 md:py-5">
        <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Latest Updates</h2>
            <button>></button>
        </div>
        <ul class="flex flex-col gap-3">
            {#each data.data.data as manga}
                <li>
                    {#each manga.relationships as relationship}
                    {#if relationship.type == "cover_art"}
                    <a href="/manga/{manga.id}" class="flex items-center gap-3">
                        <img src="https://uploads.mangadex.org/covers/{manga.id}/{relationship.attributes.fileName}" alt="Loading" width="64" class="rounded-md object-cover skeleton">
                        <div>
                            <p class="text-lg font-bold">{manga.attributes.title.en || '-'}</p>
                        </div>
                    </a>
                    {/if}
                    {/each}
                </li>
            {/each}
        </ul>
    </section>
    <section class="p-5 md:px-20 md:py-5">
        <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Recently Added</h2>
            <button>></button>
        </div>
    </section>
</div>
