package uk.raidcomp.cloudflare.turnstile.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ValidationRequestDto(String secret, String response) {}
