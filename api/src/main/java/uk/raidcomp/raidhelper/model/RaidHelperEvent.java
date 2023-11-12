package uk.raidcomp.raidhelper.model;

import java.util.List;

public record RaidHelperEvent(
    String name,
    String date,
    String time,
    String description,
    String createdBy,
    String link,
    List<RaidHelperSignup> signups) {}
