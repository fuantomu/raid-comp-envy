package uk.raidcomp.api.model.imported;

import uk.raidcomp.api.model.GroupId;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.api.model.WarcraftPlayerClass;
import uk.raidcomp.api.model.WarcraftPlayerSpec;

public record PlayerSignup(
    String name,
    String realm,
    WarcraftPlayerClass className,
    WarcraftPlayerSpec spec,
    InviteStatus status,
    GroupId groupId,
    String discordId) {}
