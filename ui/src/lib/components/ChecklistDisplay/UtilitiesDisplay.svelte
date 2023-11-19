<script lang="ts">
  import Paper, {Content} from '@smui/paper';
  import {_} from "svelte-i18n";
  import ChecklistCounter from "$lib/components/ChecklistDisplay/ChecklistCounter.svelte";
  import {build, context} from "$lib/store";
</script>

<Paper>
    <Content>
        <div class="header">
            <span>{$_(`build.checklist.utilities`)}</span>
        </div>

        <div>
            {#each $context.gameVersion.getUtilities() as utility}
                <ChecklistCounter
                        label={$_(`utility.${utility.slug}`)}
                        count={$context.gameVersion.countUtilities($build.players, utility)}
                        iconSrc={$context.iconProvider.getSrc(utility.icon)}
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