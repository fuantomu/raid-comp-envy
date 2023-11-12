package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record BuildMetaResponseDto(
    String name, Integer total, Integer tanks, Integer healers, Integer dps, Integer unknown) {}
