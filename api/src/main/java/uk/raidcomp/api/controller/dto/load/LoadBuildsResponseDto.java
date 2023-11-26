package uk.raidcomp.api.controller.dto.load;

import java.util.List;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoadBuildsResponseDto(List<String> builds) {}
