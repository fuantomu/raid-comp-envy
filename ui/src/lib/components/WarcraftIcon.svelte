<script lang="ts">
  import Tooltip, {Wrapper} from "@smui/tooltip";

  export let src: string;
  export let label: string = ""
</script>

<Wrapper>
    <img {src} alt="{label}" class="warcraft-icon"/>
    {#if label}
        <Tooltip>{label}</Tooltip>
    {/if}
</Wrapper>

<style>
    .warcraft-icon {
        width: var(--spacing-l);
        height: var(--spacing-l);
        border-radius: var(--spacing-xxs);
        vertical-align: middle;
    }
</style>