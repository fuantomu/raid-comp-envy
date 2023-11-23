package uk.raidcomp.api.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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

@Serdeable
public record PlayerDto(
    @NotNull String name,
    @Nullable String realm,
    @NotNull @JsonProperty("class") @Deserializable(using = WarcraftPlayerClassSerde.class)
        WarcraftPlayerClass className,
    @Nullable @Deserializable(using = WarcraftPlayerSpecSerde.class) WarcraftPlayerSpec spec,
    @NotNull @Deserializable(using = InviteStatusSerde.class) InviteStatus status,
    @Nullable @Deserializable(using = GroupIdSerde.class) GroupId group,
    @Nullable String main) {}
