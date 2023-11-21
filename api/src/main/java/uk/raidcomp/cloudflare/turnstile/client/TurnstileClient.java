package uk.raidcomp.cloudflare.turnstile.client;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Header;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.client.annotation.Client;
import uk.raidcomp.cloudflare.turnstile.dto.ValidationRequestDto;
import uk.raidcomp.cloudflare.turnstile.dto.ValidationResponseDto;

import static io.micronaut.http.HttpHeaders.ACCEPT;
import static io.micronaut.http.HttpHeaders.USER_AGENT;

@Client(id = "turnstile")
@Header(name = USER_AGENT, value = "raidcomp.uk")
@Header(name = ACCEPT, value = "application/json")
public interface TurnstileClient {
  @Post("/turnstile/v0/siteverify")
  ValidationResponseDto validate(@Body ValidationRequestDto body);
}
