package uk.raidcomp.raidhelper;

import io.micronaut.runtime.http.scope.RequestScope;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import uk.raidcomp.api.delegate.BuildDelegate;
import uk.raidcomp.api.model.Build;
import uk.raidcomp.api.model.GroupId;
import uk.raidcomp.api.model.Player;
import uk.raidcomp.api.model.imported.ImportedBuild;
import uk.raidcomp.api.model.imported.PlayerName;
import uk.raidcomp.api.model.imported.PlayerSignup;
import uk.raidcomp.wowaudit.WowAuditDelegate;
import uk.raidcomp.wowaudit.model.Team;
import uk.raidcomp.wowaudit.model.TeamCharacter;

import static java.util.function.Predicate.not;

@RequestScope
public class RaidHelperDelegate {
  private final RaidHelperImportDelegate importDelegate;
  private final BuildDelegate buildDelegate;
  private final List<Team> teams;

  public RaidHelperDelegate(
      final RaidHelperImportDelegate importDelegate,
      final WowAuditDelegate wowAuditDelegate,
      final BuildDelegate buildDelegate) {
    this.importDelegate = importDelegate;
    this.buildDelegate = buildDelegate;
    this.teams =
        wowAuditDelegate.getTeams().stream().filter(not(team -> team.players().isEmpty())).toList();
  }

  public List<Build> createBuilds(final String raw) {
    final var importedBuild = importDelegate.getBuild(raw);
    return teams.stream()
        .map(team -> createTeamBuild(team, importedBuild))
        .map(b -> buildDelegate.create(b.name(), b.players()))
        .toList();
  }

  private Build createTeamBuild(final Team team, final ImportedBuild importedBuild) {
    String name = importedBuild.name();
    if (!team.name().isBlank()) {
      name = "%s - %s".formatted(name, team.name());
    }
    return new Build(null, name, filterPlayers(team, importedBuild.signups()));
  }

  private List<Player> filterPlayers(final Team team, final List<PlayerSignup> signups) {
    final List<Player> filtered = new ArrayList<>();
    int playerIndex = 0;

    for (final PlayerSignup player : signups) {
      var character = findCharacter(team, player);
      if (character.isEmpty()) {
        if (team.filter()) {
          continue;
        } else {
          character = findCharacterInAllTeams(team, player);
        }
      }

      final var characterName =
          new PlayerName(character.map(TeamCharacter::character).orElse(player.name()));

      GroupId group = GroupId.NONE;
      if (player.status().isActive()) {
        int groupId = (int) Math.floor(playerIndex / 5.0) + 1;
        group = groupId > 8 ? GroupId.NONE : GroupId.of(groupId);
        playerIndex++;
      }

      filtered.add(
          new Player(
              characterName.getCharacter(),
              characterName.getRealm(),
              player.className(),
              player.spec(),
              player.status(),
              group));
    }

    return filtered;
  }

  private Optional<TeamCharacter> findCharacter(final Team team, final PlayerSignup signup) {
    if (signup.discordId() != null) {
      final var characters =
          team.players().stream().filter(p -> signup.discordId().equals(p.discordId())).toList();
      final var queryByClass =
          characters.stream()
              .filter(c -> signup.className().equals(c.className().getWowClass()))
              .findFirst();
      final var classOfSpec = signup.spec().getWowClass();
      final var queryByClassOfSpec =
          characters.stream()
              .filter(c -> c.className().getWowClass().equals(classOfSpec))
              .findFirst();
      return Stream.of(queryByClass, queryByClassOfSpec)
          .filter(Optional::isPresent)
          .map(Optional::get)
          .findFirst();
    }
    return Optional.empty();
  }

  private Optional<TeamCharacter> findCharacterInAllTeams(
      final Team team, final PlayerSignup signup) {
    return teams.stream()
        .filter(not(team::equals))
        .map(t -> findCharacter(t, signup))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .findFirst();
  }
}
