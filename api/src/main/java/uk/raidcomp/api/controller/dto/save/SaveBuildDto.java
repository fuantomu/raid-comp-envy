package uk.raidcomp.api.controller.dto.save;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;
import uk.raidcomp.api.controller.dto.PlayerDto;
import java.util.List;

@Serdeable
@Introspected
public record SaveBuildDto(@NotBlank String server, @NotBlank String port, @NotBlank String database, @NotBlank String uid, @NotBlank String password, @NotBlank String table, List<PlayerDto> players) {}
