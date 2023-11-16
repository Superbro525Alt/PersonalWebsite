<script lang="ts">
    import { Heading, Avatar, Card } from "flowbite-svelte";

    export let sender;
    export let time;
    export let message;
    export let avatar;

    export let self;
</script>

{#if !self}
<Card class="w-[100%] mb-2 min-w-[100%]">
    <div class="flex flex-row space-x-2">
        <Avatar src={avatar} size="sm" />
        <Heading tag="h4" style="margin-left: 0.5rem;">{sender}</Heading>
    </div>
    <Heading tag="h8" style="margin-left: auto;">{new Date(time).toLocaleString()}</Heading>

    <div>
        <p>{message}</p>
    </div>
</Card>
    {:else}
<Card class="w-[100%] mb-2 min-w-[100%]">
    <div class="flex flex-row space-x-2">
        <Avatar src={avatar} size="sm" />
        <Heading tag="h4" style="margin-left: 0.5rem;">{sender} (you)</Heading>
    </div>
    <Heading tag="h8" style="margin-left: auto;">{new Date(time).toLocaleString()}</Heading>

    <div>
        <p>{message}</p>
    </div>
</Card>
    {/if}