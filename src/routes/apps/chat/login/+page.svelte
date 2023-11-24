<script lang="ts">
    import { POST, GET } from "$lib/requests";
    import {onMount} from "svelte";
    import { page } from '$app/stores';
    import {
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        Avatar,
        P,
        Card,
        Heading,
        Button
    } from 'flowbite-svelte';
    import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, ArrowRightToBracketSolid, FileEditSolid } from 'flowbite-svelte-icons';

    import { Input, Checkbox, Modal, Label } from "flowbite-svelte";

      let defaultModal = false;

      let login_password = "";
      let signup_username = "";
      let signup_email = "";
      let signup_password = "";
      let login_username = "";

    async function register() {
        await POST("/apps/api/chat", {
            query: "register",
            user: signup_username,
            email: signup_email,
            password: signup_password
        }).then((res) => {
            if (res.body.error != undefined) {
                alert(res.body.error);
            }
        });
    }

    async function login() {
        await POST("/apps/api/chat", {
            query: "login",
            user: login_username,
            password: login_password
        }).then((res) => {
            if (res.body.error != undefined) {
                console.log(res);
                alert(res.body.error);
            } else {
                console.log(res)
                localStorage.setItem("key", res.body.key);
                localStorage.setItem("user", login_username);

                window.location.href = "/apps/chat";
            }
        });
    }


</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<Card class="m-auto form-input w-[calc(80vw)] min-w-[calc(80vw)] min-h-[calc(93vh)] h-[calc(93vh)]">
    <form class="flex flex-col space-y-6">
        <Heading tag="h2" class="mb-4">Login</Heading>
        <Label class="space-y-2">
          <span>Username</span>
          <Input type="username" name="username" placeholder="username" required bind:value={login_username} />
        </Label>
        <Label class="space-y-2">
          <span>Password</span>
          <Input type="password" name="password" placeholder="•••••••••••••••" required bind:value={login_password} />
        </Label>
        <a class=" text-sm text-primary-700 hover:underline dark:text-primary-500"> Forgot password? </a>

        <!--<div class="flex items-start">
          <Checkbox>Remember me</Checkbox>
          <a class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"> Forgot password? </a>
        </div> -->
        <Button type="submit" class="w-full1" on:click={async () => {await login()}}>Login to your account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a on:click={() => {defaultModal = true}} class="text-primary-700 hover:underline dark:text-primary-500"> Create account </a>
        </div>
    </form>

</Card>

<Modal title="Sign Up" bind:open={defaultModal} autoclose outsideclose>

    <form class="flex flex-col space-y-6">
        <Label class="space-y-2">
          <span>Email</span>
          <Input type="email" name="email" placeholder="name@company.com" required bind:value={signup_email} />
        </Label>
        <Label class="space-y-2">
          <span>Username</span>
          <Input name="username" placeholder="username" required bind:value={signup_username} />
        </Label>
        <Label class="space-y-2">
          <span>Password</span>
          <Input type="password" name="password" placeholder="•••••••••••••••" required bind:value={signup_password} />
        </Label>
        <Button type="submit" on:click={async () => (await register())}>Sign Up</Button>
        <Button color="alternative">Close</Button>
    </form>

</Modal>

<style>

</style>