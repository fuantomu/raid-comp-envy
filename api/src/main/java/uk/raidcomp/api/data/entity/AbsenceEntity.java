package uk.raidcomp.api.data.entity;

import java.util.UUID;

import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Getter
@Setter
@MappedEntity("Absence")
@Table(name = "Absence")
@Serdeable
@Entity
public class AbsenceEntity {
  @Id
  private String id = UUID.randomUUID().toString();

  @Column(name = "playerId")
  private String playerId;

  @Column(name = "startDate")
  private long startDate;

  @Column(name = "endDate")
  private long endDate;

  private String reason;
}
