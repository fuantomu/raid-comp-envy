package uk.raidcomp.api.data.entity;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;
import uk.raidcomp.api.model.GroupId;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.game.WarcraftPlayerClass;
import uk.raidcomp.game.WarcraftPlayerSpec;

@Getter
@Setter
@Serdeable
public class PlayerEntity {
  private String name;
  private String realm;
  private WarcraftPlayerClass className;
  private WarcraftPlayerSpec spec;
  private InviteStatus status;
  private GroupId groupId;
}
