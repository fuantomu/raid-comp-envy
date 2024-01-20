package uk.raidcomp.api.controller.dto;

import java.util.List;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;
import uk.raidcomp.api.data.entity.AbsenceEntity;
import uk.raidcomp.api.data.entity.BuildEntity;
import uk.raidcomp.api.data.entity.PlayerEntity;

@Serdeable
public record UpdateDto(
    @NotNull List<BuildEntity> builds,
    @NotNull List<PlayerEntity> players,
    @NotNull List<AbsenceEntity> absences) {
}
