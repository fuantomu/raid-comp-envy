package uk.raidcomp.api.controller.dto;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Serdeable
@Introspected
public record CreateBuildRequestDto(
    @Size(min = 1, max = 500) @NotBlank String name,
    @Valid @Size(min = 1, max = 100) @NotNull @NotEmpty List<PlayerDto> players) {}
