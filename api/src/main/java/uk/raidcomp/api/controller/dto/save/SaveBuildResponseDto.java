package uk.raidcomp.api.controller.dto.save;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record SaveBuildResponseDto(String players) {}
