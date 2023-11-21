<script lang="ts">
  import RoleDisplay from "$lib/components/RoleDisplay/RoleDisplay.svelte";
  import { GameVersionFactory } from "$lib/versioning/GameVersionFactory";
  import { build, context, displayGrouped, editing } from "$lib/store";
  import GroupDisplay from "$lib/components/GroupDisplay/GroupDisplay.svelte";
  import ChecklistDisplay from "$lib/components/ChecklistDisplay/ChecklistDisplay.svelte";
  import RoleCount from "$lib/components/RoleCount.svelte";
  import { getBuild } from "$lib/service/api";
  import BottomBar from "$lib/pages/ViewBuild/BottomBar.svelte";
  import WarcraftIcon from "$lib/components/WarcraftIcon.svelte";
  import type { ViewBuildPageParams } from "$lib/buildRouting";
  import { routeToCorrectBuildUrl } from "$lib/buildRouting";
  import Loading from "$lib/components/Loading.svelte";
  import { _ } from "svelte-i18n";
  import ErrorPage from "$lib/pages/ErrorPage/ErrorPage.svelte";

  export let params: ViewBuildPageParams;

  $editing = false;
  $context = GameVersionFactory.getContext(params.gameVersion);

  const iconLabel = $_(`versions.${params.gameVersion}`);

  const fetchBuild = (async () => {
    const fetchedBuild = (await getBuild(params.buildId)).data;
    routeToCorrectBuildUrl(params.gameVersion, fetchedBuild);
    build.set({
      ...fetchedBuild,
      players: fetchedBuild.players.map(p => $context.gameVersion.createPlayer(p)),
      gameVersion: fetchedBuild.gameVersion ?? params.gameVersion
    });
  })();

</script>

<svelte:head>
  <title>{$_("build.page.view.title", { values: { buildName: $build.name } })}</title>
</svelte:head>

{#await fetchBuild}
  <Loading />
{:then _}
  <div class="page content">
    <div class="title">
      <WarcraftIcon src={$context.iconProvider.getVersionIcon()} label={iconLabel} />
      {$build.name}
    </div>
    {#if $displayGrouped}
      <RoleCount />
      <GroupDisplay />
    {:else}
      <RoleDisplay />
    {/if}
    <ChecklistDisplay />
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

    .title {
        box-sizing: border-box;
        font-size: var(--spacing-l);
        padding: var(--spacing-m);
        text-align: center;
    }
</style>
