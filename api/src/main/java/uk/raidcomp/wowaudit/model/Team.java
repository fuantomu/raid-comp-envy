package uk.raidcomp.wowaudit.model;

import java.util.List;

public record Team(String name, List<TeamCharacter> players, boolean filter) {}
