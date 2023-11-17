package uk.raidcomp.api.data.entity;

import io.micronaut.data.annotation.DateCreated;
import io.micronaut.data.annotation.MappedEntity;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import static jakarta.persistence.GenerationType.AUTO;

import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedEntity("builds")
@Entity
public class BuildEntity {
  @Id
  @GeneratedValue(strategy = AUTO)
  private String id;

  private String name;

  @DateCreated private Instant created;

  @DateCreated private long lastSeen;

  @JdbcTypeCode(SqlTypes.JSON)
  private List<PlayerEntity> players;
}
