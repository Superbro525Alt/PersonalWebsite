<script>
  import "../app.postcss";
  import Header from "./Header.svelte";
  import "./styles.css";
    import { DarkMode } from 'flowbite-svelte';


  import { page } from '$app/stores';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  $: activeUrl = $page.url.pathname;

</script>

<div class="app">
  <Navbar>
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
</Navbar>
  <main>
    <slot />
  </main>

  <footer>
    <p>
    </p>
  </footer>
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
    max-width: 64rem;
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
