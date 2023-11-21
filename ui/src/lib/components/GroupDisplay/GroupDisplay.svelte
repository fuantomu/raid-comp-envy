<script lang="ts">
  import LayoutGrid, {Cell} from "@smui/layout-grid";
  import {build} from "$lib/store";
  import SingleGroupDisplay from "$lib/components/GroupDisplay/SingleGroupDisplay.svelte";

  const spanDevices = {
    desktop: 3, tablet: 4, phone: 4
  }
</script>

<LayoutGrid>
    {#each {length: 8} as _, i}
        <Cell {spanDevices}>
            <SingleGroupDisplay group={i + 1}/>
        </Cell>
    {/each}
    {#if $build.players.find(p => p.group === "none")}
        <Cell span={12}>
            <SingleGroupDisplay group="none" displayAsGrid/>
        </Cell>
    {/if}
</LayoutGrid>