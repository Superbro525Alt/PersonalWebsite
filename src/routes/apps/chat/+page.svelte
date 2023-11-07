<script lang="ts">
    import { POST, GET } from "$lib/requests";
    import {onMount} from "svelte";
    import { page } from '$app/stores';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
  import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, ArrowRightToBracketSolid, FileEditSolid } from 'flowbite-svelte-icons';

  import Friends from "./Friends.svelte";
  import Home from "./Home.svelte";
    import Messages from "./Messages.svelte";
    import Profile from "./Profile.svelte";
    import Settings from "./Settings.svelte";
    import Logout from "./Logout.svelte";
    let spanClass = 'flex-1 ml-3 whitespace-nowrap sideitem';

  $: activeUrl = $page.url.pathname;
    let data: any;
    let current_page: string;
    let urlParams;
        let message_count = 0;

let activeClass = 'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
  let nonActiveClass = 'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';

    // get data from api

    onMount(async () => {
        urlParams = new URLSearchParams(window.location.search);
        current_page = urlParams.get("page");

        if (current_page == null) {
            current_page = "home";
            window.location.href = "?page=" + current_page;
        }

        // on page params change
        await page.subscribe((value) => {
            urlParams = new URLSearchParams(window.location.search);
            current_page = urlParams.get("page");
        });

        // get message count
        await POST("api/chat", {query: "message_count", user: "test"}).then((value) => {
            console.log(value)
            message_count = value.body.messages_count
        });

        // on message count change
        setInterval(async () => {
            await POST("api/chat", {query: "message_count", user: "test"}).then((value) => {
                message_count = value.body.messages_count
            });
        }, 1000);

    });
</script>
<div class="flex flex-row">
    <Sidebar {activeUrl}>
      <SidebarWrapper divClass="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-[calc(100vh-4rem)] w-[calc(15vw-4rem)]">
        <SidebarGroup>
            <SidebarItem href="?page=home" label="Home" {spanClass}>
                <svelte:fragment slot="icon">
                    <GridSolid />
                </svelte:fragment>
            </SidebarItem>
            <SidebarItem href="?page=friends" label="Friends" {spanClass}>
                <svelte:fragment slot="icon">
                    <UserSolid />
                </svelte:fragment>
            </SidebarItem>
            <SidebarItem href="?page=messages" label="Messages" {spanClass}>
                <svelte:fragment slot="icon">
                    <MailBoxSolid />
                </svelte:fragment>
                 <svelte:fragment slot="subtext">
                     <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200">{message_count}</span>
                 </svelte:fragment>
            </SidebarItem>
        </SidebarGroup>
          <SidebarGroup border>
                <SidebarItem href="?page=profile" label="Profile" {spanClass}>
                    <svelte:fragment slot="icon">
                        <UserSolid />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem href="?page=settings" label="Settings" {spanClass}>
                    <svelte:fragment slot="icon">
                        <FileEditSolid />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem href="?page=logout" label="Logout" {spanClass}>
                    <svelte:fragment slot="icon">
                        <ArrowRightToBracketSolid />
                    </svelte:fragment>
                </SidebarItem>
          </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>

    <div class="h-full bg-gray-100 dark:bg-gray-900 w-[calc(65vw-4rem)]">
        {#if current_page == "home"}
            <Home />
        {/if}
        {#if current_page == "friends"}
            <Friends />
        {/if}
        {#if current_page == "messages"}
            <Messages />
        {/if}
        {#if current_page == "profile"}
            <Profile />
        {/if}
        {#if current_page == "settings"}
            <Settings />
        {/if}
        {#if current_page == "logout"}
            <Logout />
        {/if}

    </div>
</div>

<style>
    body, html, :root {
    }

    a:hover, sideitem:hover {
        /* make it not underline on hover */
        text-decoration: none;
    }
</style>
