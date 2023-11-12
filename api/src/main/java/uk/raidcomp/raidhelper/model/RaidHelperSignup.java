package uk.raidcomp.raidhelper.model;

public record RaidHelperSignup(
    String statusOrClass,
    String classOrSpec,
    String name,
    String id,
    String timestamp,
    String status) {}
