package uk.raidcomp.api.data.repository;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import uk.raidcomp.api.data.entity.AccountEntity;

@JdbcRepository(dialect = Dialect.MYSQL)
public interface AccountRepository extends CrudRepository<AccountEntity, String> {

}
