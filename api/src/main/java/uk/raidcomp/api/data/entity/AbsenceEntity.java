package uk.raidcomp.api.data.entity;

import io.micronaut.data.annotation.DateCreated;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

@Getter
@Setter
@Serdeable
@Entity
public class AbsenceEntity {
  @Id
  @GeneratedValue
  private String id;

  private String name;

  @DateCreated
  private long startDate;

  @DateCreated
  private long endDate;

  private String reason;
}
