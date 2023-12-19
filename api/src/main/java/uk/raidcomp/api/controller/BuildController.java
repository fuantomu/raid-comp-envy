package uk.raidcomp.api.controller;

import java.util.List;
import java.util.Optional;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;
import uk.raidcomp.api.controller.dto.save.SaveBuildDto;
import uk.raidcomp.api.data.entity.BuildEntity;
import uk.raidcomp.api.data.repository.BuildRepository;

@Controller("/build/")
public class BuildController {

  protected final BuildRepository buildRepository;

  public BuildController(BuildRepository buildRepository) {
    this.buildRepository = buildRepository;
  }

  @Post("/delete/{buildId}")
  public void deleteFromSql(String buildId) {
    buildRepository.deleteById(buildId);
  }

  @Get("/")
  public List<BuildEntity> listAllBuilds() {
    return buildRepository.findAll();
  }

  @Get("/{buildId}")
  public Optional<BuildEntity> getBuild(String buildId) {
    return buildRepository.findById(buildId);
  }

  @Post("/{buildId}")
  public void saveBuild(String buildId, @Valid @Body SaveBuildDto body) {
    BuildEntity newBuild = new BuildEntity();
    newBuild.setId(buildId);
    newBuild.setName(body.name());
    newBuild.setPlayers(body.players());
    newBuild.setDate(body.date());

    Optional<BuildEntity> build = buildRepository.findById(buildId);

    if (build.isEmpty()) {
      buildRepository.save(newBuild);
    } else {
      buildRepository.update(newBuild);
    }

  }
}
