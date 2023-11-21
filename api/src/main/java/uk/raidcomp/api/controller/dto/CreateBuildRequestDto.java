package uk.raidcomp.api.controller.dto;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import io.micronaut.serde.annotation.Serdeable.Deserializable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import uk.raidcomp.game.version.GameVersion;
import uk.raidcomp.game.version.GameVersion.GameVersionSerde;

@Serdeable
@Introspected
public record CreateBuildRequestDto(
    @NotBlank String token,
    @Deserializable(using = GameVersionSerde.class) @NotNull GameVersion gameVersion,
    @Size(min = 1, max = 500) @NotBlank String name,
    @Valid @Size(min = 1, max = 100) @NotNull @NotEmpty List<PlayerDto> players) {}
