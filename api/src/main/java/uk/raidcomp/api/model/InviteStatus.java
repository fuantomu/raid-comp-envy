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
import java.util.List;
import java.util.Optional;

public enum InviteStatus {
  INVITED("invited"),
  TENTATIVE("tentative"),
  ACCEPTED("accepted"),
  BACKUP("backup"),
  DECLINED("declined"),
  BENCHED("benched"),
  UNKNOWN("unknown");
  private final String value;

  InviteStatus(final String value) {
    this.value = value;
  }

  public static Optional<InviteStatus> findByValue(final String value) {
    return Arrays.stream(values())
        .filter(status -> status.value.equalsIgnoreCase(value))
        .findFirst();
  }

  public boolean isInactive() {
    return List.of(DECLINED, UNKNOWN).contains(this);
  }

  public boolean isActive() {
    return !isInactive();
  }

  @Singleton
  @Secondary
  public static class InviteStatusSerde implements Serde<InviteStatus> {

    @Override
    public @Nullable InviteStatus deserialize(
        @NonNull final Decoder decoder,
        @NonNull final DecoderContext context,
        @NonNull final Argument<? super InviteStatus> type)
        throws IOException {
      final String value = decoder.decodeString();
      return findByValue(value).orElseThrow();
    }

    @Override
    public void serialize(
        @NonNull final Encoder encoder,
        @NonNull final EncoderContext context,
        @NonNull final Argument<? extends InviteStatus> type,
        @NonNull final InviteStatus value)
        throws IOException {
      encoder.encodeString(value.value);
    }
  }
}
