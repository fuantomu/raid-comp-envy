package uk.raidcomp.api.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Comparator;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
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

  @Get("/delete/{buildId}")
  public void deleteFromSql(String buildId) {
    buildRepository.deleteById(buildId);
  }

  @Get("/")
  public List<BuildEntity> listAllBuilds() {
    return buildRepository.findAll();
  }

  @Get("/params")
  public List<BuildEntity> getBuildsWithParams(@QueryValue Optional<Long> date) {
    List<BuildEntity> buildList = buildRepository.findAll();
    if (!date.isEmpty()) {
      buildList = buildList.stream().filter(build -> build.getDate().equals(date.get()))
          .collect(Collectors.toList());
    }
    return buildList;
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
    newBuild.setRaidId(body.raidId());
    newBuild.setInstance(body.instance());

    Optional<BuildEntity> build = buildRepository.findById(buildId);

    if (build.isEmpty()) {

      try {
        List<BuildEntity> otherBuilds = buildRepository.findAll();
        BuildEntity maxRaidId = otherBuilds.stream().max(Comparator.comparing(BuildEntity::getRaidId)).orElseThrow();
        newBuild.setRaidId(String.valueOf(Integer.parseInt(maxRaidId.getRaidId()) + 1));
      } catch (Exception e) {
        newBuild.setRaidId("0");
      }

      buildRepository.save(newBuild);
    } else {
      buildRepository.update(newBuild);
    }

  }
}
