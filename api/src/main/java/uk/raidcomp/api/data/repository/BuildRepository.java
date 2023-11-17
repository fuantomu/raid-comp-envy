package uk.raidcomp.api.data.repository;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import java.util.List;
import uk.raidcomp.api.data.entity.BuildEntity;

@JdbcRepository(dialect = Dialect.MYSQL)
public interface BuildRepository extends CrudRepository<BuildEntity, String> {
  List<BuildEntity> findByLastSeenLessThanEquals(long lastSeenMaxEpoch);
}
