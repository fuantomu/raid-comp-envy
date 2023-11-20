<script lang="ts">
  import type { PageData } from "./$types";
  import EditBuild from "$lib/pages/EditBuild/EditBuild.svelte";
  import Loading from "$lib/components/Loading.svelte";

  export let data: PageData;
</script>

{#await data.streamed.data}
  <Loading />
{:then d}
  <EditBuild gameVersion="{d.gameVersion}" fetchedBuild={d.build} />
{/await}
