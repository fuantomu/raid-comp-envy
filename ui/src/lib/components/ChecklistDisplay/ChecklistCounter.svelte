<script lang="ts">
  import WarcraftIcon from "$lib/components/WarcraftIcon.svelte";

  export let iconSrc: string;
  export let label: string;
  export let count: number;
  export let colour: string = "var(--palette-text-primary)";

  const countClassMap: Record<number, string> = {
    0: "count-failure",
    1: "count-warning"
  }
</script>

<div class="counter">
    <WarcraftIcon {label} src={iconSrc}/>
    <span class="name" style="color: {colour}">{label}</span>
    <span class="count {countClassMap[count] ?? 'count-success'}">{count}</span>
</div>

<style>
    .counter {
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
        /*font-weight: ${theme.typography.fontWeightMedium}!important;*/
        /*color: ${WarcraftClassColour[className]};*/
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .count {
        font-weight: bold;
    }

    .count-success {
        color: var(--palette-success-dark);
    }

    .count-warning {
        color: var(--palette-warning-main);
    }

    .count-failure {
        color: var(--palette-error-dark);
    }
</style>