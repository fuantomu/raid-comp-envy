<script lang="ts">
  import RoleDisplay from "$lib/components/RoleDisplay/RoleDisplay.svelte";
  import {GameVersionFactory} from "$lib/versioning/GameVersionFactory";
  import {build, context, displayGrouped, editing} from "$lib/store";
  import GroupDisplay from "$lib/components/GroupDisplay/GroupDisplay.svelte";
  import ChecklistDisplay from "$lib/components/ChecklistDisplay/ChecklistDisplay.svelte";
  import type {GameVersionSlug} from "$lib/versioning/GameVersion";
  import RoleCount from "$lib/components/RoleCount.svelte";
  import type {Build} from "$lib/service/api";
  import BottomBar from "$lib/pages/ViewBuild/BottomBar.svelte";
  import WarcraftIcon from "$lib/components/WarcraftIcon.svelte";
  import {_} from "svelte-i18n";

  export let gameVersion: GameVersionSlug;
  export let fetchedBuild: Build;

  $context = GameVersionFactory.getContext(gameVersion);
  $editing = false;

  $build = {
    ...fetchedBuild,
    players: fetchedBuild.players.map(p => $context.gameVersion.createPlayer(p)),
    gameVersion: fetchedBuild.gameVersion ?? gameVersion,
  };
</script>

<div class="page content">
    <div class="title">
        <WarcraftIcon src={$context.iconProvider.getVersionIcon()} label={$_(`versions.${gameVersion}`)}/>
        {$build.name}
    </div>
    {#if $displayGrouped}
        <RoleCount/>
        <GroupDisplay/>
    {:else}
        <RoleDisplay/>
    {/if}
    <ChecklistDisplay/>
</div>
<BottomBar/>

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
