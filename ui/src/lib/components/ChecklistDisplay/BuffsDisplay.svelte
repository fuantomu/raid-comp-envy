<script lang="ts">
  import { _ } from "svelte-i18n";
  import ChecklistCounter from "$lib/components/ChecklistDisplay/ChecklistCounter.svelte";
  import { build, context } from "$lib/store";
  import ChecklistWrapper from "$lib/components/ChecklistDisplay/ChecklistWrapper.svelte";
</script>

<ChecklistWrapper title={$_(`build.checklist.buffs`)} warning>
  {#each $context.gameVersion.getBuffs() as raidBuff}
    <ChecklistCounter
      label={$_(`buff.${raidBuff.slug}`)}
      count={$context.gameVersion.countBuffs($build.players, raidBuff)}
      iconSrc={$context.iconProvider.getSrc(raidBuff.icon)}
    />
  {/each}
</ChecklistWrapper>