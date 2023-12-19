package uk.raidcomp.api.controller.dto.save;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;
import uk.raidcomp.api.controller.dto.AbsenceDto;

@Serdeable
@Introspected
public record SaveAbsenceDto(@NotNull AbsenceDto absence) {
}
