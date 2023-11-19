package uk.raidcomp.api.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.validation.Validated;
import jakarta.validation.Valid;
import uk.raidcomp.api.controller.dto.BuildMetaResponseDto;
import uk.raidcomp.api.controller.dto.BuildResponseDto;
import uk.raidcomp.api.controller.dto.CreateBuildRequestDto;
import uk.raidcomp.api.controller.dto.CreateBuildResponseDto;
import uk.raidcomp.api.delegate.BuildDelegate;
import uk.raidcomp.api.mapper.BuildMapper;
import uk.raidcomp.api.mapper.PlayerMapper;

@Validated
@Controller("/builds")
public class BuildController {
  private final BuildDelegate buildDelegate;
  private final BuildMapper buildMapper;
  private final PlayerMapper playerMapper;

  public BuildController(
      final BuildDelegate buildDelegate,
      final BuildMapper buildMapper,
      final PlayerMapper playerMapper) {
    this.buildDelegate = buildDelegate;
    this.buildMapper = buildMapper;
    this.playerMapper = playerMapper;
  }

  @Get("/{buildId}")
  public HttpResponse<BuildResponseDto> getSingleBuild(@PathVariable final String buildId) {
    return buildDelegate
        .findById(buildId)
        .map(buildMapper::toDto)
        .map(HttpResponse::ok)
        .orElseGet(HttpResponse::notFound);
  }

  @Get("/{buildId}/meta")
  public HttpResponse<BuildMetaResponseDto> getBuildMeta(@PathVariable final String buildId) {
    return buildDelegate
        .findById(buildId)
        .map(buildMapper::toMeta)
        .map(HttpResponse::ok)
        .orElseGet(HttpResponse::notFound);
  }

  @Post
  public HttpResponse<CreateBuildResponseDto> createBuild(
      @Valid @Body CreateBuildRequestDto createBuildRequestDto) {
    return HttpResponse.created(
        buildMapper.toCreated(
            buildDelegate.create(
                createBuildRequestDto.gameVersion(),
                createBuildRequestDto.name(),
                createBuildRequestDto.players().stream().map(playerMapper::toDomain).toList())));
  }
}
