<script lang="ts">
  import BottomBar from "./BottomBar.svelte";
  import RoleDisplay from "$lib/components/RoleDisplay/RoleDisplay.svelte";
  import { GameVersionFactory } from "$lib/versioning/GameVersionFactory";
  import { build, context, creatingBuild, displayGrouped, editing } from "$lib/store";
  import GroupDisplay from "$lib/components/GroupDisplay/GroupDisplay.svelte";
  import ChecklistDisplay from "$lib/components/ChecklistDisplay/ChecklistDisplay.svelte";
  import type { GameVersionSlug } from "$lib/versioning/GameVersion";
  import RoleCount from "$lib/components/RoleCount.svelte";
  import type { Build } from "$lib/service/api";
  import { _ } from "svelte-i18n";
  import Loading from "$lib/components/Loading.svelte";

  export let gameVersion: GameVersionSlug;
  export let fetchedBuild: Build | null = null;

  $context = GameVersionFactory.getContext(gameVersion);
  $editing = true;

  if (fetchedBuild !== null) {
    $build = {
      ...fetchedBuild,
      players: fetchedBuild.players.map(p => $context.gameVersion.createPlayer(p)),
      gameVersion: fetchedBuild.gameVersion ?? gameVersion
    };
  } else {
    $build = {
      gameVersion,
      buildId: "",
      name: "",
      players: []
    };
  }
</script>

<svelte:head>
  {#if $build.buildId}
    <title>{$_("build.page.edit.title", { values: { buildName: $build.name } })}</title>
  {:else}
    <title>{$_("build.page.new.title", { values: { version: $_(`versions.${gameVersion}`) } })}</title>
  {/if}
</svelte:head>

{#if $creatingBuild}
  <Loading />
{/if}

<div class="content">
  <div class="page">
    {#if $displayGrouped}
      <RoleCount />
      <GroupDisplay />
    {:else}
      <RoleDisplay />
    {/if}
    <ChecklistDisplay />
  </div>
</div>
<BottomBar />

<style>
    .page {
        @media screen and (min-width: 1200px) {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
