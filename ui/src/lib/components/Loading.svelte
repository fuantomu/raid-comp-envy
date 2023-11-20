<script lang="ts">

  import { _ } from "svelte-i18n";
</script>

<div class="base">
  <div class="inner">
    <span>{$_("loading")}</span>
  </div>
</div>

<style>
    .base {
        display: flex;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 100;
        background-color: color-mix(in srgb, var(--palette-background-default) 80%, transparent);
    }

    .inner {
        align-items: center;
        display: grid;
        grid-auto-flow: column;
        gap: var(--spacing-s);

        &::before {
            animation: spin 1s linear infinite;
            border: 5px solid var(--palette-secondary-light);
            border-top-color: var(--palette-text-primary);
            border-radius: 100%;
            content: "";
            display: block;
            height: var(--spacing-m);
            width: var(--spacing-m);
        }

        background-color: var(--palette-background-paper);
        border-radius: var(--spacing-xxs);
        box-shadow: 0 1px 4px rgba(51, 51, 51, 0.12);
        padding: var(--spacing-s) var(--spacing-l);
    }

    /* -global- */
    @keyframes -global-spin {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
