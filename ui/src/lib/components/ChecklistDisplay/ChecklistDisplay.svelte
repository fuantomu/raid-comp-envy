<script lang="ts">
  import LayoutGrid, {Cell} from "@smui/layout-grid";
  import ClassDisplay from "$lib/components/ChecklistDisplay/ClassDisplay.svelte";
  import BuffsDisplay from "$lib/components/ChecklistDisplay/BuffsDisplay.svelte";
  import UtilitiesDisplay from "$lib/components/ChecklistDisplay/UtilitiesDisplay.svelte";

  const spanDevices = {
    desktop: 4, tablet: 5, phone: 4
  }
</script>

<LayoutGrid style="margin-bottom: var(--bottom-bar-size)">
    <Cell {spanDevices}>
        <ClassDisplay/>
    </Cell>
    <Cell {spanDevices}>
        <BuffsDisplay/>
    </Cell>
    <Cell {spanDevices}>
        <UtilitiesDisplay/>
    </Cell>
</LayoutGrid>