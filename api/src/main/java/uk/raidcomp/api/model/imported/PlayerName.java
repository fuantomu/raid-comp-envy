package uk.raidcomp.api.model.imported;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static java.util.function.Predicate.not;

public record PlayerName(String raw) {

  private String getPart(final int index) {
    final List<String> parts =
        Arrays.stream(Optional.ofNullable(raw()).orElse("").split("-", 2))
            .map(String::trim)
            .filter(not(String::isBlank))
            .toList();
    return parts.size() > index ? parts.get(index) : null;
  }

  public String getCharacter() {
    return getPart(0);
  }

  public String getRealm() {
    return getPart(1);
  }
}
