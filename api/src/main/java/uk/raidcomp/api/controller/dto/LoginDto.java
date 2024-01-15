package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;

@Serdeable
public record LoginDto(
    @NotNull Long createdDate,
    @NotNull Integer role) {
}
