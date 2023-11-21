package uk.raidcomp.api.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.validation.Validated;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import uk.raidcomp.api.controller.dto.BuildMetaResponseDto;
import uk.raidcomp.api.controller.dto.BuildResponseDto;
import uk.raidcomp.api.controller.dto.CreateBuildRequestDto;
import uk.raidcomp.api.controller.dto.CreateBuildResponseDto;
import uk.raidcomp.api.delegate.BuildDelegate;
import uk.raidcomp.api.mapper.BuildMapper;
import uk.raidcomp.api.mapper.PlayerMapper;
import uk.raidcomp.cloudflare.turnstile.TurnstileDelegate;

@Validated
@Controller("/builds")
@AllArgsConstructor
public class BuildController {
  private final BuildDelegate buildDelegate;
  private final TurnstileDelegate turnstileDelegate;
  private final BuildMapper buildMapper;
  private final PlayerMapper playerMapper;

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
    if (turnstileDelegate.validate(createBuildRequestDto.token())) {
      return HttpResponse.created(
          buildMapper.toCreated(
              buildDelegate.create(
                  createBuildRequestDto.gameVersion(),
                  createBuildRequestDto.name(),
                  createBuildRequestDto.players().stream().map(playerMapper::toDomain).toList())));
    }
    return HttpResponse.status(HttpStatus.FORBIDDEN);
  }
}
