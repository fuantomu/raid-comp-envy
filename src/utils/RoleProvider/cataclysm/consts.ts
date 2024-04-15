import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../../consts";

export enum WarcraftRaidBuff {
  MeleeHaste = "MeleeHaste",
  Crit = "Crit",
  AttackPower20 = "AttackPower20",
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
  Replenishment = "Replenishment"
}

export const WarcraftClassRaidBuffs: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidBuff.StrengthAgility],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidBuff.AllStats],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidBuff.SpellPower6, WarcraftRaidBuff.MaxMana],
  [WarcraftPlayerClass.Priest]: [WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Paladin]: [
    WarcraftRaidBuff.AttackPower20,
    WarcraftRaidBuff.AllStats,
    WarcraftRaidBuff.Armor,
    WarcraftRaidBuff.MP5
  ],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [],
  [WarcraftPlayerClass.Shaman]: [
    WarcraftRaidBuff.MeleeHaste,
    WarcraftRaidBuff.SpellHaste,
    WarcraftRaidBuff.SpellPower6,
    WarcraftRaidBuff.StrengthAgility,
    WarcraftRaidBuff.Armor,
    WarcraftRaidBuff.MP5
  ],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidBuff.StrengthAgility, WarcraftRaidBuff.Stamina]
};

export const WarcraftSpecRaidBuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [
    ...WarcraftClassRaidBuffs.Deathknight,
    WarcraftRaidBuff.AttackPower20
  ],
  [WarcraftPlayerSpec.DeathknightFrost]: [
    ...WarcraftClassRaidBuffs.Deathknight,
    WarcraftRaidBuff.MeleeHaste
  ],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassRaidBuffs.Deathknight],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidBuffs.Druid, WarcraftRaidBuff.SpellHaste],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidBuffs.Druid, WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidBuffs.Druid, WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassRaidBuffs.Druid,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.HunterBeastmastery]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.IncDamage
  ],
  [WarcraftPlayerSpec.HunterMarksmanship]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.AttackPower20
  ],
  [WarcraftPlayerSpec.HunterSurvival]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.MeleeHaste
  ],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidBuffs.Mage, WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidBuffs.Mage, WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [
    ...WarcraftClassRaidBuffs.Priest,
    WarcraftRaidBuff.SpellHaste,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [
    ...WarcraftClassRaidBuffs.Paladin,
    WarcraftRaidBuff.IncDamage,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidBuffs.Rogue, WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.WarlockAffliction]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.MaxMana,
    WarcraftRaidBuff.MP5
  ],
  [WarcraftPlayerSpec.WarlockDemonology]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.SpellPower10
  ],
  [WarcraftPlayerSpec.WarlockDestruction]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.Stamina,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.ShamanElemental]: [
    ...WarcraftClassRaidBuffs.Shaman,
    WarcraftRaidBuff.Crit,
    WarcraftRaidBuff.SpellPower10
  ],
  [WarcraftPlayerSpec.ShamanEnhancement]: [
    ...WarcraftClassRaidBuffs.Shaman,
    WarcraftRaidBuff.AttackPower20
  ],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidBuffs.Warrior]
};

export enum WarcraftRaidDebuff {
  ArmorDown = "ArmorDown",
  BleedDamageReceived = "BleedDamageReceived",
  SpellCritReceived = "SpellCritReceived",
  MeleeHasteDown = "MeleeHasteDown",
  SpellDamageReceived = "SpellDamageReceived",
  PhysicalDamageReceived = "PhysicalDamageReceived",
  HealingReceived25 = "HealingReceived25",
  PhysicalDamageDealt = "PhysicalDamageDealt",
  CastSpeed30 = "CastSpeed30"
}

