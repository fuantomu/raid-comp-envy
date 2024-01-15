package uk.raidcomp.api.data.entity;

import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;

@Getter
@Setter
@MappedEntity("Login")
@Table(name = "Login")
@Serdeable
@Entity
public class LoginEntity {
  @Id
  private String host;

  private Long created;
}
