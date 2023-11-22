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
import java.util.Objects;

public enum GroupId {
  NONE("none"),
  GROUP1(1),
  GROUP2(2),
  GROUP3(3),
  GROUP4(4),
  GROUP5(5),
  ROSTER("roster"),
  BENCH("bench"),;

  private final String stringValue;
  private final Integer intValue;

  GroupId(final String stringValue) {
    this.stringValue = stringValue;
    this.intValue = null;
  }

  GroupId(final Integer intValue) {
    this.stringValue = intValue.toString();
    this.intValue = intValue;
  }

  public static GroupId of(final int groupId) {
    return Arrays.stream(values())
        .filter(e -> e.intValue != null)
        .filter(e -> e.intValue == groupId)
        .findFirst()
        .orElseThrow();
  }

  @Singleton
  @Secondary
  public static class GroupIdSerde implements Serde<GroupId> {

    @Override
    public @Nullable GroupId deserialize(
        @NonNull final Decoder decoder,
        @NonNull final DecoderContext context,
        @NonNull final Argument<? super GroupId> type)
        throws IOException {
      final String value = decoder.decodeString();
      return Arrays.stream(values())
          .filter(group -> group.stringValue.equalsIgnoreCase(value))
          .findFirst()
          .orElseThrow();
    }

    @Override
    public void serialize(
        @NonNull final Encoder encoder,
        @NonNull final EncoderContext context,
        @NonNull final Argument<? extends GroupId> type,
        @NonNull final GroupId value)
        throws IOException {
      if (Objects.nonNull(value.intValue)) {
        encoder.encodeInt(value.intValue);
      } else {
        encoder.encodeString(value.stringValue);
      }
    }
  }
}
