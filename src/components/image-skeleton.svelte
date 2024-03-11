<script lang="ts">
	import { onMount } from "svelte";

    let isLoading = true
    export let imageUrl: string;

    onMount(() => {
        const image = new Image();
        image.onload = () => {
            isLoading = false
        }
        image.src = imageUrl;
    })
</script>

<style>
    .image-skeleton {
        position: relative;
    }

    .skeleton {
        width: 64px;
        height: auto;
        animation: shimmer 1s ease-in-out infinite;
    }

    .image {
        position: absolute;
        top: 0;
        left: 0;
        width: 64px;
        height: auto;
        opacity: 0;
    }

    @keyframes shimmer {
        0% {
            transform: translateX(-100%)
        }

        100% {
            transform: translateX(100%);
        }
    }
</style>

<div class="image-skeleton w-full">
    {#if isLoading}
        <div class="skeleton"></div>
    {:else}
        <img class="image" src={imageUrl} alt="Cover">
    {/if}
</div>