package uk.raidcomp.api.model;

import java.util.List;

public record Build(String id, String name, List<Player> players) {}