export const WarcraftClassRaidDebuffs: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [
    WarcraftRaidDebuff.MeleeHasteDown,
    WarcraftRaidDebuff.CastSpeed30
  ],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidDebuff.ArmorDown],
  [WarcraftPlayerClass.Hunter]: [WarcraftRaidDebuff.HealingReceived25],
  [WarcraftPlayerClass.Mage]: [],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftRaidDebuff.ArmorDown,
    WarcraftRaidDebuff.HealingReceived25,
    WarcraftRaidDebuff.CastSpeed30
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidDebuff.SpellDamageReceived,
    WarcraftRaidDebuff.PhysicalDamageDealt,
    WarcraftRaidDebuff.CastSpeed30
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidDebuff.MeleeHasteDown],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftRaidDebuff.ArmorDown,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ]
};

export const WarcraftSpecRaidDebuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ],
  [WarcraftPlayerSpec.DeathknightFrost]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.PhysicalDamageReceived
  ],
  [WarcraftPlayerSpec.DeathknightUnholy]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.SpellDamageReceived
  ],
  [WarcraftPlayerSpec.DruidBalance]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.SpellDamageReceived
  ],
  [WarcraftPlayerSpec.DruidFeral]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.BleedDamageReceived,
    WarcraftRaidDebuff.MeleeHasteDown,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ],
  [WarcraftPlayerSpec.DruidGuardian]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.BleedDamageReceived,
    WarcraftRaidDebuff.MeleeHasteDown,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.MageArcane]: [
    ...WarcraftClassRaidDebuffs.Mage,
    WarcraftRaidDebuff.CastSpeed30
  ],
  [WarcraftPlayerSpec.MageFire]: [
    ...WarcraftClassRaidDebuffs.Mage,
    WarcraftRaidDebuff.SpellCritReceived
  ],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidDebuffs.Mage],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [
    ...WarcraftClassRaidDebuffs.Priest,
    WarcraftRaidDebuff.HealingReceived25
  ],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [
    ...WarcraftClassRaidDebuffs.Paladin,
    WarcraftRaidDebuff.MeleeHasteDown,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.RogueAssassination]: [
    ...WarcraftClassRaidDebuffs.Rogue,
    WarcraftRaidDebuff.SpellDamageReceived
  ],
  [WarcraftPlayerSpec.RogueCombat]: [
    ...WarcraftClassRaidDebuffs.Rogue,
    WarcraftRaidDebuff.PhysicalDamageReceived
  ],
  [WarcraftPlayerSpec.RogueSubtlety]: [
    ...WarcraftClassRaidDebuffs.Rogue,
    WarcraftRaidDebuff.BleedDamageReceived
  ],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidDebuffs.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [
    ...WarcraftClassRaidDebuffs.Warlock,
    WarcraftRaidDebuff.HealingReceived25
  ],
  [WarcraftPlayerSpec.WarlockDestruction]: [
    ...WarcraftClassRaidDebuffs.Warlock,
    WarcraftRaidDebuff.SpellCritReceived
  ],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.BleedDamageReceived,
    WarcraftRaidDebuff.PhysicalDamageReceived,
    WarcraftRaidDebuff.HealingReceived25
  ],
  [WarcraftPlayerSpec.WarriorFury]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.HealingReceived25
  ],
  [WarcraftPlayerSpec.WarriorProtection]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.MeleeHasteDown
  ]
};

export enum WarcraftRaidUtility {
  Bloodlust = "Bloodlust",
  CombatResurrection = "CombatResurrection",
  Healthstone = "Healthstone",
  Innervate = "Innervate",
  BlessingOfProtection = "BlessingOfProtection",
  ManaTide = "ManaTide",
  FocusMagic = "FocusMagic",
  TricksOfTheTrade = "TricksOfTheTrade",
  DarkIntent = "DarkIntent",
  UnholyFrenzy = "UnholyFrenzy",
  PowerInfusion = "PowerInfusion"
}

export const WarcraftClassUtilities: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerClass.Deathknight]: [],
  [WarcraftPlayerClass.Druid]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Innervate
  ],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidUtility.BlessingOfProtection],
  [WarcraftPlayerClass.Rogue]: [WarcraftRaidUtility.TricksOfTheTrade],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Healthstone,
    WarcraftRaidUtility.DarkIntent
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Warrior]: []
};

