<script lang="ts">
  import { _ } from "svelte-i18n";
  import { displayGrouped, saveBuildDialogOpen } from "$lib/store.js";
  import Tooltip, { Wrapper } from "@smui/tooltip/src/index.js";
  import IconButton from "@smui/icon-button/src/index.js";
</script>

<Wrapper>
  <IconButton class="material-icons" aria-label="{$_('cta.importBuild')}"
              style="color: var(--palette-warning-light)">
    system_update_alt
  </IconButton>
  <Tooltip yPos="above">{$_("cta.importBuild")}</Tooltip>
</Wrapper>
<Wrapper>
  <IconButton class="material-icons" aria-label="{$_('cta.changeViewMode')}"
              style="color: var(--palette-info-main)"
              on:click={() => ($displayGrouped = !$displayGrouped)}>
    grid_view
  </IconButton>
  <Tooltip yPos="above">{$_("cta.changeViewMode")}</Tooltip>
</Wrapper>
<Wrapper>
  <IconButton class="material-icons" aria-label="{$_('cta.saveBuild')}"
              style="color: var(--palette-success-main)"
              on:click={() => ($saveBuildDialogOpen = true)}>
    save
  </IconButton>
  <Tooltip yPos="above">{$_("cta.saveBuild")}</Tooltip>
</Wrapper>