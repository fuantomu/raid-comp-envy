package uk.raidcomp.api.data.repository;

import io.micronaut.data.cosmos.annotation.CosmosRepository;
import io.micronaut.data.repository.CrudRepository;
import java.util.List;
import uk.raidcomp.api.data.entity.BuildEntity;

@CosmosRepository
public interface BuildRepository extends CrudRepository<BuildEntity, String> {
  List<BuildEntity> findByLastSeenLessThanEquals(long lastSeenMaxEpoch);
}
