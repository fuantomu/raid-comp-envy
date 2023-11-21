<script lang="ts">
  import List, { Item, Text } from "@smui/list";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { changeGameVersionDialogOpen, context } from "$lib/store";
  import { _ } from "svelte-i18n";
  import { GameVersionSlug } from "$lib/versioning/GameVersion";
  import WarcraftIcon from "$lib/components/WarcraftIcon.svelte";

  const currentVersion = $context.gameVersion.getSlug();

  const versions = Object.values(GameVersionSlug).filter(v => v !== currentVersion);
  const handleChange = () => {
    if (selectedVersion && selectedVersion !== currentVersion) {
      window.location.href = `/${selectedVersion}/build`;
    }
  };

  let selectedVersion: string;
</script>

<Dialog
  bind:open={$changeGameVersionDialogOpen}
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <Title id="simple-title">{$_("build.changeVersion.title")}</Title>
  <Content id="simple-content">
    <p>
      {$_("build.changeVersion.confirm")}
    </p>
    <p>
      {$_("build.changeVersion.current")}:
      <WarcraftIcon src={$context.iconProvider.getVersionIcon()} />
      <span class="current"><strong>{$_(`versions.${currentVersion}`)}</strong></span>
    </p>


    <List class="demo-list">
      {#each versions as version}
        <Item on:SMUI:action={() => (selectedVersion = version)}
              style="{selectedVersion === version ? 'background-color: var(--palette-success-dark);' : ''} border-radius: var(--spacing-xs)">
          <Text>{$_(`versions.${version}`)}</Text>
        </Item>
      {/each}
    </List>
  </Content>
  <Actions>
    <Button on:click={() => handleChange()} class="button-danger">
      <Label>{$_("buttons.ok")}</Label>
    </Button>
    <Button class="button-cancel">
      <Label>{$_("buttons.cancel")}</Label>
    </Button>
  </Actions>
</Dialog>

<style>
    .current {
        color: var(--palette-info-main);
    }
</style>