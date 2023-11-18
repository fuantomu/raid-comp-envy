package uk.raidcomp.api.controller.dto.imports;

import io.micronaut.serde.annotation.Serdeable;
import uk.raidcomp.api.controller.dto.PlayerDto;

import java.util.List;

@Serdeable
public record ImportRosterResponseDto(List<PlayerDto> players) {}
