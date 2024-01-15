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
@MappedEntity("Account")
@Table(name = "Account")
@Serdeable
@Entity
public class AccountEntity {
  @Id
  private String username;

  private String password;

  private Integer role;
}
