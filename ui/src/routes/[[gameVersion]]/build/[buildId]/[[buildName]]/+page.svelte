<script lang="ts">
  import type { PageData } from "./$types";
  import ViewBuild from "$lib/pages/ViewBuild/ViewBuild.svelte";

  export let data: PageData;
</script>

<ViewBuild params={data} />