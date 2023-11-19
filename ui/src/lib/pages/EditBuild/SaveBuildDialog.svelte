<script lang="ts">
  import IconButton from '@smui/icon-button';
  import Snackbar, { Label as SnackbarLabel, Actions as SnackbarActions } from '@smui/snackbar';
  import Dialog, {Actions, Content, Title} from "@smui/dialog";
  import Button, {Label} from "@smui/button";
  import {build, saveBuildDialogOpen} from "$lib/store";
  import Textfield from "@smui/textfield";
  import {_} from "svelte-i18n";
  import {createBuild, mapToApi} from "$lib/service/api";
  import {goto} from "$app/navigation";

  let buildName: string | null = $build.name || $_("build.new");
  let errorSnackbar: Snackbar;
  let error: string | null = null;
  const handleSave = () => {
    const newBuild = mapToApi({
      ...$build,
      name: buildName || $_("build.new")
    });
    createBuild(newBuild)
      .then(({data: {buildId}}) => goto(`/build/${buildId}`))
      .catch(err => {
        error = err.message;
        errorSnackbar.open();
      })
  }
</script>

<Dialog
        bind:open={$saveBuildDialogOpen}
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
>
    <Title id="simple-title">{$_("build.save.title")}</Title>
    {#if $build.players.length}
        <Content id="simple-content">
            <Textfield
                    type="text"
                    bind:value={buildName}
                    label={$_("build.save.input")}
                    style="min-width: 250px;"
            />
        </Content>
        <Actions>
            <Button class="button-cancel">
                <Label>{$_("buttons.cancel")}</Label>
            </Button>
            <Button on:click={() => handleSave()} class="button-safe">
                <Label>{$_("buttons.save")}</Label>
            </Button>
        </Actions>
    {:else}
        <Content>
            {$_("build.save.emptyBuild")}
        </Content>
        <Actions>
            <Button class="button-cancel">
                <Label>{$_("buttons.ok")}</Label>
            </Button>
        </Actions>
    {/if}
</Dialog>

<Snackbar bind:this={errorSnackbar}>
    <SnackbarLabel>{error}</SnackbarLabel>
    <SnackbarActions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </SnackbarActions>
</Snackbar>