package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;

@Serdeable
public record AbsenceDto(
    @NotNull String id,
    @NotNull String name,
    @NotNull Long startDate,
    @NotNull Long endDate) {
}
