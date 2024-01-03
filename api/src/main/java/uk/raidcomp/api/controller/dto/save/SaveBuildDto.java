package uk.raidcomp.api.controller.dto.save;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Serdeable
@Introspected
public record SaveBuildDto(String players, @NotBlank String name, @NotNull long date, String raidId, String instance) {
}
