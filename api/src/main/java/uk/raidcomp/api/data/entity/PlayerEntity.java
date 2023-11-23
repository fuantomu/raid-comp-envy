package uk.raidcomp.api.data.entity;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;

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

  private String className;

  private String spec;

  private String race;

  private String status;

  private String groupId;

  private String main;
}
