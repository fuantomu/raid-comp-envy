package uk.raidcomp.api.data.entity;

import io.micronaut.data.annotation.DateCreated;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import java.time.Instant;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedEntity("builds")
public class BuildEntity {
  @Id private String id;

  private String name;

  @DateCreated private Instant created;

  @DateCreated private long lastSeen;

  private List<PlayerEntity> players;
}
