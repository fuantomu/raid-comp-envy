<script lang="ts">
  import BottomBar from "./BottomBar.svelte";
  import RoleDisplay from "$lib/components/RoleDisplay/RoleDisplay.svelte";
  import { GameVersionFactory } from "$lib/versioning/GameVersionFactory";
  import { build, context, creatingBuild, displayGrouped, editing } from "$lib/store";
  import GroupDisplay from "$lib/components/GroupDisplay/GroupDisplay.svelte";
  import ChecklistDisplay from "$lib/components/ChecklistDisplay/ChecklistDisplay.svelte";
  import RoleCount from "$lib/components/RoleCount.svelte";
  import { getBuild } from "$lib/service/api";
  import { _ } from "svelte-i18n";
  import Loading from "$lib/components/Loading.svelte";
  import type { EditBuildPageParams } from "$lib/buildRouting";
  import { routeToCorrectBuildUrl } from "$lib/buildRouting";
  import ErrorPage from "$lib/pages/ErrorPage/ErrorPage.svelte";

  export let params: EditBuildPageParams;

  $editing = true;
  $context = GameVersionFactory.getContext(params.gameVersion);

  const fetchBuild = (async () => {
    if (!params.buildId) {
      build.set({
        gameVersion: params.gameVersion,
        buildId: "",
        name: "",
        players: []
      });
      return;
    }
    const fetchedBuild = (await getBuild(params.buildId)).data;
    routeToCorrectBuildUrl(params.gameVersion, fetchedBuild, true);
    build.set({
      ...fetchedBuild,
      players: fetchedBuild.players.map(p => $context.gameVersion.createPlayer(p)),
      gameVersion: fetchedBuild.gameVersion ?? params.gameVersion
    });
  })();
</script>

<svelte:head>
  {#if $build.buildId}
    <title>{$_("build.page.edit.title", { values: { buildName: $build.name } })}</title>
  {:else}
    <title>{$_("build.page.new.title", { values: { version: $_(`versions.${params.gameVersion}`) } })}</title>
  {/if}
</svelte:head>

{#await fetchBuild}
  <Loading />
{:then _}
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
{:catch error}
  <ErrorPage {error} />
{/await}

<style>
    .page {
        @media screen and (min-width: 1200px) {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
