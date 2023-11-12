package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ImportBuildResponseDto(String buildId, String buildName, String team) {}
