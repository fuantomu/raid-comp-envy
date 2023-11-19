<script lang="ts">
  import type {PageData} from './$types';
  import EditBuild from "$lib/pages/EditBuild/EditBuild.svelte";

  export let data: PageData;
</script>


<EditBuild gameVersion="{data.gameVersion}" fetchedBuild={data.build}/>