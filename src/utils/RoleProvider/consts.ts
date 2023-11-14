import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";

export enum WarcraftRole {
  Unknown = "Unknown",
  Tank = "Tank",
  Healer = "Healer",
  RangedDPS = "RangedDPS",
  MeleeDPS = "MeleeDPS",
}

export const WarcraftSpecRole: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRole;
} = {
  [WarcraftPlayerSpec.DeathKnightBlood]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.DeathKnightFrost]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DeathKnightUnholy]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DruidBalance]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.DruidFeral]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DruidGuardian]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.DruidRestoration]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.HunterBeastmastery]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.HunterMarksmanship]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.HunterSurvival]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MageArcane]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MageFire]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MageFrost]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.PriestDiscipline]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PriestHoly]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PriestShadow]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.PaladinHoly]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PaladinProtection]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.PaladinRetribution]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.RogueAssassination]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.RogueCombat]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.RogueSubtlety]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.WarlockAffliction]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.WarlockDemonology]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.WarlockDestruction]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.ShamanElemental]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.ShamanEnhancement]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.ShamanRestoration]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.WarriorArms]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.WarriorFury]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.WarriorProtection]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.Unknown]: WarcraftRole.Unknown,
};

export enum WarcraftRaidBuff {
  MeleeHaste = "MeleeHaste",
  Crit = "Crit",
  AttackPower = "AttackPower",
  SpellHaste = "SpellHaste",
  SpellPower10 = "SpellPower10",
  SpellPower6 = "SpellPower6",
  IncDamage = "IncDamage",
  AllStats = "AllStats",
  StrengthAgility = "StrengthAgility",
  Stamina = "Stamina",
  MaxMana = "MaxMana",
  Armor = "Armor",
  MP5 = "MP5",
  Replenishment = "Replenishment",
}

export const WarcraftClassRaidBuffs: {
  [className in WarcraftPlayerClass]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerClass.DeathKnight]: [WarcraftRaidBuff.StrengthAgility],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidBuff.AllStats],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidBuff.SpellPower6,WarcraftRaidBuff.MaxMana],
  [WarcraftPlayerClass.Priest]: [WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidBuff.AttackPower,WarcraftRaidBuff.AllStats,WarcraftRaidBuff.Armor,WarcraftRaidBuff.MP5],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidBuff.MeleeHaste,WarcraftRaidBuff.SpellHaste,WarcraftRaidBuff.SpellPower6,WarcraftRaidBuff.StrengthAgility,WarcraftRaidBuff.Armor,WarcraftRaidBuff.MP5],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidBuff.StrengthAgility,WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftSpecRaidBuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerSpec.DeathKnightBlood]: [...WarcraftClassRaidBuffs.DeathKnight,WarcraftRaidBuff.AttackPower],
  [WarcraftPlayerSpec.DeathKnightFrost]: [...WarcraftClassRaidBuffs.DeathKnight,WarcraftRaidBuff.MeleeHaste],
  [WarcraftPlayerSpec.DeathKnightUnholy]: [...WarcraftClassRaidBuffs.DeathKnight],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.SpellHaste],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidBuffs.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidBuffs.Hunter,WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidBuffs.Hunter,WarcraftRaidBuff.AttackPower],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidBuffs.Hunter,WarcraftRaidBuff.MeleeHaste],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidBuffs.Mage,WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidBuffs.Mage,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassRaidBuffs.Priest,WarcraftRaidBuff.SpellHaste,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidBuffs.Paladin,WarcraftRaidBuff.IncDamage,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidBuffs.Rogue,WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidBuffs.Warlock,WarcraftRaidBuff.MaxMana,WarcraftRaidBuff.MP5],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassRaidBuffs.Warlock,WarcraftRaidBuff.SpellPower10],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassRaidBuffs.Warlock,WarcraftRaidBuff.Stamina,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidBuffs.Shaman,WarcraftRaidBuff.Crit,WarcraftRaidBuff.SpellPower10],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidBuffs.Shaman,WarcraftRaidBuff.AttackPower],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidBuffs.Warrior,WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
};

