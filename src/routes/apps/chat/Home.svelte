<script lang="ts">
    import {POST} from "$lib/requests";
    import {onMount} from "svelte";

    let data: any;
    onMount(async () => {
        data = await POST("api/chat", {query: "all", user: "test"});

        setInterval(async () =>  {
            data = await POST("api/chat", {query: "all", user: "test"});
        }, 1000);

    });

</script>
