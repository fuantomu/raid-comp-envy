<script lang="ts">
  import Paper, {Content} from '@smui/paper';
  import {_} from "svelte-i18n";
  import ChecklistCounter from "$lib/components/ChecklistDisplay/ChecklistCounter.svelte";
  import {build, context} from "$lib/store";
</script>

<Paper>
    <Content>
        <div class="header">
            <span>{$_(`build.checklist.classes`)}</span>
        </div>

        <div>
            {#each $context.gameVersion.getClasses() as playerClass}
                <ChecklistCounter
                        label={$_(`classes.${playerClass.slug}`)}
                        count={$context.gameVersion.countClasses($build.players, playerClass)}
                        iconSrc={$context.iconProvider.getSrc(playerClass.icon)}
                        colour={playerClass.colour}
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