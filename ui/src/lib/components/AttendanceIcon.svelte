<script lang="ts">
  import {InviteStatus} from "$lib/consts";
  import {Icon} from "@smui/fab";
  import Tooltip, {Wrapper} from "@smui/tooltip";
  import {_} from "svelte-i18n";

  const iconMap: Record<InviteStatus, [icon: string, colour: string]> = {
    [InviteStatus.Accepted]: ["event_available", "success-main"],
    [InviteStatus.Backup]: ["loop", "success-light"],
    [InviteStatus.Benched]: ["chair", "error-light"],
    [InviteStatus.Declined]: ["event_busy", "error-main"],
    [InviteStatus.Invited]: ["insert_invitation", "info-main"],
    [InviteStatus.Tentative]: ["calendar_today", "warning-main"],
    [InviteStatus.Unknown]: ["help", "secondary-light"]

  }

  export let status: InviteStatus;

  let icon = '';
  let colour = '';

  $: {
    [icon, colour] = iconMap[status];
  }
</script>

<Wrapper>
    <Icon class="material-icons" style="color: var(--palette-{colour})">
        {icon}
    </Icon>
    <Tooltip>{$_(`status.${status}`)}</Tooltip>
</Wrapper>
