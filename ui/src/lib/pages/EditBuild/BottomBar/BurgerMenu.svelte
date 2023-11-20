<script lang="ts">
  import Menu from "@smui/menu";
  import List, { Item, Separator, Text } from "@smui/list";
  import { _ } from "svelte-i18n";
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import IconButton from "@smui/icon-button";
  import { changeGameVersionDialogOpen, displayGrouped, resetBuildDialogOpen, saveBuildDialogOpen } from "$lib/store";
  import { Icon } from "@smui/fab";

  let menu: Menu;
</script>


<Wrapper>
  <IconButton class="material-icons" aria-label="{$_('cta.openMenu')}"
              style="color: var(--palette-info-main)"
              on:click={() => menu.setOpen(true)}>
    menu
  </IconButton>
  <Tooltip yPos="above">{$_("cta.openMenu")}</Tooltip>
</Wrapper>


<Menu bind:this={menu}>
  <List>
    <Item on:SMUI:action={() => ($saveBuildDialogOpen = true)}>
      <Icon class="material-icons" style="color: var(--palette-success-main)">save</Icon>
      <Text>{$_('cta.saveBuild')}</Text>
    </Item>
    <Item on:SMUI:action={() => ($displayGrouped = !$displayGrouped)}>
      <Icon class="material-icons" style="color: var(--palette-info-main)">grid_view</Icon>
      <Text>{$_('cta.changeViewMode')}</Text>
    </Item>
    <Item on:SMUI:action={() => ($resetBuildDialogOpen = true)}>
      <Icon class="material-icons" style="color: var(--palette-warning-light)">system_update_alt</Icon>
      <Text>{$_('cta.importBuild')}</Text>
    </Item>

    <Separator />

    <Item on:SMUI:action={() => ($changeGameVersionDialogOpen = true)}>
      <Icon class="material-icons" style="color: var(--palette-info-main)">extension</Icon>
      <Text>{$_('cta.changeGameVersion')}</Text>
    </Item>
    <Item on:SMUI:action={() => window.open("https://github.com/StefanPuia/raid-comp/issues")}>
      <Icon class="material-icons" style="color: var(--palette-warning-main)">bug_report</Icon>
      <Text>{$_('cta.reportBug')}</Text>
    </Item>
    <Item on:SMUI:action={() => ($resetBuildDialogOpen = true)}>
      <Icon class="material-icons" style="color: var(--palette-error-main)">delete_forever</Icon>
      <Text>{$_('cta.resetBuild')}</Text>
    </Item>
  </List>
</Menu>