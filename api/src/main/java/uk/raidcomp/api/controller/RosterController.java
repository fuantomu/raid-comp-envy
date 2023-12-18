package uk.raidcomp.api.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;
import uk.raidcomp.api.controller.dto.imports.ImportRosterDto;
import uk.raidcomp.api.controller.dto.imports.ImportRosterResponseDto;
import uk.raidcomp.api.controller.dto.save.SaveAbsenceDto;
import uk.raidcomp.api.controller.dto.save.SaveAbsenceResponseDto;
import uk.raidcomp.api.controller.dto.save.SaveBuildDto;
import uk.raidcomp.api.controller.dto.save.SaveRosterDto;
import uk.raidcomp.api.controller.dto.save.SaveBuildResponseDto;
import uk.raidcomp.api.controller.dto.load.LoadAbsenceDto;
import uk.raidcomp.api.controller.dto.load.LoadAbsenceResponseDto;
import uk.raidcomp.api.controller.dto.load.LoadBuildDto;
import uk.raidcomp.api.controller.dto.load.LoadBuildResponseDto;
import uk.raidcomp.api.controller.dto.load.LoadBuildsDto;
import uk.raidcomp.api.controller.dto.load.LoadBuildsResponseDto;
import uk.raidcomp.api.controller.dto.delete.DeleteBuildDto;
import uk.raidcomp.api.controller.dto.delete.DeleteBuildResponseDto;
import uk.raidcomp.api.controller.dto.delete.DeleteRosterDto;
import uk.raidcomp.api.controller.dto.delete.DeleteRosterResponseDto;
import uk.raidcomp.sql.SqlHelperDelegate;

@Controller("/builds/")
public class RosterController {

  private final SqlHelperDelegate delegate;

  public RosterController(final SqlHelperDelegate delegate) {
    this.delegate = delegate;
  }

  @Post("/roster/import")
  public HttpResponse<ImportRosterResponseDto> importFromSql(
      @Valid @Body ImportRosterDto body) {
    return HttpResponse.created(new ImportRosterResponseDto(delegate.getRoster(body)));
  }

  @Post("/save")
  public HttpResponse<SaveBuildResponseDto> saveBuildToSql(
      @Valid @Body SaveBuildDto body) {
    return HttpResponse.created(new SaveBuildResponseDto(delegate.saveBuild(body)));
  }

  @Post("/roster/save")
  public HttpResponse<SaveBuildResponseDto> saveRosterToSql(
      @Valid @Body SaveRosterDto body) {
    return HttpResponse.created(new SaveBuildResponseDto(delegate.saveRoster(body)));
  }

  @Post("/load")
  public HttpResponse<LoadBuildResponseDto> loadFromSql(
      @Valid @Body LoadBuildDto body) {
    return HttpResponse.created(new LoadBuildResponseDto(delegate.loadBuild(body)));
  }

  @Post("/delete")
  public HttpResponse<DeleteBuildResponseDto> deleteFromSql(
      @Valid @Body DeleteBuildDto body) {
    return HttpResponse.created(new DeleteBuildResponseDto(delegate.deleteBuild(body)));
  }

  @Post("/roster/delete")
  public HttpResponse<DeleteRosterResponseDto> deleteRosterPlayersFromSql(
      @Valid @Body DeleteRosterDto body) {
    return HttpResponse.created(new DeleteRosterResponseDto(delegate.deleteRosterPlayers(body)));
  }

  @Post("/loadAll")
  public HttpResponse<LoadBuildsResponseDto> loadBuildsFromSql(
      @Valid @Body LoadBuildsDto body) {
    return HttpResponse.created(new LoadBuildsResponseDto(delegate.loadBuilds(body)));
  }

  @Post("/absence/save")
  public HttpResponse<SaveAbsenceResponseDto> saveAbsence(
      @Valid @Body SaveAbsenceDto body) {
    return HttpResponse.created(new SaveAbsenceResponseDto(delegate.saveAbsence(body)));
  }

  @Post("/absence/load")
  public HttpResponse<LoadAbsenceResponseDto> loadAbsence(
      @Valid @Body LoadAbsenceDto body) {
    return HttpResponse.created(new LoadAbsenceResponseDto(delegate.loadAbsence(body)));
  }
}
