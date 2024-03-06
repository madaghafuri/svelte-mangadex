<script>
	import { onMount } from "svelte";
    import "../app.css"
    import MangadexLogo from "../components/mangadex-logo.svelte";
	import * as Sheet from "@/components/ui/sheet";

    let scrollPosition = 0;

    const handleScroll = () => {
        scrollPosition = window.scrollY;
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })
</script>

<div class="bg-hard text-white min-h-full md:grid md:grid-cols-[15%,auto]">
    <nav class="hidden md:flex flex-col bg-soft p-5">
        <a href="/" class="bg-orange-600 rounded-md p-2 text-lg font-bold">Home</a>
    </nav>
    <section class={`w-full flex flex-row items-center gap-3 py-3 px-5 sticky top-0 z-10 ${scrollPosition > 50 ? "bg-soft" : "bg-transparent"} transition-all ease-in-out duration-300`}>
        <Sheet.Root>
            <Sheet.Trigger>
                <i class="fa-solid fa-bars"></i>
            </Sheet.Trigger>
            <Sheet.Content side="left" class="bg-soft">
                <nav class="hidden md:flex flex-col bg-soft p-5">
                    <a href="/" class="bg-orange-600 rounded-md p-2 text-lg font-bold">Home</a>
                </nav>
            </Sheet.Content>
            <Sheet.Overlay class="bg-transparent">
                
            </Sheet.Overlay>
        </Sheet.Root>
        <MangadexLogo />
        <a href="/">
            <h1 class="text-xl font-bold">MangaDex</h1>
        </a>
    </section>
    <slot />
</div>