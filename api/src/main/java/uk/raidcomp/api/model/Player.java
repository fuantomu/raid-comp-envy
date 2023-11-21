package uk.raidcomp.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.serde.annotation.Serdeable.Serializable;
import uk.raidcomp.api.model.GroupId.GroupIdSerde;
import uk.raidcomp.api.model.InviteStatus.InviteStatusSerde;
import uk.raidcomp.game.WarcraftPlayerClass;
import uk.raidcomp.game.WarcraftPlayerClass.WarcraftPlayerClassSerde;
import uk.raidcomp.game.WarcraftPlayerSpec;
import uk.raidcomp.game.WarcraftPlayerSpec.WarcraftPlayerSpecSerde;

public record Player(
    String name,
    @Nullable String realm,
    @JsonProperty("class") @Serializable(using = WarcraftPlayerClassSerde.class)
    WarcraftPlayerClass className,
    @Nullable @Serializable(using = WarcraftPlayerSpecSerde.class) WarcraftPlayerSpec spec,
    @Serializable(using = InviteStatusSerde.class) InviteStatus status,
    @Nullable @Serializable(using = GroupIdSerde.class) GroupId groupId) {}
