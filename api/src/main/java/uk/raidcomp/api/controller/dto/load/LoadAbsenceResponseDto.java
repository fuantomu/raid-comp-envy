package uk.raidcomp.api.controller.dto.load;

import io.micronaut.serde.annotation.Serdeable;
import uk.raidcomp.api.controller.dto.AbsenceDto;

import java.util.List;

@Serdeable
public record LoadAbsenceResponseDto(List<AbsenceDto> absence) {
}
