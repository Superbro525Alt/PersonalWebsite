<script lang="ts">
import { Card, Button } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import { Heading, P, A, Mark, Secondary } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-col content-center items-center">
  <Heading class="mb-5">Projects</Heading>
  <P class="mb-5">Here are some of my projects that I have worked on. You can see the source code on my github (<a href="https://github.com/Superbro525Alt">https://github.com/Superbro525Alt</a>), including the source to this website.</P>
  <br/>
<div class="flex flex-row full flex-center">
<Card class="transition_5 mr-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tailwind</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Tailwind is an all in one library for python developed by me. It contains a graphics, maths and windows library as well as socket utility and web development</p>
  <Button on:click={() => window.location.href = "/projects/tailwind"}>
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
<Card class="transition_5 mr-5 ml-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Soccer Field Management</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Soccer Field Management is a program that can display a live view of a soccer game using an arduino base station and gps tracking.</p>
  <Button on:click={() => window.location.href = "/projects/soccerfieldmanagement"}>
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
    <Card class="transition_5 ml-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Server Controller</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Server Controller is a program that allows you to have remote control of a server running the socket program. It includes starting and stopping processes and security features like a password.</p>
  <Button on:click={() => window.location.href = "/projects/servercontroller"}>
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
</div>
  <div class="flex flex-row full flex-center mt-5">
<Card class="transition_5 mr-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Backchats</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Backchats is a chat platform built with just js, html and css</p>
  <Button on:click={() => window.location.href = "/projects/backchats"}>
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
<Card class="transition_5 mr-5 ml-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Concert Seat Booker</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">A tool for booking seats at a concert. Admins can also view the predicted income and expenses</p>
  <Button on:click={() => window.location.href = "/projects/concertseatbooker"}>
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
    <Card class="transition_5 ml-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Compass (reimagined)</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">A tool for schools to see time tables, assignments, ect.</p>
  <Button on:click={() => window.location.href = "/projects/compass"}>
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
</div>
    <div class="flex flex-row full flex-center mt-5">
<Card class="transition_5 mr-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Personal Website</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">This website, using svelte and flowbite-svelte.</p>
  <Button on:click={() => window.location.href = "/projects/personalwebsite"}>
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
</div>
</div>

<style>

</style>
