<script lang="ts">
  import Dialog, {Actions, Content, Title} from "@smui/dialog";
  import Button, {Label} from "@smui/button";
  import {build, resetBuildDialogOpen} from "$lib/store";
  import {_} from "svelte-i18n";

  const handleDelete = () => {
    $build = {...$build, players: []};
  }
</script>

<Dialog
        bind:open={$resetBuildDialogOpen}
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
>
    <Title id="simple-title">{$_("build.reset.title")}</Title>
    <Content id="simple-content">{$_("build.reset.confirm")}</Content>
    <Actions>
        <Button on:click={() => handleDelete()} class="button-danger">
            <Label>{$_("buttons.ok")}</Label>
        </Button>
        <Button class="button-cancel">
            <Label>{$_("buttons.cancel")}</Label>
        </Button>
    </Actions>
</Dialog>