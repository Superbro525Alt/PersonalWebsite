<script lang="ts">
    import { onMount } from "svelte";
    import { POST, GET } from "$lib/requests";
    import { getParam } from "$lib/urltools";
    import {Heading} from "flowbite-svelte";

    let urlParams;
    let other_user;
    let user;

    onMount(async () => {
        user = localStorage.getItem("user");
        other_user = getParam("user");

        await read_messages();

        setInterval(async () => {
            await read_messages();
        }, 1000);
    });

    async function read_messages() {
        let resp = await POST("api/chat", { other_user: other_user, user: user, query: "read_messages" });
    }
</script>

<p>{other_user}</p>