<script lang="ts">
    import { onMount } from "svelte";
    import { POST, GET } from "$lib/requests";
    import { getParam } from "$lib/urltools";
    import { Avatar, Button, Card, Heading, Input } from "flowbite-svelte";
    import MessageContainer from "./components/MessageContainer.svelte";

    let urlParams;
    let other_user;
    let user;
    let other_user_avatar;

    let messages;

    onMount(async () => {
        user = localStorage.getItem("user");

        get_other_user();
        await read_messages();
        await get_messages();

        setInterval(async () => {
            await read_messages();
            await get_messages();
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

    async function get_messages() {
        let messages_from = await POST("api/chat", { other_user: other_user, user: user, query: "get_messages" });
        let messages_to = await POST("api/chat", { other_user: user, user: other_user, query: "get_messages" });
        let temp_messages = messages_from.body.messages.concat(messages_to.body.messages);

        // sort messages by time
        temp_messages.sort((a, b) => {
            return new Date(a.time) - new Date(b.time);
        });

        messages = temp_messages;
    }

    async function send_message() {
        if (message_input != "") {
            await POST("api/chat", { other_user: other_user, user: user, message: message_input, query: "send_message" });
            message_input = "";
            await get_messages();
            // scroll to bottom
            let chat = document.querySelector(".messages-window");
            // scroll smooth
            chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });


        }

    }

    function on_key_down(event) {
        if (event.repeat == false) {
            console.log(event.key)
            if (event.key == "Enter") {
                send_message();
            }
        }
    }

    let message_input = "";
</script>
<svelte:window
    on:keydown={on_key_down}
/>
{#if other_user != "" && other_user != undefined}
<Card class="w-[calc(80vw-4rem)] max-w-[calc(80vw-4rem)] h-[15vh]">
        <div class="flex flex-row space-x-3">
            <Avatar
                src={other_user_avatar}
                class="w-10 h-10 rounded-full margin-auto"
                size="lg"
                dot={{ placement: 'top-right', color: 'green' }} rounded/>
            <Heading tag="h4" class="">{other_user}</Heading>
        </div>

</Card>
    <Card class="messages-window w-[calc(80vw-4rem)] max-w-[calc(80vw-4rem)] mt-3 h-[60vh] max-h-[60vh] overflow-y-scroll">
        {#if messages == undefined}
            <div class="flex flex-col justify-center items-center h-full">
                <Heading tag="h3" class="text-center">Loading</Heading>
            </div>
        {:else if messages.length == 0}
            <div class="flex flex-col justify-center items-center h-full">
                <Heading tag="h3" class="text-center">No messages</Heading>
            </div>
        {:else}
            {#each messages as message}
                {#if message.sender == user}
                    <MessageContainer sender={message.sender} message={message.message} time={message.time} avatar={message.avatar} self={true}/>
                {:else}
                    <MessageContainer sender={message.sender} message={message.message} time={message.time} avatar={message.avatar} self={false}/>
                {/if}
            {/each}
        {/if}
    </Card>
    <Card class="w-[calc(80vw-4rem)] max-w-[calc(80vw-4rem)] mt-3 h-[14.5vh]">
        <div class="flex flex-row space-x-3">
            <Input type="text" class="w-full h-full rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 px-4" placeholder="Message" bind:value={message_input}/>
            <Button class="w-20 h-full rounded-lg bg-blue-500 text-white" on:click={async () => {await send_message()}}>Send</Button>
        </div>
    </Card>
    {/if}

<style>
    .w-full {
        width: 100%;
    }



</style>