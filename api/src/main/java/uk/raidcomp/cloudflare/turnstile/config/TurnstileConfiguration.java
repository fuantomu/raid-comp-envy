package uk.raidcomp.cloudflare.turnstile.config;

import io.micronaut.context.annotation.ConfigurationProperties;
import io.micronaut.context.annotation.Requires;

@ConfigurationProperties(TurnstileConfiguration.PREFIX)
@Requires(property = TurnstileConfiguration.PREFIX)
public record TurnstileConfiguration(String secretKey) {
  public static final String PREFIX = "turnstile";
}
