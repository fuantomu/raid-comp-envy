package uk.raidcomp.raidhelper.model;

import java.util.Arrays;
import java.util.Optional;
import lombok.Getter;
import uk.raidcomp.api.model.WarcraftPlayerClass;

public enum RaidHelperClass {
  DK("DK", WarcraftPlayerClass.DEATH_KNIGHT),
  DRUID("Druid", WarcraftPlayerClass.DRUID),
  HUNTER("Hunter", WarcraftPlayerClass.HUNTER),
  MAGE("Mage", WarcraftPlayerClass.MAGE),
  PALADIN("Paladin", WarcraftPlayerClass.PALADIN),
  PRIEST("Priest", WarcraftPlayerClass.PRIEST),
  ROGUE("Rogue", WarcraftPlayerClass.ROGUE),
  SHAMAN("Shaman", WarcraftPlayerClass.SHAMAN),
  WARLOCK("Warlock", WarcraftPlayerClass.WARLOCK),
  WARRIOR("Warrior", WarcraftPlayerClass.WARRIOR);

  private final String value;
  @Getter private final WarcraftPlayerClass wowClass;

  RaidHelperClass(final String value, final WarcraftPlayerClass wowClass) {
    this.value = value;
    this.wowClass = wowClass;
  }

  public static Optional<RaidHelperClass> findByValue(final String value) {
    return Arrays.stream(values()).filter(e -> e.value.equalsIgnoreCase(value)).findFirst();
  }
}
