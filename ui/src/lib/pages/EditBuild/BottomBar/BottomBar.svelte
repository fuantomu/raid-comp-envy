<script lang="ts">
  import { _ } from "svelte-i18n";
  import BottomAppBar, { Section } from "@smui-extra/bottom-app-bar";
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import Fab, { Icon } from "@smui/fab";
  import ResetBuildDialog from "../ResetBuildDialog.svelte";
  import { currentlyEditingPlayerId, editPlayerDialogOpen } from "$lib/store";
  import SaveBuildDialog from "$lib/pages/EditBuild/SaveBuildDialog.svelte";
  import EditPlayerDialog from "$lib/pages/EditBuild/EditPlayerDialog.svelte";
  import ChangeGameVersionDialog from "$lib/pages/EditBuild/ChangeGameVersionDialog.svelte";
  import LeftSide from "$lib/pages/EditBuild/BottomBar/LeftSide.svelte";
  import BurgerMenu from "$lib/pages/EditBuild/BottomBar/BurgerMenu.svelte";
  import RightSide from "$lib/pages/EditBuild/BottomBar/RightSide.svelte";

  const openEditPlayerDialog = () => {
    $editPlayerDialogOpen = true;
    $currentlyEditingPlayerId = null;
  };
</script>

<BottomAppBar variant="static" color={'secondary'}>
  <Section>
    <div class="display-small">
      <BurgerMenu />
    </div>
    <div class="display-large">
      <LeftSide />
    </div>
  </Section>
  <Section>
    <Wrapper>
      <Fab aria-label="{$_('cta.addPlayer')}" color={'primary'}
           on:click={() => openEditPlayerDialog()}>
        <Icon class="material-icons">add</Icon>
      </Fab>
      <Tooltip yPos="above">{$_("cta.addPlayer")}</Tooltip>
    </Wrapper>
  </Section>
  <Section>
    <div class="display-large">
      <RightSide />
    </div>
  </Section>

</BottomAppBar>
<ResetBuildDialog />
<ChangeGameVersionDialog />
<EditPlayerDialog />
<SaveBuildDialog />

<style>
    .display-large {
        @media screen and (min-width: 516px) {
            display: block;
        }
        @media screen and (max-width: 515px) {
            display: none;
        }
    }

    .display-small {
        @media screen and (min-width: 516px) {
            display: none;
        }
        @media screen and (max-width: 515px) {
            display: block;
        }
    }
</style>