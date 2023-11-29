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
import lombok.Getter;

import static uk.raidcomp.api.model.WarcraftRole.HEALER;
import static uk.raidcomp.api.model.WarcraftRole.MELEE_DPS;
import static uk.raidcomp.api.model.WarcraftRole.RANGED_DPS;
import static uk.raidcomp.api.model.WarcraftRole.TANK;

public enum WarcraftPlayerSpec {
  DEATHKNIGHT_BLOOD("DeathknightBlood", WarcraftPlayerClass.DEATHKNIGHT, TANK),
  DEATHKNIGHT_FROST("DeathknightFrost", WarcraftPlayerClass.DEATHKNIGHT, MELEE_DPS),
  DEATHKNIGHT_UNHOLY("DeathknightUnholy", WarcraftPlayerClass.DEATHKNIGHT, MELEE_DPS),
  DRUID_BALANCE("DruidBalance", WarcraftPlayerClass.DRUID, RANGED_DPS),
  DRUID_FERAL("DruidFeral", WarcraftPlayerClass.DRUID, MELEE_DPS),
  DRUID_GUARDIAN("DruidGuardian", WarcraftPlayerClass.DRUID, TANK),
  DRUID_RESTORATION("DruidRestoration", WarcraftPlayerClass.DRUID, HEALER),
  HUNTER_BEASTMASTERY("HunterBeastmastery", WarcraftPlayerClass.HUNTER, RANGED_DPS),
  HUNTER_MARKSMANSHIP("HunterMarksmanship", WarcraftPlayerClass.HUNTER, RANGED_DPS),
  HUNTER_SURVIVAL("HunterSurvival", WarcraftPlayerClass.HUNTER, MELEE_DPS),
  MAGE_ARCANE("MageArcane", WarcraftPlayerClass.MAGE, RANGED_DPS),
  MAGE_FIRE("MageFire", WarcraftPlayerClass.MAGE, RANGED_DPS),
  MAGE_FROST("MageFrost", WarcraftPlayerClass.MAGE, RANGED_DPS),
  PRIEST_DISCIPLINE("PriestDiscipline", WarcraftPlayerClass.PRIEST, HEALER),
  PRIEST_HOLY("PriestHoly", WarcraftPlayerClass.PRIEST, HEALER),
  PRIEST_SHADOW("PriestShadow", WarcraftPlayerClass.PRIEST, RANGED_DPS),
  PALADIN_HOLY("PaladinHoly", WarcraftPlayerClass.PALADIN, HEALER),
  PALADIN_PROTECTION("PaladinProtection", WarcraftPlayerClass.PALADIN, TANK),
  PALADIN_RETRIBUTION("PaladinRetribution", WarcraftPlayerClass.PALADIN, MELEE_DPS),
  ROGUE_ASSASSINATION("RogueAssassination", WarcraftPlayerClass.ROGUE, MELEE_DPS),
  ROGUE_COMBAT("RogueCombat", WarcraftPlayerClass.ROGUE, MELEE_DPS),
  ROGUE_SUBTLETY("RogueSubtlety", WarcraftPlayerClass.ROGUE, MELEE_DPS),
  WARLOCK_AFFLICTION("WarlockAffliction", WarcraftPlayerClass.WARLOCK, RANGED_DPS),
  WARLOCK_DEMONOLOGY("WarlockDemonology", WarcraftPlayerClass.WARLOCK, RANGED_DPS),
  WARLOCK_DESTRUCTION("WarlockDestruction", WarcraftPlayerClass.WARLOCK, RANGED_DPS),
  SHAMAN_ELEMENTAL("ShamanElemental", WarcraftPlayerClass.SHAMAN, RANGED_DPS),
  SHAMAN_ENHANCEMENT("ShamanEnhancement", WarcraftPlayerClass.SHAMAN, MELEE_DPS),
  SHAMAN_RESTORATION("ShamanRestoration", WarcraftPlayerClass.SHAMAN, HEALER),
  WARRIOR_ARMS("WarriorArms", WarcraftPlayerClass.WARRIOR, MELEE_DPS),
  WARRIOR_FURY("WarriorFury", WarcraftPlayerClass.WARRIOR, MELEE_DPS),
  WARRIOR_PROTECTION("WarriorProtection", WarcraftPlayerClass.WARRIOR, TANK),
  UNKNOWN("Unknown", WarcraftPlayerClass.UNKNOWN, WarcraftRole.UNKNOWN),
  ;

