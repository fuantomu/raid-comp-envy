<script lang="ts">
  import type { PageData } from "./$types";
  import ViewBuild from "$lib/pages/ViewBuild/ViewBuild.svelte";
  import Loading from "$lib/components/Loading.svelte";

  export let data: PageData;
</script>


{#await data.streamed.data}
  <Loading/>
{:then d}
  <ViewBuild gameVersion={d.gameVersion} fetchedBuild={d.build} />
{/await}
