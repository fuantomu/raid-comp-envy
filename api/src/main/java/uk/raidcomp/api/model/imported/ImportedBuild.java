package uk.raidcomp.api.model.imported;

import java.util.List;

public record ImportedBuild(String name, List<PlayerSignup> signups) {}
