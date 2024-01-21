package uk.raidcomp.api.controller.dto;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.serde.annotation.Serdeable;
import io.micronaut.serde.annotation.Serdeable.Deserializable;
import jakarta.validation.constraints.NotNull;
import uk.raidcomp.api.model.GroupId;
import uk.raidcomp.api.model.GroupId.GroupIdSerde;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.api.model.InviteStatus.InviteStatusSerde;
import uk.raidcomp.api.model.WarcraftPlayerClass;
import uk.raidcomp.api.model.WarcraftPlayerClass.WarcraftPlayerClassSerde;
import uk.raidcomp.api.model.WarcraftPlayerSpec;
import uk.raidcomp.api.model.WarcraftPlayerSpec.WarcraftPlayerSpecSerde;
import uk.raidcomp.api.model.WarcraftPlayerRace;
import uk.raidcomp.api.model.WarcraftPlayerRace.WarcraftPlayerRaceSerde;

@Serdeable
public record PlayerDto(
    @NotNull String id,
    @NotNull String name,
    @NotNull @Deserializable(using = WarcraftPlayerClassSerde.class) WarcraftPlayerClass className,
    @Nullable @Deserializable(using = WarcraftPlayerSpecSerde.class) WarcraftPlayerSpec spec,
    @Nullable @Deserializable(using = WarcraftPlayerRaceSerde.class) WarcraftPlayerRace race,
    @NotNull @Deserializable(using = InviteStatusSerde.class) InviteStatus status,
    @Nullable @Deserializable(using = GroupIdSerde.class) GroupId group,
    @Nullable String main,
    @Nullable String alt) {
}
