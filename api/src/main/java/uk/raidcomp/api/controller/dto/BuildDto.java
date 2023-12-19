package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;

@Serdeable
public record BuildDto(
    @NotNull String id,
    @NotNull long date,
    @NotNull String name,
    @NotNull String players) {
}
