package uk.raidcomp.game.version;

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
import lombok.Getter;

@Getter
public enum GameVersion {
  LIVE("live");

  private final String value;

  GameVersion(final String value) {
    this.value = value;
  }

  public static GameVersion of(final String value) {
    return Arrays.stream(values())
        .filter(e -> e.value.equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow();
  }

  @Singleton
  @Secondary
  public static class GameVersionSerde implements Serde<GameVersion> {

    @Override
    public @Nullable GameVersion deserialize(
        @NonNull final Decoder decoder,
        @NonNull final DecoderContext context,
        @NonNull final Argument<? super GameVersion> type)
        throws IOException {
      final String value = decoder.decodeString();
      return GameVersion.of(value);
    }

    @Override
    public void serialize(
        @NonNull final Encoder encoder,
        @NonNull final EncoderContext context,
        @NonNull final Argument<? extends GameVersion> type,
        @NonNull final GameVersion value)
        throws IOException {
      encoder.encodeString(value.value);
    }
  }
}
