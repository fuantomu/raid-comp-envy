<script lang="ts">
  import { Turnstile } from "svelte-turnstile";
  import Snackbar from "@smui/snackbar";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { build, context, creatingBuild, saveBuildDialogOpen } from "$lib/store";
  import Textfield from "@smui/textfield";
  import { _ } from "svelte-i18n";
  import { createBuild, mapToApi } from "$lib/service/api";
  import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
  import { ApiError } from "$lib/service/error";

  let buildName: string | null = $build.name || $_("build.new");
  let errorSnackbar: Snackbar;
  let error: string | null = null;
  let turnstileToken: string = "";

  const handleSave = () => {
    const newBuild = mapToApi({
      ...$build,
      name: buildName || $_("build.new"),
      gameVersion: $context.gameVersion.getSlug()
    });
    $creatingBuild = true;
    createBuild({
      ...newBuild,
      token: turnstileToken
    })
      .then(({ data: { buildId } }) => {
        window.location.href = `/build/${buildId}`;
      })
      .catch(err => {
        $creatingBuild = false;
        error = err instanceof ApiError ? $_(`error.${err.id}`) : err.message;
        errorSnackbar.open();
      });
  };
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
        style="min-width: 250px; margin-bottom: var(--spacing-s)"
      />
      <Turnstile on:turnstile-callback={({ detail: { token } }) => (turnstileToken = token)} forms={false}
                 siteKey={PUBLIC_TURNSTILE_SITE_KEY} />
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

<Snackbar bind:this={errorSnackbar} class="error">
  <Label>{error}</Label>
</Snackbar>
