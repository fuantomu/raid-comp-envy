<script lang="ts">
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import Paper, { Content } from "@smui/paper";
  import { _ } from "svelte-i18n";
  import { Icon } from "@smui/fab";

  export let title: string;
  export let warning = false;
</script>

<Paper>
  <Content>
    <div class="header">
      <span>{title}</span>
      {#if warning}
        <span></span>
        <span class="warning">
        <Wrapper>
        <Icon class="material-icons" style="color: var(--palette-warning-main);">
          warning_amber
        </Icon>
        <Tooltip>{$_("warn.talentBasedUtilities")}</Tooltip>
      </Wrapper>
      </span>
      {/if}
    </div>

    <div>
      <slot />
    </div>
  </Content>
</Paper>

<style>
    .header {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-s);
        min-height: var(--spacing-l);
    }

    .warning {
        cursor: help;
    }
</style>