export enum WarcraftRaidDebuff {
  ArmorDown = "ArmorDown",
  BleedDamageReceived = "BleedDamageReceived",
  SpellCritReceived = "SpellCritReceived",
  MeleeHaste = "MeleeHaste",
  SpellDamageReceived = "SpellDamageReceived",
  PhysicalDamageReceived = "PhysicalDamageReceived",
  HealingReceived = "HealingReceived",
  PhysicalDamageDealt = "PhysicalDamageDealt",
  CastSpeed = "CastSpeed",
}

export const WarcraftClassRaidDebuffs: {
  [className in WarcraftPlayerClass]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerClass.DeathKnight]: [WarcraftRaidDebuff.MeleeHaste,WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidDebuff.ArmorDown],
  [WarcraftPlayerClass.Hunter]: [WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerClass.Mage]: [],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [],
  [WarcraftPlayerClass.Rogue]: [WarcraftRaidDebuff.ArmorDown,WarcraftRaidDebuff.HealingReceived,WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerClass.Warlock]: [WarcraftRaidDebuff.SpellDamageReceived,WarcraftRaidDebuff.PhysicalDamageDealt,WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidDebuff.MeleeHaste],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidDebuff.ArmorDown,WarcraftRaidDebuff.PhysicalDamageDealt],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftSpecRaidDebuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerSpec.DeathKnightBlood]: [...WarcraftClassRaidDebuffs.DeathKnight,WarcraftRaidDebuff.PhysicalDamageDealt],
  [WarcraftPlayerSpec.DeathKnightFrost]: [...WarcraftClassRaidDebuffs.DeathKnight,WarcraftRaidDebuff.PhysicalDamageReceived],
  [WarcraftPlayerSpec.DeathKnightUnholy]: [...WarcraftClassRaidDebuffs.DeathKnight,WarcraftRaidDebuff.SpellDamageReceived],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidDebuffs.Druid,WarcraftRaidDebuff.SpellDamageReceived],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidDebuffs.Druid,WarcraftRaidDebuff.BleedDamageReceived,WarcraftRaidDebuff.MeleeHaste,WarcraftRaidDebuff.PhysicalDamageDealt],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidDebuffs.Mage,WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidDebuffs.Mage,WarcraftRaidDebuff.SpellCritReceived],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidDebuffs.Mage],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassRaidDebuffs.Priest,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidDebuffs.Paladin,WarcraftRaidDebuff.MeleeHaste,WarcraftRaidDebuff.PhysicalDamageDealt],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidDebuffs.Rogue,WarcraftRaidDebuff.SpellDamageReceived],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidDebuffs.Rogue,WarcraftRaidDebuff.PhysicalDamageReceived],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidDebuffs.Rogue,WarcraftRaidDebuff.BleedDamageReceived],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidDebuffs.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassRaidDebuffs.Warlock,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassRaidDebuffs.Warlock,WarcraftRaidDebuff.SpellCritReceived],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidDebuffs.Warrior,WarcraftRaidDebuff.BleedDamageReceived,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidDebuffs.Warrior,WarcraftRaidDebuff.PhysicalDamageReceived,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidDebuffs.Warrior,WarcraftRaidDebuff.MeleeHaste],
  [WarcraftPlayerSpec.Unknown]: [],
};

export enum WarcraftRaidUtility {
  Bloodlust = "Bloodlust",
  CombatResurrection = "CombatResurrection",
  Healthstone = "Healthstone",
  Innervate = "Innervate",
  BlessingOfProtection = "BlessingOfProtection",
  ManaTide = "ManaTide"
}

