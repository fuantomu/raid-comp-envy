package uk.raidcomp.raidhelper.model;

import java.util.Arrays;
import java.util.Optional;
import lombok.Getter;
import uk.raidcomp.api.model.WarcraftPlayerClass;
import uk.raidcomp.api.model.WarcraftPlayerSpec;

public enum RaidHelperSpec {
  BLOOD("Blood", WarcraftPlayerSpec.DEATH_KNIGHT_BLOOD),
  FROST_1("Frost1", WarcraftPlayerSpec.DEATH_KNIGHT_FROST),
  UNHOLY("Unholy", WarcraftPlayerSpec.DEATH_KNIGHT_UNHOLY),
  BALANCE("Balance", WarcraftPlayerSpec.DRUID_BALANCE),
  FERAL("Feral", WarcraftPlayerSpec.DRUID_FERAL),
  GUARDIAN("Guardian", WarcraftPlayerSpec.DRUID_GUARDIAN),
  RESTORATION("Restoration", WarcraftPlayerSpec.DRUID_RESTORATION),
  BEASTMASTERY("Beastmastery", WarcraftPlayerSpec.HUNTER_BEASTMASTERY),
  MARKSMANSHIP("Marksmanship", WarcraftPlayerSpec.HUNTER_MARKSMANSHIP),
  SURVIVAL("Survival", WarcraftPlayerSpec.HUNTER_SURVIVAL),
  ARCANE("Arcane", WarcraftPlayerSpec.MAGE_ARCANE),
  FIRE("Fire", WarcraftPlayerSpec.MAGE_FIRE),
  FROST("Frost", WarcraftPlayerSpec.MAGE_FROST),
  DISCIPLINE("Discipline", WarcraftPlayerSpec.PRIEST_DISCIPLINE),
  HOLY("Holy", WarcraftPlayerSpec.PRIEST_HOLY),
  SHADOW("Shadow", WarcraftPlayerSpec.PRIEST_SHADOW),
  HOLY_1("Holy1", WarcraftPlayerSpec.PALADIN_HOLY),
  PROTECTION_1("Protection1", WarcraftPlayerSpec.PALADIN_PROTECTION),
  RETRIBUTION("Retribution", WarcraftPlayerSpec.PALADIN_RETRIBUTION),
  ASSASSINATION("Assassination", WarcraftPlayerSpec.ROGUE_ASSASSINATION),
  COMBAT("Combat", WarcraftPlayerSpec.ROGUE_COMBAT),
  SUBTLETY("Subtlety", WarcraftPlayerSpec.ROGUE_SUBTLETY),
  AFFLICTION("Affliction", WarcraftPlayerSpec.WARLOCK_AFFLICTION),
  DEMONOLOGY("Demonology", WarcraftPlayerSpec.WARLOCK_DEMONOLOGY),
  DESTRUCTION("Destruction", WarcraftPlayerSpec.WARLOCK_DESTRUCTION),
  ELEMENTAL("Elemental", WarcraftPlayerSpec.SHAMAN_ELEMENTAL),
  ENHANCEMENT("Enhancement", WarcraftPlayerSpec.SHAMAN_ENHANCEMENT),
  RESTORATION_1("Restoration1", WarcraftPlayerSpec.SHAMAN_RESTORATION),
  ARMS("Arms", WarcraftPlayerSpec.WARRIOR_ARMS),
  FURY("Fury", WarcraftPlayerSpec.WARRIOR_FURY),
  PROTECTION("Protection", WarcraftPlayerSpec.WARRIOR_PROTECTION);

  private final String value;
  @Getter private final WarcraftPlayerSpec wowSpec;

  RaidHelperSpec(final String value, final WarcraftPlayerSpec wowSpec) {
    this.value = value;
    this.wowSpec = wowSpec;
  }

  public static Optional<RaidHelperSpec> findByValue(final String value) {
    return Arrays.stream(values()).filter(e -> e.value.equalsIgnoreCase(value)).findFirst();
  }

  public WarcraftPlayerClass getWowClass() {
    return getWowSpec().getWowClass();
  }
}
