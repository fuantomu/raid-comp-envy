package uk.raidcomp.wowaudit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record WowAuditCharacter(
    String name,
    String realm,
    @JsonProperty("class") WowAuditPlayerClass className,
    String role,
    String note) {}
