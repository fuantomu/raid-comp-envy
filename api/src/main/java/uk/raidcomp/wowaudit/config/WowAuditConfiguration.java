package uk.raidcomp.wowaudit.config;

import io.micronaut.context.annotation.ConfigurationProperties;
import io.micronaut.context.annotation.Requires;
import java.util.Arrays;
import java.util.List;

import static java.util.function.Predicate.not;

@ConfigurationProperties(WowAuditConfiguration.PREFIX)
@Requires(property = WowAuditConfiguration.PREFIX)
public record WowAuditConfiguration(String keys) {
  public static final String PREFIX = "wowaudit";

  public List<String> getKeys() {
    return Arrays.stream(keys().split(";")).map(String::trim).filter(not(String::isBlank)).toList();
  }
}
