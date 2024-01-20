package uk.raidcomp.api.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;
import uk.raidcomp.api.controller.dto.save.SaveAbsenceDto;
import uk.raidcomp.api.data.entity.AbsenceEntity;
import uk.raidcomp.api.data.repository.AbsenceRepository;

@Controller("/absence/")
public class AbsenceController {

  protected final AbsenceRepository absenceRepository;

  public AbsenceController(AbsenceRepository absenceRepository) {
    this.absenceRepository = absenceRepository;
  }

  @Get("/")
  public List<AbsenceEntity> getAbsences() {
    return absenceRepository.findAll();
  }

  @Get("/{absenceId}")
  public Optional<AbsenceEntity> getAbsence(String absenceId) {
    return absenceRepository.findById(absenceId);
  }

  @Post("/delete/{absenceId}")
  public void deleteAbsence(String absenceId) {
    absenceRepository.deleteById(absenceId);
  }

  @Post("/")
  public void saveAbsence(@Valid @Body SaveAbsenceDto body) {
    AbsenceEntity newAbsence = new AbsenceEntity();
    newAbsence.setId(UUID.randomUUID().toString());
    newAbsence.setPlayerId(body.absence().playerId());
    newAbsence.setStartDate(body.absence().startDate());
    newAbsence.setEndDate(body.absence().endDate());
    newAbsence.setReason(body.absence().reason());

    absenceRepository.save(newAbsence);
  }
}
