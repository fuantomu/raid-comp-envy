package uk.raidcomp.api.data.entity;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;
import uk.raidcomp.api.model.GroupId;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.api.model.WarcraftPlayerClass;
import uk.raidcomp.api.model.WarcraftPlayerSpec;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;

@Getter
@Setter
@Serdeable
@Entity
public class PlayerEntity {
  @Id
  private String name;

  private String realm;

  private WarcraftPlayerClass className;

  private WarcraftPlayerSpec spec;

  private InviteStatus status;

  private GroupId groupId;
}
