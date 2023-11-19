<script lang="ts">
  import type {PageData} from './$types';
  import ViewBuild from "$lib/pages/ViewBuild/ViewBuild.svelte";
  import {displayGrouped} from "$lib/store";

  export let data: PageData;
  $displayGrouped = true;
</script>


<ViewBuild gameVersion={data.gameVersion} fetchedBuild={data.build}/>