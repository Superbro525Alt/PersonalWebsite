<script>
  import "../app.postcss";
  import "./styles.css";
    import { DarkMode } from 'flowbite-svelte';

	import { fade } from 'svelte/transition';

  import { page } from '$app/stores';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
  import {onMount} from "svelte";

  $: activeUrl = $page.url.pathname;

  onMount(() => {

  });

</script>

<div class="app">
  {#if activeUrl.split("/")[1] != 'apps'}

  <Navbar class="bg-gray-100 transition_5">
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">paulsstuff.dev</span>

  </NavBrand>
  <NavHamburger />
  <NavUl {activeUrl}>

    <NavLi href="/">Home</NavLi>
    <NavLi href="/projects">Projects</NavLi>
    <NavLi href="/languages">Languages</NavLi>
    <NavLi href="/organisations">Organisations</NavLi>
    <NavLi href="/accounts">Accounts</NavLi>
  </NavUl>
    <DarkMode class="self-center ml-2 transition_5" />

</Navbar>
    {/if}
  <main transition:fade>
    <slot />
  </main>
  {#if activeUrl.split("/")[1] != 'apps'}

  <Footer class="transition_5">
  <FooterCopyright href="/" by="Paul Hodges™" year={2023} />
  <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
    <FooterLink href="/">About</FooterLink>
    <FooterLink href="/">Privacy Policy</FooterLink>
    <FooterLink href="/">Licensing</FooterLink>
    <FooterLink href="/">Contact</FooterLink>
  </FooterLinkGroup>
</Footer>
    {/if}
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