export const WarcraftClassUtilities: {
  [className in WarcraftPlayerClass]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerClass.DeathKnight]: [],
  [WarcraftPlayerClass.Druid]: [
    WarcraftRaidUtility.CombatResurrection,
  ],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidUtility.BlessingOfProtection],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Healthstone,
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Warrior]: [],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftSpecUtilities: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerSpec.DeathKnightBlood]: [...WarcraftClassUtilities.DeathKnight],
  [WarcraftPlayerSpec.DeathKnightFrost]: [...WarcraftClassUtilities.DeathKnight],
  [WarcraftPlayerSpec.DeathKnightUnholy]: [...WarcraftClassUtilities.DeathKnight],

  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassUtilities.Druid],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassUtilities.Druid],
  [WarcraftPlayerSpec.DruidGuardian]: [
    ...WarcraftClassUtilities.Druid,
    WarcraftRaidUtility.Innervate,
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassUtilities.Druid,
    WarcraftRaidUtility.Innervate,
  ],

  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassUtilities.Hunter],

  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassUtilities.Mage],

  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassUtilities.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassUtilities.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassUtilities.Priest],

  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassUtilities.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassUtilities.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassUtilities.Paladin],

  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassUtilities.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassUtilities.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassUtilities.Rogue],

  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassUtilities.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassUtilities.Warlock],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassUtilities.Warlock],

  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassUtilities.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassUtilities.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassUtilities.Shaman,WarcraftRaidUtility.ManaTide],

  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
};

export const WarcraftPlayerClassSpecs: {
  [className in WarcraftPlayerClass]: WarcraftPlayerSpec[];
} = {
  [WarcraftPlayerClass.DeathKnight]: [
    WarcraftPlayerSpec.DeathKnightBlood,
    WarcraftPlayerSpec.DeathKnightFrost,
    WarcraftPlayerSpec.DeathKnightUnholy,
  ],
  [WarcraftPlayerClass.Druid]: [
    WarcraftPlayerSpec.DruidBalance,
    WarcraftPlayerSpec.DruidFeral,
    WarcraftPlayerSpec.DruidGuardian,
    WarcraftPlayerSpec.DruidRestoration,
  ],
  [WarcraftPlayerClass.Hunter]: [
    WarcraftPlayerSpec.HunterBeastmastery,
    WarcraftPlayerSpec.HunterMarksmanship,
    WarcraftPlayerSpec.HunterSurvival,
  ],
  [WarcraftPlayerClass.Mage]: [
    WarcraftPlayerSpec.MageArcane,
    WarcraftPlayerSpec.MageFire,
    WarcraftPlayerSpec.MageFrost,
  ],
  [WarcraftPlayerClass.Priest]: [
    WarcraftPlayerSpec.PriestDiscipline,
    WarcraftPlayerSpec.PriestHoly,
    WarcraftPlayerSpec.PriestShadow,
  ],
  [WarcraftPlayerClass.Paladin]: [
    WarcraftPlayerSpec.PaladinHoly,
    WarcraftPlayerSpec.PaladinProtection,
    WarcraftPlayerSpec.PaladinRetribution,
  ],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftPlayerSpec.RogueAssassination,
    WarcraftPlayerSpec.RogueCombat,
    WarcraftPlayerSpec.RogueSubtlety,
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftPlayerSpec.WarlockAffliction,
    WarcraftPlayerSpec.WarlockDemonology,
    WarcraftPlayerSpec.WarlockDestruction,
  ],
  [WarcraftPlayerClass.Shaman]: [
    WarcraftPlayerSpec.ShamanElemental,
    WarcraftPlayerSpec.ShamanEnhancement,
    WarcraftPlayerSpec.ShamanRestoration,
  ],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftPlayerSpec.WarriorArms,
    WarcraftPlayerSpec.WarriorFury,
    WarcraftPlayerSpec.WarriorProtection,
  ],
  [WarcraftPlayerClass.Unknown]: [WarcraftPlayerSpec.Unknown],
};
