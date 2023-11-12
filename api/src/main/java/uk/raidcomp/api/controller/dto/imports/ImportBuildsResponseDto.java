package uk.raidcomp.api.controller.dto.imports;

import io.micronaut.serde.annotation.Serdeable;
import java.util.List;

@Serdeable
public record ImportBuildsResponseDto(List<ImportBuildResponseDto> builds) {}
