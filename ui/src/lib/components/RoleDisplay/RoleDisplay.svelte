<script lang="ts">
  import {PlayerRole} from "$lib/consts";
  import LayoutGrid, {Cell, InnerGrid} from "@smui/layout-grid";
  import SingleRoleDisplay from "$lib/components/RoleDisplay/SingleRoleDisplay.svelte";
  import {build} from "$lib/store";

  const spanDevices = {
    desktop: 4, tablet: 4, phone: 4
  }
</script>

<LayoutGrid>
    <Cell {spanDevices}>
        <InnerGrid>
            <Cell span={12}>
                <SingleRoleDisplay role={PlayerRole.Tank}/>
            </Cell>
            <Cell span={12}>
                <SingleRoleDisplay role={PlayerRole.Healer}/>
            </Cell>
        </InnerGrid>
    </Cell>
    <Cell {spanDevices}>
        <SingleRoleDisplay role={PlayerRole.RangedDPS}/>
    </Cell>
    <Cell {spanDevices}>
        <SingleRoleDisplay role={PlayerRole.MeleeDPS}/>
    </Cell>
    {#if $build.players.find(p => p.spec?.role === PlayerRole.Unknown)}
        <Cell span={12}>
            <SingleRoleDisplay role={PlayerRole.Unknown} displayAsGrid/>
        </Cell>
    {/if}
</LayoutGrid>