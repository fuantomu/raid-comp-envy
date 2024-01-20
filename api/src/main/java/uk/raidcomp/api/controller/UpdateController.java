package uk.raidcomp.api.controller;

import java.util.List;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import uk.raidcomp.api.controller.dto.UpdateDto;
import uk.raidcomp.api.data.entity.AbsenceEntity;
import uk.raidcomp.api.data.entity.BuildEntity;
import uk.raidcomp.api.data.entity.PlayerEntity;
import uk.raidcomp.api.data.repository.AbsenceRepository;
import uk.raidcomp.api.data.repository.BuildRepository;
import uk.raidcomp.api.data.repository.PlayerRepository;

@Controller("/update/")
public class UpdateController {

  protected final AbsenceRepository absenceRepository;
  protected final BuildRepository buildRepository;
  protected final PlayerRepository playerRepository;

  public UpdateController(AbsenceRepository absenceRepository, BuildRepository buildRepository,
      PlayerRepository playerRepository) {
    this.absenceRepository = absenceRepository;
    this.buildRepository = buildRepository;
    this.playerRepository = playerRepository;
  }

  @Get("/")
  public UpdateDto getUpdates() {
    BuildController buildController = new BuildController(buildRepository);
    PlayerController playerController = new PlayerController(playerRepository);
    AbsenceController absenceController = new AbsenceController(absenceRepository);
    List<BuildEntity> builds = buildController.listAllBuilds();
    List<PlayerEntity> players = playerController.getPlayers();
    List<AbsenceEntity> absences = absenceController.getAbsences();
    return new UpdateDto(builds, players, absences);
  }

}
