package uk.raidcomp.api.model;

import java.util.List;
import uk.raidcomp.game.version.GameVersion;

public record Build(GameVersion gameVersion, String id, String name, List<Player> players) {}
