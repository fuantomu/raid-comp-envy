package uk.raidcomp.wowaudit.dto;

import io.micronaut.context.annotation.Secondary;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.core.type.Argument;
import io.micronaut.serde.Decoder;
import io.micronaut.serde.Encoder;
import io.micronaut.serde.Serde;
import io.micronaut.serde.Serializer;
import jakarta.inject.Singleton;
import java.io.IOException;
import java.util.Arrays;
import lombok.Getter;
import uk.raidcomp.api.model.WarcraftPlayerClass;

public enum WowAuditPlayerClass {
  DEATH_KNIGHT("Death Knight", WarcraftPlayerClass.DEATH_KNIGHT),
  DEMON_HUNTER("Demon Hunter", WarcraftPlayerClass.DEMON_HUNTER),
  DRUID("Druid", WarcraftPlayerClass.DRUID),
  EVOKER("Evoker", WarcraftPlayerClass.EVOKER),
  HUNTER("Hunter", WarcraftPlayerClass.HUNTER),
  MAGE("Mage", WarcraftPlayerClass.MAGE),
  MONK("Monk", WarcraftPlayerClass.MONK),
  PALADIN("Paladin", WarcraftPlayerClass.PALADIN),
  PRIEST("Priest", WarcraftPlayerClass.PRIEST),
  ROGUE("Rogue", WarcraftPlayerClass.ROGUE),
  SHAMAN("Shaman", WarcraftPlayerClass.SHAMAN),
  WARLOCK("Warlock", WarcraftPlayerClass.WARLOCK),
  WARRIOR("Warrior", WarcraftPlayerClass.WARRIOR);

  private final String value;
  @Getter private final WarcraftPlayerClass wowClass;

  WowAuditPlayerClass(final String value, final WarcraftPlayerClass wowClass) {
    this.value = value;
    this.wowClass = wowClass;
  }

  @Singleton
  @Secondary
  public static class WowAuditPlayerClassSerde implements Serde<WowAuditPlayerClass> {

    @Override
    public @Nullable WowAuditPlayerClass deserialize(
        @NonNull final Decoder decoder,
        @NonNull final DecoderContext context,
        @NonNull final Argument<? super WowAuditPlayerClass> type)
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
        @NonNull final Serializer.EncoderContext context,
        @NonNull final Argument<? extends WowAuditPlayerClass> type,
        @NonNull final WowAuditPlayerClass value)
        throws IOException {
      encoder.encodeString(value.value);
    }
  }
}
