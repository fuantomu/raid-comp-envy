<script lang="ts">
  import {_} from "svelte-i18n";
  import BottomAppBar, {Section} from "@smui-extra/bottom-app-bar";
  import Tooltip, {Wrapper} from "@smui/tooltip";
  import IconButton from "@smui/icon-button";
  import {build, displayGrouped} from "$lib/store";
</script>

<BottomAppBar variant="static" color={'secondary'}>
    <Section>
        <Wrapper>
            <IconButton class="material-icons" aria-label="{$_('cta.reportBug')}"
                        style="color: var(--palette-warning-main)"
                        on:click={() => window.open("https://github.com/StefanPuia/raid-comp/issues")}>
                bug_report
            </IconButton>
            <Tooltip yPos="above">{$_("cta.reportBug")}</Tooltip>
        </Wrapper>
    </Section>
    <Section>
    </Section>
    <Section>
        <!--        <Wrapper>-->
        <!--            <IconButton class="material-icons" aria-label="{$_('cta.importBuild')}"-->
        <!--                        style="color: var(&#45;&#45;palette-warning-light)">-->
        <!--                system_update_alt-->
        <!--            </IconButton>-->
        <!--            <Tooltip yPos="above">{$_("cta.importBuild")}</Tooltip>-->
        <!--        </Wrapper>-->
        <Wrapper>
            <a href="/build">
                <IconButton class="material-icons" aria-label="{$_('cta.newBuild')}"
                            style="color: var(--palette-success-main)">
                    add_box
                </IconButton>
            </a>
            <Tooltip yPos="above">{$_("cta.newBuild")}</Tooltip>
        </Wrapper>
        <Wrapper>
            <a href="/build/{$build.buildId}/edit">
                <IconButton class="material-icons" aria-label="{$_('cta.editBuild')}"
                            style="color: var(--palette-info-main)">
                    edit
                </IconButton>
            </a>
            <Tooltip yPos="above">{$_("cta.editBuild")}</Tooltip>
        </Wrapper>
        <Wrapper>
            <IconButton class="material-icons" aria-label="{$_('cta.changeViewMode')}"
                        style="color: var(--palette-info-main)"
                        on:click={() => ($displayGrouped = !$displayGrouped)}>
                grid_view
            </IconButton>
            <Tooltip yPos="above">{$_("cta.changeViewMode")}</Tooltip>
        </Wrapper>
    </Section>
</BottomAppBar>