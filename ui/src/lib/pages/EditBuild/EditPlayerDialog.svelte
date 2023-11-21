<script lang="ts">
  import SegmentedButton, {Segment} from '@smui/segmented-button';
  import Dialog, {Actions, Content, Title} from "@smui/dialog";
  import Button, {Label} from "@smui/button";
  import {build, context, currentlyEditingPlayerId, editPlayerDialogOpen} from "$lib/store";
  import {_} from "svelte-i18n";
  import {GROUP_NONE, InviteStatus, UNKNOWN_CLASS, UNKNOWN_SPEC} from "$lib/consts";
  import Textfield from "@smui/textfield";
  import WarcraftIcon from "$lib/components/WarcraftIcon.svelte";
  import type {PlayerClass} from "$lib/versioning/PlayerClass";
  import type {PlayerSpec} from "$lib/versioning/PlayerSpecialisation";
  import AttendanceIcon from "$lib/components/AttendanceIcon.svelte";
  import type {BuildPlayer, GroupId} from "$lib/types";

  const groups: GroupId[] = [GROUP_NONE, 1, 2, 3, 4, 5, 6, 7, 8];
  const defaultClass = $context.gameVersion.getClasses()[0];
  const defaultSpec = $context.gameVersion.getSpecs().filter(s => s.playerClass === defaultClass)[0];
  let currentlyEditing: BuildPlayer | undefined = undefined;

  let playerName: string | null = null;
  let selectedClass: PlayerClass | null = defaultClass;
  let selectedSpec: PlayerSpec | null = defaultSpec;
  let selectedStatus: InviteStatus | null = InviteStatus.Invited;
  let selectedGroup: GroupId | null = GROUP_NONE;

  currentlyEditingPlayerId.subscribe((id) => {
    currentlyEditing = $build.players.find(p => p.id === id);
    playerName = currentlyEditing?.name ?? null;
    selectedClass = currentlyEditing?.class ?? defaultClass;
    selectedSpec = currentlyEditing?.spec ?? defaultSpec;
    selectedStatus = currentlyEditing?.status ?? InviteStatus.Invited;
    selectedGroup = currentlyEditing?.group ?? GROUP_NONE;
  })

  const reset = () => {
    playerName = null;
    selectedClass = defaultClass;
    selectedSpec = defaultSpec;
    selectedStatus = InviteStatus.Invited;
  }

  const handleSave = () => {
    const players = $build.players;
    if (currentlyEditing) {
      players.splice(players.indexOf(currentlyEditing), 1);
    }
    players.push($context.gameVersion.createPlayer({
      name: playerName ?? "",
      class: selectedClass?.slug ?? UNKNOWN_CLASS,
      spec: selectedSpec?.slug ?? UNKNOWN_SPEC,
      status: selectedStatus ?? InviteStatus.Unknown,
      group: selectedGroup ?? GROUP_NONE
    }));

    $build = {...$build, players};
    reset();
  }

  const handleRemove = () => {
    const players = $build.players;
    if (currentlyEditing) {
      players.splice(players.indexOf(currentlyEditing), 1);
    }
    $build = {...$build, players};
    reset();
  }

  const findPreselectedSpec = () => {
    selectedSpec = $context.gameVersion.getSpecs().filter(s => s.playerClass.slug === selectedClass?.slug)[0];
  }
</script>

<Dialog
        bind:open={$editPlayerDialogOpen}
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
        surface$style="max-width: calc(100vw - 32px);"
>
    <Title id="simple-title">{$_("build.add.title")}</Title>
    <Content id="simple-content">
        <div class="content">
            <div class="input-wrapper">
                <Textfield
                        label={$_("build.add.name")}
                        type="text"
                        bind:value={playerName}
                        input$style="text-align: center; font-size: var(--spacing-m)"
                        style="min-width: 250px; width: 100%"/>
            </div>
            <div class="class-wrapper">
                <SegmentedButton
                        on:change={() => findPreselectedSpec()}
                        bind:selected={selectedClass}
                        segments={$context.gameVersion.getClasses()}
                        let:segment
                        singleSelect
                        key={(segment) => segment.slug}
                >
                    <Segment {segment} title={$_(`classes.${segment.slug}`)}>
                        <WarcraftIcon src={$context.iconProvider.getSrc(segment.icon)}/>
                    </Segment>
                </SegmentedButton>
            </div>
            <div class="spec-wrapper">
                <SegmentedButton
                        bind:selected={selectedSpec}
                        segments={$context.gameVersion.getSpecs().filter(s => s.playerClass.slug === selectedClass?.slug)}
                        let:segment
                        singleSelect
                        key={(segment) => segment.slug}
                >
                    <Segment {segment} title={$_(`specs.${segment.slug}`)}>
                        <WarcraftIcon src={$context.iconProvider.getSrc(segment.icon)}/>
                    </Segment>
                </SegmentedButton>
            </div>
            <div class="status-wrapper">
                <SegmentedButton
                        bind:selected={selectedStatus}
                        segments={Object.values(InviteStatus)}
                        let:segment
                        singleSelect
                >
                    <Segment {segment} title={$_(`status.${segment}`)}>
                        <AttendanceIcon status={segment}/>
                    </Segment>
                </SegmentedButton>
            </div>
            <div class="status-wrapper">
                <SegmentedButton
                        bind:selected={selectedGroup}
                        segments={groups}
                        let:segment
                        singleSelect
                >
                    <Segment {segment} title={$_(`build.groups.group_${segment}`)}>
                        <Label style="color: var(--palette-text-primary);">{$_(`build.add.groups.group_${segment}`)}</Label>
                    </Segment>
                </SegmentedButton>
            </div>
        </div>
    </Content>
    <Actions>
        {#if currentlyEditing}
            <Button class="button-danger" on:click={() => handleRemove()}>
                <Label>{$_("buttons.remove")}</Label>
            </Button>
        {/if}
        <Button class="button-cancel">
            <Label>{$_("buttons.cancel")}</Label>
        </Button>
        <Button on:click={() => handleSave()} class="button-safe">
            <Label>{$_(currentlyEditing ? "buttons.save" : "buttons.add")}</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    .content {
        display: grid;
        place-items: center;
    }

    .input-wrapper {
        width: 100%;
        text-align: center;
    }
</style>