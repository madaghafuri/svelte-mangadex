<script lang="ts">
    import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { createEventDispatcher, onMount } from "svelte";

    export let data: PageData;
    const chapterList = data.data.chapter;
    const pageLength = chapterList.dataSaver.length;

    let selectedPage = $page.url.searchParams.get('page') || '1';
    let touchStartX: number;

    const dispatch = createEventDispatcher();

    onMount(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    })

    const handleNextPage = () => {
        const nextPage = parseInt(selectedPage) + 1;
        if (nextPage > pageLength) return
        selectedPage = nextPage.toString();
        goto(`?page=${selectedPage}`)
    }
    
    const handlePrevPage = () => {
        const prevPage = parseInt(selectedPage) - 1;
        if (prevPage < 1) return
        selectedPage = prevPage.toString();
        goto(`?page=${selectedPage}`)
    }

    function handleTouchStart(event: TouchEvent) {
        touchStartX = event.touches[0].clientX;
        if (touchStartX < window.innerWidth / 3) {
            handleNextPage()
        } else if (touchStartX > window.innerWidth * 2 / 3) {
            handlePrevPage()
        }
    }    

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            handleNextPage();
        } else if (event.key === 'ArrowRight') {
            handlePrevPage();
        }
    }
</script>

<style>
    .chapter {
        max-width: 100%;
        min-width: 0;
    }
</style>

<div class="relative h-full" on:touchstart={handleTouchStart}> 
    <div class="h-screen flex items-center overflow-x-auto"> 
        <img class="chapter" src="https://uploads.mangadex.org/data-saver/{chapterList.hash}/{chapterList.dataSaver[parseInt(selectedPage) - 1]}" alt="Loading...">
    </div>
    <section class="sticky bottom-0 w-full flex items-center p-2">
    </section>
</div>