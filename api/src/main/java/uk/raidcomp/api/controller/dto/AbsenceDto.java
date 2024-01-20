package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;

@Serdeable
public record AbsenceDto(
    @NotNull String id,
    @NotNull String playerId,
    @NotNull Long startDate,
    @NotNull Long endDate,
    @Nullable String reason) {
}
