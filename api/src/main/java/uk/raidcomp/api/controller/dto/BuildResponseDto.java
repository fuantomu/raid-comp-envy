package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.util.List;

@Serdeable
public record BuildResponseDto(String buildId, String name, List<PlayerDto> players) {}
