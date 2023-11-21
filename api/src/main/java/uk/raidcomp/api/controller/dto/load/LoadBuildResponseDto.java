package uk.raidcomp.api.controller.dto.load;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoadBuildResponseDto(String players) {}