export const WarcraftRaceUtilities: {
  [class_name in WarcraftPlayerRace]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerRace.Human]: [],
  [WarcraftPlayerRace.Dwarf]: [],
  [WarcraftPlayerRace.Gnome]: [],
  [WarcraftPlayerRace.Nightelf]: [],
  [WarcraftPlayerRace.Draenei]: [],
  [WarcraftPlayerRace.Worgen]: [],
  [WarcraftPlayerRace.Orc]: [],
  [WarcraftPlayerRace.Troll]: [],
  [WarcraftPlayerRace.Undead]: [],
  [WarcraftPlayerRace.Tauren]: [],
  [WarcraftPlayerRace.Bloodelf]: [],
  [WarcraftPlayerRace.Goblin]: []
};

export const WarcraftSpecUtilities: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [...WarcraftClassUtilities.Deathknight],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassUtilities.Deathknight],
  [WarcraftPlayerSpec.DeathknightUnholy]: [
    ...WarcraftClassUtilities.Deathknight,
    WarcraftRaidUtility.UnholyFrenzy
  ],

  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassUtilities.Druid],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassUtilities.Druid],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassUtilities.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassUtilities.Druid],

  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassUtilities.Hunter],

  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassUtilities.Mage, WarcraftRaidUtility.FocusMagic],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassUtilities.Mage],

  [WarcraftPlayerSpec.PriestDiscipline]: [
    ...WarcraftClassUtilities.Priest,
    WarcraftRaidUtility.PowerInfusion
  ],
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
  [WarcraftPlayerSpec.ShamanRestoration]: [
    ...WarcraftClassUtilities.Shaman,
    WarcraftRaidUtility.ManaTide
  ],

  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassUtilities.Warrior]
};

export const WarcraftPlayerClassSpecs: {
  [class_name in WarcraftPlayerClass]: WarcraftPlayerSpec[];
} = {
  [WarcraftPlayerClass.Deathknight]: [
    WarcraftPlayerSpec.DeathknightBlood,
    WarcraftPlayerSpec.DeathknightFrost,
    WarcraftPlayerSpec.DeathknightUnholy
  ],
  [WarcraftPlayerClass.Druid]: [
    WarcraftPlayerSpec.DruidBalance,
    WarcraftPlayerSpec.DruidFeral,
    WarcraftPlayerSpec.DruidGuardian,
    WarcraftPlayerSpec.DruidRestoration
  ],
  [WarcraftPlayerClass.Hunter]: [
    WarcraftPlayerSpec.HunterBeastmastery,
    WarcraftPlayerSpec.HunterMarksmanship,
    WarcraftPlayerSpec.HunterSurvival
  ],
  [WarcraftPlayerClass.Mage]: [
    WarcraftPlayerSpec.MageArcane,
    WarcraftPlayerSpec.MageFire,
    WarcraftPlayerSpec.MageFrost
  ],
  [WarcraftPlayerClass.Priest]: [
    WarcraftPlayerSpec.PriestDiscipline,
    WarcraftPlayerSpec.PriestHoly,
    WarcraftPlayerSpec.PriestShadow
  ],
  [WarcraftPlayerClass.Paladin]: [
    WarcraftPlayerSpec.PaladinHoly,
    WarcraftPlayerSpec.PaladinProtection,
    WarcraftPlayerSpec.PaladinRetribution
  ],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftPlayerSpec.RogueAssassination,
    WarcraftPlayerSpec.RogueCombat,
    WarcraftPlayerSpec.RogueSubtlety
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftPlayerSpec.WarlockAffliction,
    WarcraftPlayerSpec.WarlockDemonology,
    WarcraftPlayerSpec.WarlockDestruction
  ],
  [WarcraftPlayerClass.Shaman]: [
    WarcraftPlayerSpec.ShamanElemental,
    WarcraftPlayerSpec.ShamanEnhancement,
    WarcraftPlayerSpec.ShamanRestoration
  ],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftPlayerSpec.WarriorArms,
    WarcraftPlayerSpec.WarriorFury,
    WarcraftPlayerSpec.WarriorProtection
  ]
};
