package uk.raidcomp.api.controller.dto.delete;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record DeleteBuildResponseDto(String count) { }
