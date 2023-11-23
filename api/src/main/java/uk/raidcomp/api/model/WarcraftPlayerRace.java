package uk.raidcomp.api.model;

import io.micronaut.context.annotation.Secondary;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.core.type.Argument;
import io.micronaut.serde.Decoder;
import io.micronaut.serde.Encoder;
import io.micronaut.serde.Serde;
import jakarta.inject.Singleton;
import java.io.IOException;
import java.util.Arrays;

public enum WarcraftPlayerRace {
  HUMAN("Human"),
  DWARF("Dwarf"),
  GNOME("Gnome"),
  NIGHTELF("Nightelf"),
  DRAENEI("Draenei"),
  WORGEN("Worgen"),
  ORC("Orc"),
  TROLL("Troll"),
  UNDEAD("Undead"),
  TAUREN("Tauren"),
  BLOODELF("Bloodelf"),
  GOBLIN("Goblin"),
  UNKNOWN("Unknown");

  private final String value;

  WarcraftPlayerRace(final String value) {
    this.value = value;
  }

  public static WarcraftPlayerRace findByValue(final String value) {
    switch (value.toUpperCase()) {
      case "HUMAN":
        return HUMAN;
      case "DWARF":
        return DWARF;
      case "GNOME":
        return GNOME;
      case "NIGHTELF":
        return NIGHTELF;
      case "DRAENEI":
        return DRAENEI;
      case "WORGEN":
        return WORGEN;
      case "ORC":
        return ORC;
      case "TROLL":
        return TROLL;
      case "UNDEAD":
        return UNDEAD;
      case "TAUREN":
        return TAUREN;
      case "BLOODELF":
        return BLOODELF;
      case "GOBLIN":
        return GOBLIN;
      default:
        return UNKNOWN;
    }
  }

  @Singleton
  @Secondary
  public static class WarcraftPlayerRaceSerde implements Serde<WarcraftPlayerRace> {

    @Override
    public @Nullable WarcraftPlayerRace deserialize(
        @NonNull final Decoder decoder,
        @NonNull final DecoderContext context,
        @NonNull final Argument<? super WarcraftPlayerRace> type)
        throws IOException {
      final String value = decoder.decodeString();
      return Arrays.stream(values())
          .filter(e -> e.value.equalsIgnoreCase(value))
          .findFirst()
          .orElseThrow();
    }

    @Override
    public void serialize(
        @NonNull final Encoder encoder,
        @NonNull final EncoderContext context,
        @NonNull final Argument<? extends WarcraftPlayerRace> type,
        @NonNull final WarcraftPlayerRace value)
        throws IOException {
      encoder.encodeString(value.value);
    }
  }
}
