package uk.raidcomp.api.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;
import uk.raidcomp.api.controller.dto.imports.ImportRosterDto;
import uk.raidcomp.api.controller.dto.imports.ImportRosterResponseDto;
import uk.raidcomp.api.controller.dto.save.SaveBuildDto;
import uk.raidcomp.api.controller.dto.save.SaveBuildResponseDto;
import uk.raidcomp.api.controller.dto.load.LoadBuildDto;
import uk.raidcomp.api.controller.dto.load.LoadBuildResponseDto;
import uk.raidcomp.api.mapper.BuildMapper;
import uk.raidcomp.sql.SqlHelperDelegate;

@Controller("/build/sql")
public class RosterController {

  private final SqlHelperDelegate delegate;

  public RosterController(final SqlHelperDelegate delegate, final BuildMapper mapper) {
    this.delegate = delegate;
  }

  @Post("/import")
  public HttpResponse<ImportRosterResponseDto> importFromSql(
      @Valid @Body ImportRosterDto body) {
    return HttpResponse.created(new ImportRosterResponseDto(delegate.getRoster(body)));
  }

  @Post("/save")
  public HttpResponse<SaveBuildResponseDto> saveToSql(
      @Valid @Body SaveBuildDto body) {
    return HttpResponse.created(new SaveBuildResponseDto(delegate.saveBuild(body)));
  }

  @Post("/load")
  public HttpResponse<LoadBuildResponseDto> loadFromSql(
      @Valid @Body LoadBuildDto body) {
    return HttpResponse.created(new LoadBuildResponseDto(delegate.loadBuild(body)));
  }
}
