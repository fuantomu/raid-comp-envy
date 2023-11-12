package uk.raidcomp.wowaudit;

import jakarta.inject.Singleton;
import java.util.ArrayList;
import java.util.List;
import uk.raidcomp.wowaudit.client.WowAuditClient;
import uk.raidcomp.wowaudit.config.WowAuditConfiguration;
import uk.raidcomp.wowaudit.dto.WowAuditCharacter;
import uk.raidcomp.wowaudit.dto.WowAuditTeam;
import uk.raidcomp.wowaudit.mappers.TeamMapper;
import uk.raidcomp.wowaudit.model.Team;

@Singleton
public class WowAuditDelegate {
  private final WowAuditConfiguration configuration;
  private final WowAuditClient client;
  private final TeamMapper mapper;

  public WowAuditDelegate(
      final WowAuditConfiguration configuration,
      final WowAuditClient client,
      final TeamMapper mapper) {
    this.configuration = configuration;
    this.client = client;
    this.mapper = mapper;
  }

  public List<Team> getTeams() {
    final List<Team> teams = new ArrayList<>();
    final List<WowAuditCharacter> allCharacters = new ArrayList<>();

    for (final String key : configuration.getKeys()) {
      final List<WowAuditCharacter> characters = client.getCharacters(key);
      teams.add(mapper.toModel(client.getTeam(key), characters, true));
      allCharacters.addAll(characters);
    }

    final Team combined = mapper.toModel(new WowAuditTeam(""), allCharacters, false);
    if (teams.size() > 1) {
      teams.add(combined);
      return teams;
    }
    return List.of(combined);
  }
}
