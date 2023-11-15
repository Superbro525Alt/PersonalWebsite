<script lang="ts">
    import { onMount } from "svelte";
    import { POST, GET } from "$lib/requests";
    import { getParam } from "$lib/urltools";
    import {Avatar, Card, Heading} from "flowbite-svelte";

    let urlParams;
    let other_user;
    let user;
    let other_user_avatar;

    onMount(async () => {
        user = localStorage.getItem("user");

        get_other_user();
        await read_messages();

        setInterval(async () => {
            await read_messages();
            get_other_user();
        }, 1000);
    });

    function get_other_user() {
        other_user = getParam("user");
    }
    async function read_messages() {
        let resp = await POST("api/chat", { other_user: other_user, user: user, query: "read_messages" });
        let _other_user_avatar = await POST("api/chat", { user: other_user, query: "avatar" });
        other_user_avatar = _other_user_avatar.body.avatar;
    }
</script>

{#if other_user != "" && other_user != undefined}
<Card class="w-[calc(80vw-4rem)] max-w-[calc(80vw-4rem)]">
        <div class="flex flex-row space-x-3">
            <Avatar
                src={other_user_avatar}
                class="w-10 h-10 rounded-full margin-auto"
                size="lg"
                dot={{ placement: 'top-right', color: 'green' }} rounded/>
            <Heading tag="h4" class="">{other_user}</Heading>
        </div>

</Card>
    <Card class="w-[calc(80vw-4rem)] max-w-[calc(80vw-4rem)] mt-3">

    </Card>

    {/if}

<style>
    .w-full {
        width: 100%;
    }



</style>