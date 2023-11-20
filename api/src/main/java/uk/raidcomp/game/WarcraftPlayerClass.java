package uk.raidcomp.game;

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

public enum WarcraftPlayerClass {
  DEATH_KNIGHT("DeathKnight"),
  DEMON_HUNTER("DemonHunter"),
  DRUID("Druid"),
  EVOKER("Evoker"),
  HUNTER("Hunter"),
  MAGE("Mage"),
  MONK("Monk"),
  PALADIN("Paladin"),
  PRIEST("Priest"),
  ROGUE("Rogue"),
  SHAMAN("Shaman"),
  WARLOCK("Warlock"),
  WARRIOR("Warrior"),
  UNKNOWN("Unknown");

  private final String value;

  WarcraftPlayerClass(final String value) {
    this.value = value;
  }

  @Singleton
  @Secondary
  public static class WarcraftPlayerClassSerde implements Serde<WarcraftPlayerClass> {

    @Override
    public @Nullable WarcraftPlayerClass deserialize(
        @NonNull final Decoder decoder,
        @NonNull final DecoderContext context,
        @NonNull final Argument<? super WarcraftPlayerClass> type)
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
        @NonNull final Argument<? extends WarcraftPlayerClass> type,
        @NonNull final WarcraftPlayerClass value)
        throws IOException {
      encoder.encodeString(value.value);
    }
  }
}
