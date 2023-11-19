<script lang="ts">

  import type {BuildPlayer} from "$lib/types";
  import WarcraftIcon from "$lib/components/WarcraftIcon.svelte";
  import AttendanceIcon from "$lib/components/AttendanceIcon.svelte";
  import {context, currentlyEditingPlayerId, editing, editPlayerDialogOpen} from "$lib/store";
  import {_} from "svelte-i18n";

  export let player: BuildPlayer;

  const handleClick = () => {
    if ($editing) {
      $currentlyEditingPlayerId = player.id;
      $editPlayerDialogOpen = true;
    }
  }
</script>

<div class="player" on:click={() => handleClick()}>
    <WarcraftIcon
            label={$_(player.spec ? `specs.${player.spec.slug}` : `classes.${player.class.slug}`)}
            src={$context.iconProvider.getSrc(player.spec?.icon ?? player.class.icon)}
    />
    <span class="name" style="color: var(--player-class-colour-{player.class.slug})">{player.name}</span>
    <AttendanceIcon status={player.status}/>
</div>

<style>
    .player {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: var(--spacing-m);
        padding: var(--spacing-xs);
        margin: var(--spacing-xss) 0;
        border-radius: var(--spacing-xxs);
        align-items: center;
        user-select: none;
        /*cursor: ${isClickable && "pointer"};*/

        &:hover {
            background-color: var(--palette-secondary-dark);
        }
    }

    .name {
        font-weight: 500;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>