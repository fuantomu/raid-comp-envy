<script lang="ts">
  import {_} from "svelte-i18n";
  import BottomAppBar, {Section} from "@smui-extra/bottom-app-bar";
  import Tooltip, {Wrapper} from "@smui/tooltip";
  import Fab, {Icon} from "@smui/fab";
  import IconButton from "@smui/icon-button";
  import ResetBuildDialog from "./ResetBuildDialog.svelte";
  import {
    build,
    currentlyEditingPlayerId,
    displayGrouped,
    editPlayerDialogOpen,
    resetBuildDialogOpen,
    saveBuildDialogOpen
  } from "$lib/store";
  import SaveBuildDialog from "$lib/pages/EditBuild/SaveBuildDialog.svelte";
  import EditPlayerDialog from "$lib/pages/EditBuild/EditPlayerDialog.svelte";

  const openEditPlayerDialog = () => {
    $editPlayerDialogOpen = true;
    $currentlyEditingPlayerId = null;
  }
</script>

<BottomAppBar variant="static" color={'secondary'}>
    <Section>
        <Wrapper>
            <IconButton class="material-icons" aria-label="{$_('cta.resetBuild')}"
                        style="color: var(--palette-error-main)"
                        on:click={() => ($resetBuildDialogOpen = true)}>
                delete_forever
            </IconButton>
            <Tooltip yPos="above">{$_("cta.resetBuild")}</Tooltip>
            <ResetBuildDialog/>
        </Wrapper>
        <Wrapper>
            <IconButton class="material-icons" aria-label="{$_('cta.reportBug')}"
                        style="color: var(--palette-warning-main)"
                        on:click={() => window.open("https://github.com/StefanPuia/raid-comp/issues")}>
                bug_report
            </IconButton>
            <Tooltip yPos="above">{$_("cta.reportBug")}</Tooltip>
        </Wrapper>
        <Wrapper>
            <IconButton class="material-icons" aria-label="{$_('cta.changeGameVersion')}"
                        style="color: var(--palette-info-main)">
                extension
            </IconButton>
            <Tooltip yPos="above">{$_("cta.changeGameVersion")}</Tooltip>
        </Wrapper>
    </Section>
    <Section>
        <Wrapper>
            <Fab aria-label="{$_('cta.addPlayer')}" color={'primary'}
                 on:click={() => openEditPlayerDialog()}>
                <Icon class="material-icons">add</Icon>
            </Fab>
            <Tooltip yPos="above">{$_("cta.addPlayer")}</Tooltip>
            <EditPlayerDialog/>
        </Wrapper>
    </Section>
    <Section>
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
            <SaveBuildDialog/>
        </Wrapper>
    </Section>
</BottomAppBar>