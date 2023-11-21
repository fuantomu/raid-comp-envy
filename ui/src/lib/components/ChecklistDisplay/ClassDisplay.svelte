<script lang="ts">
  import { _ } from "svelte-i18n";
  import ChecklistCounter from "$lib/components/ChecklistDisplay/ChecklistCounter.svelte";
  import { build, context } from "$lib/store";
  import ChecklistWrapper from "$lib/components/ChecklistDisplay/ChecklistWrapper.svelte";
</script>

<ChecklistWrapper title={$_(`build.checklist.classes`)}>
  {#each $context.gameVersion.getClasses() as playerClass}
    <ChecklistCounter
      label={$_(`classes.${playerClass.slug}`)}
      count={$context.gameVersion.countClasses($build.players, playerClass)}
      iconSrc={$context.iconProvider.getSrc(playerClass.icon)}
      colour={playerClass.colour}
    />
  {/each}
</ChecklistWrapper>