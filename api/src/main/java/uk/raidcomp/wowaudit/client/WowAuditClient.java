package uk.raidcomp.wowaudit.client;

import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Header;
import io.micronaut.http.client.annotation.Client;
import java.util.List;
import uk.raidcomp.wowaudit.dto.WowAuditCharacter;
import uk.raidcomp.wowaudit.dto.WowAuditTeam;

import static io.micronaut.http.HttpHeaders.ACCEPT;
import static io.micronaut.http.HttpHeaders.AUTHORIZATION;
import static io.micronaut.http.HttpHeaders.USER_AGENT;

@Client(id = "wowaudit", path = "/v1")
@Header(name = USER_AGENT, value = "raidcomp.uk")
@Header(name = ACCEPT, value = "application/json")
public interface WowAuditClient {

  @Get("/team")
  WowAuditTeam getTeam(@Header(AUTHORIZATION) String apiKey);

  @Get("/characters")
  List<WowAuditCharacter> getCharacters(@Header(AUTHORIZATION) String apiKey);
}
