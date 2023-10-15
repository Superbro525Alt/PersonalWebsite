<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import { Heading, P, A, Mark, Secondary } from 'flowbite-svelte';

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Heading class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Projects</Heading>
<div class="flex flex-row full">
<Card class="transition_5 mr-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tailwind</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Tailwind is an all in one library for python developed by me. It contains a graphics, maths and windows library as well as socket utility and web development</p>
  <Button class="w-fit view">
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
<Card class="transition_5 mr-5 ml-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Soccer Field Management</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Soccer Field Management is a program that can display a live view of a soccer game using an arduino base station and gps tracking.</p>
  <Button class="w-fit view">
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
    <Card class="transition_5 ml-5">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Server Controller</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Server Controller is a program that allows you to have remote control of a server running the socket program. It includes starting and stopping processes and security features like a password.</p>
  <Button class="w-fit view">
    View <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
</div>

<style>
.full {
    width: 98%;
}

.view {
    position: fixed;
    bottom: 0;
}
</style>
