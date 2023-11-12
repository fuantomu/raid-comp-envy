package uk.raidcomp.api.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;
import java.util.List;
import uk.raidcomp.api.controller.dto.ImportBuildDto;
import uk.raidcomp.api.controller.dto.ImportBuildResponseDto;
import uk.raidcomp.api.mapper.BuildMapper;
import uk.raidcomp.raidhelper.RaidHelperDelegate;

@Controller("/build/import")
public class BuildImportController {

  private final RaidHelperDelegate delegate;
  private final BuildMapper mapper;

  public BuildImportController(final RaidHelperDelegate delegate, final BuildMapper mapper) {
    this.delegate = delegate;
    this.mapper = mapper;
  }

  @Post("/raid-helper")
  public HttpResponse<List<ImportBuildResponseDto>> importFromRaidHelper(
      @Valid @Body ImportBuildDto body) {
    return HttpResponse.created(
        delegate.createBuilds(body.raw()).stream().map(mapper::toImportDto).toList());
  }
}
