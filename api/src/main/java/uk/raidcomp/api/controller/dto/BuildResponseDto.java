package uk.raidcomp.api.controller.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.util.List;
import uk.raidcomp.game.version.GameVersion;

@Serdeable
public record BuildResponseDto(
    String buildId, GameVersion gameVersion, String name, List<PlayerDto> players) {}
