package uk.raidcomp.api.controller.dto.save;

import java.util.ArrayList;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;
import uk.raidcomp.api.controller.dto.PlayerDto;

@Serdeable
@Introspected
public record SavePlayersDto(@NotNull ArrayList<PlayerDto> players) {
}
