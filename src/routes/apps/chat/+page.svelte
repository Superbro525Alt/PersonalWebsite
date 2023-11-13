<script lang="ts">
    import { POST, GET } from "$lib/requests";
    import {onMount} from "svelte";
    import { page } from '$app/stores';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Avatar, P } from 'flowbite-svelte';
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

        let username = "test";

let activeClass = 'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
  let nonActiveClass = 'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';

    // get data from api

    onMount(async () => {
        localStorage.setItem("user", username);

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
            // if there is a ? after the page bit remove it
            if (current_page.includes("?")) {
                // remove everything after the first ?
                current_page = current_page.split("?")[0];
            }
        });

        async function get_message_count() {
            await POST("api/chat", {query: "messages", user: username}).then((value) => {
                let message_count_temp = value.body


                // sort out all with the read: true props
                let len = message_count_temp.length;
                for (let i = 0; i < message_count_temp.length; i++) {
                    if (message_count_temp[i].read == true) {
                        len--;
                    }
                }

                message_count = len;


            });
        }

        // on message count change
        await get_message_count();

        setInterval(async () => {
            await get_message_count();
        }, 1000);

    });
</script>

<svelte:head>
	<title>Chat</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-row">
    <Sidebar {activeUrl}>
      <SidebarWrapper divClass="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-[calc(98vh-4rem)] w-[calc(15vw)]">
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
        <div class="flex flex-row p-3 bg-gray-50 rounded dark:bg-gray-800 h-[4rem] w-[calc(15vw)] space-x-3">
            <Avatar
                alt="Avatar"
                class="w-10 h-10 rounded-full margin-auto"
                dot={{ placement: 'top-right', color: 'green' }} rounded/>

            <div class="flex flex-row ml-3 space-x-3 m-auto">
                <P size="xl">{username}</P>
            </div>
        </div>
    </Sidebar>

    <div class="h-full w-[calc(65vw-4rem)] ml-[calc(2rem)] mt-[calc(1rem)] rounded-lg bg-gray-50 dark:bg-gray-800">
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
        overflow: hidden;
    }

    a:hover, sideitem:hover {
        /* make it not underline on hover */
        text-decoration: none;
    }

    a {
        /* make it not underline */
        text-decoration: none;
    }


</style>
