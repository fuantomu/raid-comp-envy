package uk.raidcomp.raidhelper;

import jakarta.inject.Singleton;
import uk.raidcomp.api.model.imported.ImportedBuild;
import uk.raidcomp.raidhelper.csv.RaidHelperImportParser;
import uk.raidcomp.raidhelper.mapper.PlayerSignupMapper;

@Singleton
public class RaidHelperImportDelegate {
  private final RaidHelperImportParser parser;
  private final PlayerSignupMapper mapper;

  public RaidHelperImportDelegate(
      final RaidHelperImportParser parser, final PlayerSignupMapper mapper) {
    this.parser = parser;
    this.mapper = mapper;
  }

  public ImportedBuild getBuild(final String raw) {
    return mapper.toDomain(parser.parse(raw));
  }
}
