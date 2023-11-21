package uk.raidcomp.cloudflare.turnstile.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.serde.annotation.Serdeable;
import java.util.List;

@Serdeable
public record ValidationResponseDto(
    boolean success,
    @JsonProperty("error-codes") List<String> errorCodes,
    @Nullable String hostname,
    @JsonProperty("challenge_ts") @Nullable String challengeTs,
    @Nullable String action,
    @Nullable String cdata) {}
