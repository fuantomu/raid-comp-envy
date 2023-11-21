package uk.raidcomp.cloudflare.turnstile;

import jakarta.inject.Singleton;
import lombok.AllArgsConstructor;
import uk.raidcomp.cloudflare.turnstile.client.TurnstileClient;
import uk.raidcomp.cloudflare.turnstile.config.TurnstileConfiguration;
import uk.raidcomp.cloudflare.turnstile.dto.ValidationRequestDto;

@Singleton
@AllArgsConstructor
public class TurnstileDelegate {
  private final TurnstileConfiguration configuration;
  private final TurnstileClient client;

  public boolean validate(final String token) {
    final var result = client.validate(new ValidationRequestDto(configuration.secretKey(), token));
    return result.success();
  }
}
