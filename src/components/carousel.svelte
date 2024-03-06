<script lang="ts">
    import emblaCarousel from 'embla-carousel-svelte'
</script>

<style>
    .embla {
        overflow: hidden;
    }
    .embla__container {
        display: flex;
    }
</style>

<div class="embla" use:emblaCarousel>
    <div class="embla__container">
        <slot />
    </div>
</div>