package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record CreateBuildResponseDto(String buildId) {}
