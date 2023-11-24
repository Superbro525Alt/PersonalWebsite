<script lang="ts">
    import {POST} from "$lib/requests";
    import {onMount} from "svelte";

    import {Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Card, Avatar, Button} from 'flowbite-svelte';
    import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, ArrowRightToBracketSolid, FileEditSolid } from 'flowbite-svelte-icons';

    import { Heading } from "flowbite-svelte";

    let data: any;
    let user: string;



    onMount(async () => {
        while (localStorage.getItem("valid") != "true") {
            console.log(localStorage.getItem("valid"));
            await new Promise(r => setTimeout(r, 1000));
        }
        user = localStorage.getItem("user");

        data = await POST("api/chat", {query: "all", user: user});

        setInterval(async () =>  {
            data = await POST("api/chat", {query: "all", user: user});
            // sort data.body.messages by time so most recent is first
            data.body.messages.sort((a, b) => {
                return new Date(b.time).getTime() - new Date(a.time).getTime();
            });
            console.log(data);
        }, 1000);



    });

</script>

<div class="hide-scrollbar">
<Heading tag="h2">Recent Messages</Heading>
<br/>
<!-- if data == undefined show loading... if data.messages == [] show no messages -->
{#if data == undefined}
    <div class="row">
        <div class="col-12">
            <Card class="mb-3 w-full max-w-full">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            Loading...
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
{/if}
{#if data != undefined}
    {#if data.body.messages === []}
        <div class="row">
            <div class="col-12">
                <Card class="mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                No messages
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    {/if}
    {#if data.body.messages != []}

    <div class="flex flex-row items-center justify-center space-x-3 overflow-scroll padding-left">
        {#each data.body.messages as message}
            {#if message.read == false}
                <Card class="mb-3 w-full max-w-full min-w-[calc(20%)]">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 flex flex-row">
                                <Avatar class="mr-3" size="sm" src={message.avatar} />
                                <!-- place user name above and message below -->
                                <div class="flex flex-col">
                                    <div class="flex flex-col items-start justify-center">
                                        <span class="text-sm font-semibold">{message.sender}</span>
                                        <span class="text-xs">{message.message}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button class="mt-3 w-[calc(100%)]" on:click={() => {window.location.href = "?page=messages?user=" + message.sender}}>View</Button>
                    </div>
                </Card>
            {/if}
        {/each}
    </div>
    {/if}
    <!-- if all the messages in data.body.messages have read=true -->
    {#if data.body.messages != []}
        {#if data.body.messages.every((message) => message.read == true)}
            <div class="row">
                <div class="col-12">
                    <Card class="mb-3 w-full max-w-full">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    No messages
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        {/if}
    {/if}
{/if}
</div>

<style>
    .padding-left {
        padding-left: 2vw;
        padding-right: 1vw;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>