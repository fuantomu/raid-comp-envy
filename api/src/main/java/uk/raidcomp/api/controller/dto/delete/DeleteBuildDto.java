package uk.raidcomp.api.controller.dto.delete;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
@Introspected
public record DeleteBuildDto(@NotBlank String server, @NotBlank String port, @NotBlank String database, @NotBlank String uid, @NotBlank String password, @NotBlank String table, @NotBlank String build) {}
