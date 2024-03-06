<script lang="ts">
    import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

    export let data: PageData;
    const chapterList = data.data.chapter;
    const pageLength = chapterList.dataSaver.length;

    let selectedPage = $page.url.searchParams.get('page') || '1';

    const handleNextPage = () => {
        if (parseInt(selectedPage) >= pageLength) {

        }

        const nextPage = parseInt(selectedPage) + 1;
        selectedPage = nextPage.toString();
        goto(`?page=${selectedPage}`)
    }
    
    const handlePrevPage = () => {
        const prevPage = parseInt(selectedPage) - 1;
        selectedPage = prevPage.toString();
        goto(`?page=${selectedPage}`)
    }

</script>

<style>
    .chapter {
        max-width: 100%;
        min-width: 0;
    }
</style>

<div class="relative">
    <div class="h-screen flex items-center overflow-x-auto">
        <img class="chapter" src="https://uploads.mangadex.org/data-saver/{chapterList.hash}/{chapterList.dataSaver[parseInt(selectedPage) - 1]}" alt="Loading...">
    </div>
    <section class="absolute bottom-0 w-full flex items-center p-2">
        <button type="button" on:click={handlePrevPage} disabled={parseInt(selectedPage) === 1}>
            Prev
        </button>
        
        <button type="button" on:click={handleNextPage} disabled={parseInt(selectedPage) >= pageLength}>
            Next
        </button>
    </section>
</div>