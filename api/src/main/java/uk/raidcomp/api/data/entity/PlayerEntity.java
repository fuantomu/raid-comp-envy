package uk.raidcomp.api.data.entity;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.MappedEntity;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Getter
@Setter
@MappedEntity("Player")
@Table(name = "Player")
@Introspected
@Entity
public class PlayerEntity {
  @Id
  private String id;

  private String name;

  @Column(name = "className")
  private String className;

  private String spec;

  private String race;

  private String status;

  @Column(name = "groupId")
  private String groupId;

  private String main;

  private String alt;
}
