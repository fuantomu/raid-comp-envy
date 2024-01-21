package uk.raidcomp.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.serde.annotation.Serdeable.Serializable;
import uk.raidcomp.api.model.GroupId.GroupIdSerde;
import uk.raidcomp.api.model.InviteStatus.InviteStatusSerde;
import uk.raidcomp.api.model.WarcraftPlayerClass.WarcraftPlayerClassSerde;
import uk.raidcomp.api.model.WarcraftPlayerSpec.WarcraftPlayerSpecSerde;
import uk.raidcomp.api.model.WarcraftPlayerRace.WarcraftPlayerRaceSerde;

public record Player(
    String id,
    String name,
    @JsonProperty("class") @Serializable(using = WarcraftPlayerClassSerde.class) WarcraftPlayerClass className,
    @Nullable @Serializable(using = WarcraftPlayerSpecSerde.class) WarcraftPlayerSpec spec,
    @Nullable @Serializable(using = WarcraftPlayerRaceSerde.class) WarcraftPlayerRace race,
    @Serializable(using = InviteStatusSerde.class) InviteStatus status,
    @Nullable @Serializable(using = GroupIdSerde.class) GroupId groupId,
    @Nullable String main,
    @Nullable String alt) {
}