  private final String value;
  @Getter
  private final WarcraftPlayerClass wowClass;
  @Getter
  private final WarcraftRole role;

  WarcraftPlayerSpec(
      final String value, final WarcraftPlayerClass wowClass, final WarcraftRole role) {
    this.value = value;
    this.wowClass = wowClass;
    this.role = role;
  }

  public static WarcraftPlayerSpec findByValue(final String value, final String className) {
    switch (value) {
      case "BLOOD":
        return DEATHKNIGHT_BLOOD;
      case "FROST":
        if (className.equals("MAGE")) {
          return MAGE_FROST;
        } else {
          return DEATHKNIGHT_FROST;
        }
      case "UNHOLY":
        return DEATHKNIGHT_UNHOLY;
      case "BALANCE":
        return DRUID_BALANCE;
      case "FERAL":
        return DRUID_FERAL;
      case "GUARDIAN":
        return DRUID_GUARDIAN;
      case "RESTORATION":
        if (className.equals("DRUID")) {
          return DRUID_RESTORATION;
        } else {
          return SHAMAN_RESTORATION;
        }
      case "BEASTMASTERY":
        return HUNTER_BEASTMASTERY;
      case "SURVIVAL":
        return HUNTER_SURVIVAL;
      case "MARKSMANSHIP":
        return HUNTER_MARKSMANSHIP;
      case "ARCANE":
        return MAGE_ARCANE;
      case "FIRE":
        return MAGE_FIRE;
      case "DISCIPLINE":
        return PRIEST_DISCIPLINE;
      case "SHADOW":
        return PRIEST_SHADOW;
      case "HOLY":
        if (className.equals("PRIEST")) {
          return PRIEST_HOLY;
        } else {
          return PALADIN_HOLY;
        }
      case "RETRIBUTION":
        return PALADIN_RETRIBUTION;
      case "PROTECTION":
        if (className.equals("PALADIN")) {
          return PALADIN_PROTECTION;
        } else {
          return WARRIOR_PROTECTION;
        }
      case "ASSASSINATION":
        return ROGUE_ASSASSINATION;
      case "COMBAT":
        return ROGUE_COMBAT;
      case "SUBTLETY":
        return ROGUE_SUBTLETY;
      case "AFFLICTION":
        return WARLOCK_AFFLICTION;
      case "DEMONOLOGY":
        return WARLOCK_DEMONOLOGY;
      case "DESTRUCTION":
        return WARLOCK_DESTRUCTION;
      case "ELEMENTAL":
        return SHAMAN_ELEMENTAL;
      case "ENHANCEMENT":
        return SHAMAN_ENHANCEMENT;
      case "FURY":
        return WARRIOR_FURY;
      case "ARMS":
        return WARRIOR_ARMS;
      default:
        return UNKNOWN;
    }
  }

  @Singleton
  @Secondary
  public static class WarcraftPlayerSpecSerde implements Serde<WarcraftPlayerSpec> {

    @Override
    public @Nullable WarcraftPlayerSpec deserialize(
        @NonNull final Decoder decoder,
        @NonNull final DecoderContext context,
        @NonNull final Argument<? super WarcraftPlayerSpec> type)
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
        @NonNull final Argument<? extends WarcraftPlayerSpec> type,
        @NonNull final WarcraftPlayerSpec value)
        throws IOException {
      encoder.encodeString(value.value);
    }
  }
}
