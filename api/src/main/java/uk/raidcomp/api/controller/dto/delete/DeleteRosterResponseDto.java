package uk.raidcomp.api.controller.dto.delete;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record DeleteRosterResponseDto(String count) { }
