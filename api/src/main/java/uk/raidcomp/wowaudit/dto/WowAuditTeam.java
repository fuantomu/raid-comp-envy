package uk.raidcomp.wowaudit.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record WowAuditTeam(String name) {}
