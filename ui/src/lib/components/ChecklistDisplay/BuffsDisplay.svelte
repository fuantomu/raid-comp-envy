<script lang="ts">
  import Paper, {Content} from '@smui/paper';
  import {_} from "svelte-i18n";
  import ChecklistCounter from "$lib/components/ChecklistDisplay/ChecklistCounter.svelte";
  import {build, context} from "$lib/store";
</script>

<Paper>
    <Content>
        <div class="header">
            <span>{$_(`build.checklist.buffs`)}</span>
        </div>

        <div>
            {#each $context.gameVersion.getBuffs() as raidBuff}
                <ChecklistCounter
                        label={$_(`buff.${raidBuff.slug}`)}
                        count={$context.gameVersion.countBuffs($build.players, raidBuff)}
                        iconSrc={$context.iconProvider.getSrc(raidBuff.icon)}
                />
            {/each}
        </div>
    </Content>
</Paper>

<style>
    .header {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: var(--spacing-xs);
    }
</style>